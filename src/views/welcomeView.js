import React from 'react';
import { 
	Text, 
	TouchableHighlight, 
	View 
} from 'react-native';
import { 
	connect 
} from 'react-redux';
import styles, { 
	ysColours 
} from '../styles/styles';

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
	}
	
	/**
	 * The routeName parameter which gets passed relates the route.name switch statement in app.<platform>.js
	 */
	
	_navigate(routeName){
	  this.props.navigator.push({
	    name: routeName,
	  })
	}

	render () {
		
		const text = this.props.text;

		return (
			<View style={ styles.view }>
				<Text style={ styles.mainTitle }>{ text.title }</Text>
				<Text style={ styles.question }>{ text.q }</Text>
				{ text.answers.map(a => {
					return (
						<TouchableHighlight underlayColor={ ysColours['squirtle'] } style={ styles.touchableOption } key={ a.route_name } onPress={ () => this._navigate(a.route_name) }>
						  <Text style={ styles.option }>{ a.text }</Text>
						</TouchableHighlight>
						)
				}) }
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