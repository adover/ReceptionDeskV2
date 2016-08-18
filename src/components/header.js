import React from 'react';
import { 
	Text,  
	View,
	Image
} from 'react-native';
import styles, { 
	ysColours 
} from '../styles/styles';
import moment from 'moment';

class Header extends React.Component{

	/**
	 * This is a dumb component, it doesn't do anything special, although we need to 
	 * mess around with the layout a bit
	 */

	constructor (){
		super();

		this.getTheTime = this.getTheTime.bind(this);

		/**
		 * Setup the time variable to update every second
		 */
		
		this.state = {
			time: null
		}

		this.getTheTime();
	}

	getTheTime () {

		/**
		 * We fire the timeout every half a second instead of every second to make sure
		 * it's accurate. If you only do it every second you may sometimes notice a few jumps
		 */
		
		setTimeout(() => {

			this.setState({
				time: moment().format("dddd, MMMM Do, h:mma")
			})

			/**
			 * Call the function recursively forever
			 */
			
			this.getTheTime();

			/**
			 * Tell React to update. It should notice the state change but I like doing this
			 * for verbosity
			 */
			
			this.forceUpdate();

		}, 500)

	}

	/**
	 * The colour of the logo is route dependent, let's add a switch statement to select the
	 * correct colour
	 */
	
	pickLogo () {

		let url = require('../../images/logo_white.png');
		switch(this.props.route.toString()){
			case 'Default':
				url = require('../../images/logo_bart.png');
			break;
			case 'Meeting':
				url = require('../../images/logo_patrick.png');
			break;
			case 'Delivery':
				url = require('../../images/logo_stitch.png');
			break;
			case null:
			case 'Welcome':
			default:
				url = require('../../images/logo_white.png');
			break; 
		}
		console.log('URL', url)
		return (
			<Image source={ url } style={ {
				width: 150,
				height: 21,
				marginTop: 1,
				marginRight: 10
			} } />
		)
	}

	render () {
		return (
			<View style={ styles.header }>
				{ this.pickLogo() }
				<Text style={ styles.textLeft }>{ this.props.text }</Text>
				<Text style={ styles.textRight }>{ this.state.time }</Text>
			</View>
		)
	}
}

export default Header;