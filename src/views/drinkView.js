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

class Drinks extends React.Component{

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

		this.handleDrinkSelection = this.handleDrinkSelection.bind(this);

	}
	
	/**
	 * To save on work and unecessary bootstrap I'm passing the user details through the views in componentDidMount
	 */
	
	componentDidMount () {

		this.setState({
			visiting: this.props.visiting,
			visitorName: this.props.visitorName,
			name: this.props.visitorName,
			company: this.props.company
		})

	}

	/**
	 * Once we have the drink sorted we can transition to the final page, passing the data through
	 */
	
	handleDrinkSelection (drink) {

		let { visiting, visitorName, company } = this.state;

		this._navigate('Default', { drink, cameFrom: 'Drinks', visiting, visitorName, company })
	}

	/**
	 * The routeName parameter which gets passed relates the route.name switch statement in app.<platform>.js
	 */
	
	_navigate(routeName, props = null){
	  this.props.navigator.push({
	    name: routeName,
	    passProps: { ...props }
	  })
	}

	render () {
		
		const text = this.props.text;

		return (
			<View style={ styles.view }>
				<Text style={ styles.mainTitle }>{ this.props.text.title }</Text>
				<Text style={ styles.question }>{ this.props.text.q }</Text>
				{ this.props.text.answers.map((a) => {
					return (
						<TouchableHighlight underlayColor={ ysColours['squirtle'] } style={ styles.touchableOption } key={ a } onPress={ () => { this.handleDrinkSelection(a) } }>
							<Text>{ a }</Text>
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
  	text: state.CONFIG.text.screen_5
  }
}

export default connect(mapStateToProps)(Drinks);