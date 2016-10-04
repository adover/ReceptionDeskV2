import { 
	Linking 
} from 'react-native';
import CONFIG from '../config/config';
import doFetch from './fetch';
import each from 'lodash/each';

/**
 * Connect to the Redux store so we can update the state
 */

import store from '../store/buildStore';
import { updateSlackAccessToken, addPeople } from '../actions/actionCreators';

/**
 * Use shitty-qs to sanitise query strings
 */

import qs from 'shitty-qs';

/**
 * This is where I create the linking for Slack's oAuth calls
 * More information can be found here https://api.slack.com/docs/oauth
 */

class SlackOAuth {

	constructor () {

		this.callback = null;

		/**
		 * Bind 'this' to the handleUrl method so that 'this' is correctly used as a class
		 */
		
		this.handleUrl = this.handleUrl.bind(this);
		this.getAccessToken = this.getAccessToken.bind(this);
		this.getSlackUserNameFromName = this.getSlackUserNameFromName.bind(this);

	}

	initialAuthorisation (client_id, callback) {

		/**
		 * Set callback to be a property of the class so we can use it later
		 */
		
		this.callback = callback;

		/**
		 * The Linking library is what React-Native uses to connect to Native capabilities.
		 * There's a bit of set up with this in xCode and can be a bit fiddly at times
		 * https://facebook.github.io/react-native/docs/linking-libraries-ios.html
		 * Due to the url string being long and unwieldy I decided to break it into 
		 * it's component parts in an array and join, keeps the lines short
		 */
		
	  Linking.openURL([
	    'https://slack.com/oauth/authorize',
			'?client_id=' + client_id,
			'&scope=users:read chat:write:bot channels:read',
			'&team=youngshand'
	  ].join(''))

	  /**
	   * Once we've made the oAuth call and it is successful, slack will make a call
	   * to our app using a URL Scheme (https://dev.twitter.com/cards/mobile/url-schemes). 
	   * The listener and function below handle the return call.
	   */
	  
		Linking.addEventListener('url', this.handleUrl)

	}

	handleUrl (event) {

		/**
		 * This may be a new way of assigning a variable to you, it's a destructuring assignment
		 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
		 */
		
	  const [ , queryString] = event.url.split('?');

	  /**
	   * Run the query string through Shitty-QS so it's a nicely formatted object
	   */
	  
	  const query = qs(queryString);

	  /**
	   * This.callback should never be null, but in case it is.... 
	   */
	  
	  if(this.callback){
	  	this.callback(null, query.code);
	  }

	  Linking.removeEventListener('url', this.handleUrl);
	}

	/**
	 * Slack's oAuth requires a second step which involves getting the access token using
	 * the code which we got from the initial function above. It was for this reason I decided
	 * to build a class for Slack actions to be handled.
	 * React Native uses the Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Request)
	 */
	
	async getAccessToken (param, code) {

		/**
		 * First we create a new Request using the oAuth Access URL
		 */
		
		const requestURL = [
			CONFIG.slack.api.ouath_access_uri,
			'?client_id=' + CONFIG.slack.api.client_id,
			'&client_secret=' + CONFIG.slack.api.client_secret,
			'&code=' + code
		].join('');

		const url = new Request(requestURL);

		/**
		 * Using an aysnc variable assignment makes it easy for us to populate this.accessDetails when 
		 * the fetch has returned successfully
		 */
		
		this.accessDetails = await doFetch(url);

		/** 
		 * So that we can do tests inside react, let's dispatch the token to the Redux store
		 */
		
		store.dispatch(updateSlackAccessToken(this.accessDetails.access_token));

		/**
		 * Might as well fill the userList here also
		 */
		
		this.users = await this.getUsers();

	}

	/**
	 * Call slack, we'll be using this function to build the tokenised URL with the relevant method
	 * I could probably refactor this to work with what's above, but what's being repeated is relatively
	 * small, so I won't worry this time round
	 */
	
