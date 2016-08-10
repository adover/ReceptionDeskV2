import React from 'react';
import { 
	Text, 
	TouchableHighlight, 
	View 
} from 'react-native';
import { 
	connect 
} from 'react-redux';
import CONFIG from '../config/config';
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
			this._navigate('Welcome');
		}, 20000);

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

			try{
				console.log('visiting', this.props.visiting)
				Slack.makeTheCall(CONFIG.slack.messages.visitor, {
					'visiting': Slack.getSlackUserNameFromName(this.props.visiting),
					'visitorName': this.props.visitorName,
					'company': this.props.company 
				}, this.props.visiting);

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

	handleTheDrink () {
		
		const wantDrink = this.getSource() === 'drinks' && this.props.drink !== 'No thanks';

		/**
		 * Let's get someone to fix that drink too, we'll keep it as the default user for now
		 */
		
		if(wantDrink){
			Slack.makeTheCall(CONFIG.slack.messages.drink, { 
				'slackUser': CONFIG.slack.default_user, 
				'visitorName': this.props.visitorName,
				'drinkName': this.props.drink,
			}, CONFIG.slack.default_user);

			return <Text style={ styles.question }>{ this.props.text.drink.replace('drinkOfChoice', this.props.drink) }</Text>;

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