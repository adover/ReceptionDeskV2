import React from 'react';
import App from './app';
import CONFIG from './config/config';

/**
 * This import relates to hooking into Slack's oAuth
 */

import SlackOAuth from './utility/slackOAuth';

/**
 * The following import is the React-Redux bindings, as Redux isn't actually exclusive to React
 */

import { 
	Provider 
} from 'react-redux';

/**
 * I decided in the end to abstract the createStore method into a utility called buildStore. 
 * This makes it easy to use in non react situations
 */

import buildStore from './store/buildStore';

/**
 * This class is wrapped in a function as AppRegistry.registerComponent  
 * expects a function, even if it returns a class
 */

const Init = () => {
	class Main extends React.Component {
		constructor () {
			super();

			/**
			 * buildStore is an abstracted method containing the redux 'createStore' method
			 */
			
		  this.state = {
	      isLoading: true,
	      store: buildStore
	    };

	    this.storeWatcher = this.storeWatcher.bind(this);
		}

		/**
		 * This is a little utility function that watches the store and logs any changes.
		 * Useful for testing purposes
		 */
		
		storeWatcher () {

			/**
			 * Uncomment this for a string output of the store every time it's updated
			 */
			
		  // console.log(JSON.stringify(this.state.store.getState()));

		}

		componentDidMount () {

			/**
			 * Subscribe the store to it's listener
			 */

			this.state.store.subscribe(this.storeWatcher);

			/**
			 * Initialise Slack and pull all of the UserList into the state
			 * I've added a config option so we can disable for testing
			 */

			if(CONFIG.slack.enabled){

				SlackOAuth.initialAuthorisation(CONFIG.slack.api.client_id, SlackOAuth.getAccessToken);

			}

		}

		render () {
			
			/**
			 * Once the App grows in size this condition will be useful for creating Wait screens
			 */
			
			if(this.state.isLoading){

			}

			/**
			 * The <Provider/> (which is a react-redux binding) makes the Redux store available to the 
			 * connect() calls in the component hierarchy below. 
			 * Normally, you can’t use connect() without wrapping the root component in <Provider>.
			 */
			
			return (
				<Provider store={this.state.store}>
					<App />
				</Provider>
			)
		}
	}

	/**
	 * Return the class 
	 */
	
	return Main;
}

export default Init;