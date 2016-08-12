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
		
		this.state = {
			visiting: null,
			visitorName: null,
			company: null,
			amountOfDrinksToMake: 0,
			drinksToMake: []
		}
	}
	
	/**
	 * To save on work and unecessary bootstrap I'm passing the user details through the views in componentDidMount
	 */
	
	componentDidMount () {

		this.setState({
			visiting: this.props.visiting,
			visitorName: this.props.visitorName,
			company: this.props.company,
			amountOfDrinksToMake: this.props.visitorName.length
		})

	}

	/**
	 * Once we have the drink sorted we can transition to the final page, passing the data through
	 */
	
	handleDrinkSelection (drink) {

		/**
		 * Push the drink into the drinksToMake state array
		 */
		
		let drinks = this.state.drinksToMake;

		drinks.push(drink);

		this.setState({
			drinksToMake: drinks
		})

		if(this.state.amountOfDrinksToMake > 1){ 

			/**
			 * Change the state of the drinks
			 */

			 const drinksLeft = this.state.amountOfDrinksToMake - 1;

			 this.setState({
			 	amountOfDrinksToMake: drinksLeft
			 })

		}else{

			/**
			 * Once they've selected the final drink we'll navigate to the next page
			 */
			
			let { visiting, visitorName, company, drinksToMake } = this.state;

			this._navigate('Default', { drinksToMake, cameFrom: 'Drinks', visiting, visitorName, company });

		}
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

		/**
		 * If we have to make more than one drink, let's show a piece of text that lets them know
		 */
		
		const drinksToMake = 
			this.state.amountOfDrinksToMake > 1 ? 
				<Text style={ styles.smallText }>{ `You have ${this.state.amountOfDrinksToMake} left to choose` }</Text> 
					: null;

		return (
			<View style={ styles.view }>
				<Text style={ styles.mainTitle }>{ this.props.text.title }</Text>
				<Text style={ styles.question }>{ this.props.text.q }</Text>
				{ drinksToMake }
				{ this.props.text.answers.map((a) => {
					return (
						<TouchableHighlight underlayColor={ ysColours['squirtle'] } style={ styles.touchableOption } key={ a } onPress={ () => { this.handleDrinkSelection(a) } }>
							<Text style={ styles.option }>{ a }</Text>
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