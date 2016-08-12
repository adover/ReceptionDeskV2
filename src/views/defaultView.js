import React from 'react';
import { 
	Text, 
	TouchableHighlight, 
	View,
	Navigator
} from 'react-native';
import { 
	connect 
} from 'react-redux';
import CONFIG from '../config/config';
import each from 'lodash/each';
import Slack from '../utility/slackOAuth';
import styles, { 
	ysColours 
} from '../styles/styles';

class Default extends React.Component{

	/**
	 * It's important to add PropTypes to all of your components,
	 * this will ensure that the data which gets passed through as props
	 * will be typed correctly. I also intend to move over to FlowType
	 * which introduces static typing, much safer
	 */
	
  static propTypes = {

  }

	constructor () {
		super();

		this.source;
		this.getSource = this.getSource.bind(this);
		this.getOnTheirWayMessage = this.getOnTheirWayMessage.bind(this);
		this.handleTheDrink = this.handleTheDrink.bind(this);
		this.wantDrink = this.wantDrink.bind(this);

		this.state = {
			personComing: 'Someone',
			drinkRequested: false,
			drink: null,
			source: null
		}
	}

	/**
	 * As this screen doesn't need to be persistent forever I'm going to add a 20 second timeout. After
	 * that it will navigate to the home screen.
	 */
	
	componentDidMount () {
		
		this.timer = setTimeout(() => {

			/**
			 * For some reason the component does not unmount on navigation, so I'll manually clear
			 * the timeout to ensure it doesn't fire again
			 */
			
			clearTimeout(this.timer);

			this._navigate('Welcome');

		}, 5000);

		/**
		 * Let's work out where they came from
		 */
		
		this.source = this.getSource();

	}

	componentWillUnmount() {
	  
	  /**
	   * I didn't know if it was going to cause any issues, but just in case I've cleared the timeout
	   */
	  
	  clearTimeout(this.timer);

	}

	/**
	 * This is a utility function to help us find out what view they came from
	 */
	
	getSource () {

		if(this.props.cameFrom === 'Drinks'){

			return 'drinks';

		}else if(this.props.cameFrom === 'Delivery'){

			return 'delivery';

		}

		/**
		 * If it doesn't match either of the above we know to serve them generic stuff
		 */
		
		return;
	}

	getOnTheirWayMessage () {
		
		/**
		 * This function works out where they came from so we can send the right 'on their way message',
		 * we also want to send Slack messages to people who need to be contacted, so we might as well
		 * do it here. It's probably worth renaming the function if that's the case
		 */
		
		if(this.props.visiting){

			/**
			 * Before we make the call we need to make sure that the person we are trying to contact
			 * is online. If not it renders the whole machine pointless
			 */
			
			let userOnline;
			let messageReciever = Slack.getSlackUserNameFromName(this.props.visiting);
			let visitingMessage = CONFIG.slack.messages.visitor;
			let userID = Slack.getUserIdFromName(messageReciever);

			userOnline = Slack.getUserPresence(userID);		

			/**
			 * If they're not online we need to fall back to the default person who will pick it up
			 */
			
			if(!userOnline){

				/**
				 * Modify the visiting message first
				 */
				
				 visitingMessage = CONFIG.slack.messages.visitor + CONFIG.slack.messages.visitor_not_online;
				
				/**
				 * Then update the visiting variable
				 */
				
				messageReciever = CONFIG.slack.default_user;
			
			}

			try{

				Slack.makeTheCall(visitingMessage, {
					'visiting': Slack.getSlackUserNameFromName(this.props.visiting),
					'visitorName': this.props.visitorName,
					'company': this.props.company 
				}, messageReciever);

			}catch(e){

				console.error(e);

			}

			/**
			 * I've used variables that need to be replaced in textConfig, this is a quick shortcut
			 */
			
			return this.props.text.has_name.replace('personComing', this.props.visiting.split(' ')[0] );
		
		}

		if(this.getSource() === 'delivery'){

			if(this.props.signatureNeeded === 'No'){

				try{

					Slack.makeTheCall(CONFIG.slack.messages.delivery_nosig);

				}catch(e){

					console.error(e);

				}

				return this.props.text.delivery_no_signature;

			}else{

				/**
				 * If they need a signature we'll fire off a slack message to the default user to come sign
				 */

				try{

					Slack.makeTheCall(CONFIG.slack.messages.delivery);

					return this.props.text.default_text;

				}catch(e){

					console.error(e);

				}				
			
			}

		}

		/**
		 * If they're not visiting anyone in particular, and it's not a delivery that needs a signatur, 
		 * we'll send them the default
		 */

		try{

			Slack.makeTheCall(CONFIG.slack.messages.default_message);

		}catch(e){

			console.error(e);

		}

		return this.props.text.default_text

	}

	wantDrink () {

		/**
		 * To keep things dynamic I want to loop through all of my drink options using the lodash each. 
		 * If all are no thanks we'll omit any drink information
		 */
		
		let noDrinksRequired = false;

		each(this.props.drink, (drink) => {

			if(drink !== 'No Thanks'){

				noDrinksRequired = false;

			}

		})

		/**
		 * If noDrinksRequired is now false, that means someone wants a drink
		 */
		
		return this.getSource() === 'drinks' && !noDrinksRequired;

	}

	handleTheDrink () {
		
		/**
		 * We only need this if there are drinksToMake
		 */
		
		if(!this.props.drinksToMake) return;

		/**
		 * Now we have to handle multiple drinks, so we need to check that the array, if only
		 * one in length doesn't have a value of 'No Thanks'
		 */
		
		const wantDrink = this.wantDrink();

		/**
		 * Filter all drink names which are 'No Thanks'
		 */
				
		const drinksToMake = this.props.drinksToMake.filter((d) => { return d !== 'No Thanks' })
		
		/**
		 * Modify the drink text
		 */
		
		const drinkMessage = CONFIG.slack.messages.drink.replace('drinkName', this.props.drinksToMake);

		/**
		 * Let's get someone to fix that drink too, we'll keep it as the default user for now
		 */
		
		if(wantDrink){
			Slack.makeTheCall(drinkMessage, { 
				'slackUser': CONFIG.slack.default_user, 
				'visitorName': this.props.visitorName,
				'drinkNames': drinksToMake,
			}, CONFIG.slack.default_user);

			return <Text style={ styles.question }>{ this.props.text.drink.replace('drinkName', this.props.drinksToMake) }</Text>;

		}

		return;

	}

	/**
	 * The routeName parameter which gets passed relates the route.name switch statement in app.<platform>.js
	 */
	
	_navigate(routeName){
	  this.props.navigator.push({
	    name: routeName
	  })
	}

	render () {
		
		const text = this.props.text;
		
		return (
			<View style={ styles.view }>
				<Text style={ styles.mainTitle }>{ this.getOnTheirWayMessage() }</Text>
				{ this.handleTheDrink() }
				<TouchableHighlight underlayColor={ ysColours['squirtle'] } style={ styles.touchableOption } onPress={ () => this._navigate('Welcome') }>
					<Text style={ styles.option }>Start over</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

/**
 * We don't want to pull the whole state tree in when we connect as that makes the app inefficient in terms
 * of performance, it will cause every component to redraw every time the state is updated. Therefore
 * we simply map the state that we want to the component's props
 */

const mapStateToProps = state => {
  return { 
  	text: state.CONFIG.text.screen_2.text
  }
}

export default connect(mapStateToProps)(Default);