import React from 'react';
import { 
	Text, 
	TouchableHighlight, 
	View,
	Animated,
  Image,
  Easing
} from 'react-native';
import { 
	connect 
} from 'react-redux';
import styles, { 
	ysColours,
	welcomeStyles
} from '../styles/styles';
import assignIn from 'lodash/assignIn';
import dispatchOnRouteChange from '../utility/dispatchOnRouteChange';

class Welcome extends React.Component{

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

		/**
		 * Initialising the Animation, this is just tutorial stuff for now
		 */
		
		this.spinVal = new Animated.Value(0);

	}
	
	/**
	 * The routeName parameter which gets passed relates the route.name switch statement in app.<platform>.js
	 */
	
	_navigate(routeName){

		dispatchOnRouteChange(routeName);
		
	  this.props.navigator.push({
	    name: routeName,
	  })
	}

	render () {
		
		const text = this.props.text;

		return (
			<View style={ styles.mainView }>
				<Text style={ styles.mainTitle }>{ text.title }</Text>
				<View style={ [styles.row, styles.marginBotton] }>
				{ text.answers.map((a, idx) => {
					return (
						<TouchableHighlight style={ [welcomeStyles.touchable, styles['colour_' + (idx + 1) + '_border']] } key={ a.route_name } onPress={ () => this._navigate(a.route_name) }>
						  <Text style={ styles.option }>{ a.text }</Text>
						</TouchableHighlight>
						)
				}) }
				</View>
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
  	text: state.CONFIG.text.screen_1,
  	welcome: state.CONFIG.text.welcome
  }
}

export default connect(mapStateToProps)(Welcome);