	callToSlack (method, args = []) {

		/**
		 * Adding in a check for access token. If there isn't one I'll return false
		 */
		
		if(this.accessDetails){

			const requestURL = [
				CONFIG.slack.api.root,
				'/' + method,
				'?token=' + this.accessDetails.access_token,
				...args
			].join('');

			console.log(method,args);

			const url = new Request(requestURL);

			return doFetch(url);

		}else{

			return false;

		}

	}

	/**
	 * This call could be going straight to the callToSlack method, but I decided to keep it split in case
	 * there's anything we need to play with
	 * findReplace is an object of k/v pairs 
	 * dm is a string containing the name of the person to dm
	 */
	
	makeTheCall (message, findReplace = {}, dm = null) {

		/**
		 * Put the correct details in by looping through the details
		 */
				
		each(findReplace, (replace, find) => {
			message = message.replace(find, replace);
		});

		/**
		 * Build the attachment and Encode it
		 */
		
		const attachment = encodeURIComponent(this.buildAttachment(message));

		/**
		 * If we get passed a value of dm then it needs to go to a DM subject
		 */
		
		let channel = CONFIG.slack.notification_group

		if(dm){
			channel = '@' + this.getSlackUserNameFromName(dm);
		}

		let args = [
			'&channel=' + channel,
			'&text=' + encodeURIComponent('...'),
			'&attachments=' + attachment
		]

		/**
		 * I've added a return to the actual call. If it returns false I can make a 
		 * pretty error
		 */
		
		if(!this.callToSlack('chat.postMessage', [...args])){

			return false;
		
		}else{

			return 0;

		}

	}

	/**
	 * Checks to see if the user is online
	 * @param  {string} user The UserID
	 */
	
	async getUserPresence (user) {
		console.log(user);
		const userPresence = await this.callToSlack('users.getPresence', ['&user=' + user]);
		console.log(userPresence);
		/**
		 * If the user is present, userPresence.presence will return active
		 * if not we return false and then react accordingly
		 */
		
		if(userPresence.presence === 'active') return true;

		return false;

	}

	/**
	 * For the AutoComplete we need to have a list of current users on slack, this is where we get them from
	 */

	async getUsers () {
		const userList = await this.callToSlack('users.list');
		const users = userList.members.filter(user => {
			return !user.isBot && !user.deleted && user.name.indexOf('bot') === -1;
		});

		store.dispatch(addPeople(users));

		return users;
	}

	/**
	 * To send a good Slack message we'll use attachments, they stick out a bit more
	 * @param {string} message The message to send
	 * 
	 */
	
	buildAttachment (message) {

		const date =  new Date();
		
		const attachment = [
      {
        "fallback": message,
        "color": "#36a64f",
        "title": CONFIG.slack.title,
        "text": message        
      }
		]

		return JSON.stringify(attachment)

	}
	
	/**
	 * Gets the ID from either the Name or the UserName
	 */
	
	getUserIdFromName (name) {

		if(this.users){

			let user = this.users.filter((u) => { return u.real_name === name });

			/**
			 * Probably means that they were using the slack username
			 */
			
			if(user.length === 0) user = this.users.filter((u) => { return u.name === name });

			/**
			 * if user.length is still 0 then we give up
			 */
			
			if(user.length === 0) return false;

			/**
			 * Otherwise we want the ID
			 */
			
			return user[0].id;
			
		}

	}

	/**
	 * Gets the Slack user from the realName passed to it
	 * @param  {string} realName
	 * @return {string} returns the slack user name. If no name is found in the filter it just returns realName
	 */
	
	getSlackUserNameFromName (realName) {
		
		if(this.users){
			
			let user = this.users.filter((u) => { return u.real_name === realName });

			if(user.length > 0){
				console.log(user)
				return user[0].name;

			}else{

				/**
				 * If no name is returned, they probably returned the Slack user name by accident, so send it back
				 * We'll log it to the console just in case
				 */

				console.log(realName);

				return realName;

			}

		}

		return false;
	}

}

const Slack = new SlackOAuth();
export default Slack;