import React from 'react';
import { 
	Text, 
	TouchableHighlight,
	View, 
	AlertIOS,
	TextInput,
	LayoutAnimation
} from 'react-native';
import { 
	connect 
} from 'react-redux';
import _ from 'lodash';
import styles, { 
	ysColours,
	fonts
} from '../styles/styles';

/**
 * I ended up having enough of the issues with the ScrollView and Keyboard battles so I 
 * went for this instead
 */

import { 
	KeyboardAwareScrollView 
} from 'react-native-keyboard-aware-scroll-view'

/**
 * This is an AutoComplete addon I found here - https://github.com/nulrich/RCTAutoComplete
 */

import AutoComplete from 'react-native-autocomplete';

/**
 * This class is pretty large, to the point where I've considered separating concerns. The
 * reason I didn't is purely for speed, it's well known that context switching when you're 
 * focused on a single task wastes time, and for that reason I've left everything in this file
 */

class Meeting extends React.Component{

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
		 * There's a few functions to be bound, I'm wondering if there's a 
		 * workaround for this, perhaps by looping through all of the methods in a class?
		 */
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.stageRenderer = this.stageRenderer.bind(this);
		this.renderAutoComplete = this.renderAutoComplete.bind(this);
		this.renderPersonalInfo = this.renderPersonalInfo.bind(this);
		this.textInputs = this.textInputs.bind(this);
		this.addPerson = this.addPerson.bind(this);
		this.extraInputs = null;

		/**
		 * There's a lot of initialState to declare for this one also
		 */
		
		this.state = {
			inputCount: 1,
			inputText: null,
			optionsVisible: false,
			people: null,
			renderNext: false,
			personalInfoError: false,
			autoCompleteError: false,
			visiting: null,
			visitorName: [],
			company: null,
		}
	}
	
	/**
	 * When the state updates it will fire a layout change. With this code below it's animated
	 */
	
	componentWillUpdate() {
  	LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

	/**
	 * The handleChange listener looks out for changes in the input. If the input length is > 3
	 * we will show a box which has some of their choices (limit of 6). I decided not to use the 
	 * store for this as it is the only place the people list will be visible in this way
	 */
	
	handleChange (inputText) {

	  this.setState({inputText});

	  if(inputText.length >= 3){

	  	/**
	  	 * The filter chain below takes the Array of People objects and turns it into an array of names
	  	 * (strings)
	  	 */
	  	
			const people = _(this.props.people)
				.filter(p => { return _.startsWith(p.real_name, inputText); })
				.map(p => p.real_name)
				.value();

	  	this.setState({ 
	  		people: people
	  	});

	  }else{

	  	/**
	  	 * [When the input is shorter than 3 we clear the state, just in case
	  	 */
	  	
	  	this.setState({ 
	  		people: null
	  	});

	  }
	}

	/**
	 * Handle submitting the AutoComplete
	 */
	
	autoCompleteSubmit (selectedValue) {

		/**
		 * Setting a state of 'renderNext' to be true forces the layout to change
		 * to the personal details page.
		 */
		
		if(selectedValue.length > 0){
			this.setState({ 
				visiting: selectedValue,
				autoCompleteError: false,
				renderNext: true,
			}) 
		}else{
			this.setState({ 
				autoCompleteError: true
			}) 
		}

	}

	/**
	 * When the TouchableHighlight is clicked we want to store a pass a load of information. This can be done in
	 * a variety of ways, but the simplest is to pass it through to the navigator
	 */
	
	handleSubmit (e) {

		if(this.state.visitorName && this.state.company){

			/**
			 * This is a destructuring assignment which builds the object we want out of the object we have
			 */
			
			const {visiting, visitorName, company} = this.state;

			/**
			 * Then we can pass them through as props to the navigator 
			 */
			
			this._navigate('Drinks', { visiting, visitorName, company });

		}else{
			this.setState({ 
				personalInfoError: true
			}) 
		}

	}
	
	/**
	 * Adds another input to the page where people can add a name, will need to add a condition which stops people
	 * from adding 100s
	 */
	
	addPerson () {

		/**
		 * This means that the inputs are being adequately filled in, saves for people fucking about with it
		 * 'trying to break it'. So annoying when you get a smartass who does that
		 */

		if(this.state.visitorName.length === this.state.inputCount){

			const newCount = this.state.inputCount + 1;

			this.setState({
				inputCount: newCount
			})

		}

	}

	/**
	 * Adds a visitor to the VisitorName state array
	 * @param {string} name gets passed when textInput is changed
	 * @param {int} personCount The number of the TextInput, we use it to modify the array
	 */
	
	addVisitorName (name, personCount) {

		let visitors = this.state.visitorName;
		
		/**
		 * If it's an empty array we'll push the first person to it. As we're passing it on press
		 * it will actually be the first piece of text that they typed, not ideal but I'd 
		 * rather do that that push to state on blur, as this may fail in some situations
		 */
		
		if(visitors.length === 0){

			visitors.push(name);

		}else{

			/**
			 * Splicing based on 0 based arrays
			 */
			
			visitors.splice(personCount - 1, 1, name);

			this.setState({
				visitorName: visitors
			})

		}

	}

	/**
	 * Runs a loop depending on this.state.inputCount and returns the correct amount of inputs
	 * For the first input autoFocus is set to true
	 */
	
	textInputs () {

		let inputs = [];

		for(let i = 1; i <= this.state.inputCount; i++){
			inputs.push(
				<TextInput 
					autoCorrect={ false }
					ref={ `visitor-${i}` }
					autoFocus={ i === 1 ? true : false }
					onChangeText={(name) => { this.addVisitorName(name, i); }} 
					style={ [styles.textInput, styles.colour_2_bg] }
					placeholder={ this.props.view_2.q }
					onSubmitEditing={ () => { 
    				this.refs.CompanyNameInput.focus(); 
  				} }
				/>
			)
		}

		return inputs;

	}

	/**
	 * The routeName parameter which gets passed relates the route.name switch statement in app.<platform>.js
	 */
	
	_navigate(routeName, props = null){

		/**
		 * This can be a bit temperamental, so we'll wrap it in a try/catcb to find out what's causing an issue
		 */
		
	  this.props.navigator.push({
	    name: routeName,
	    passProps: { ...props }
    })
	}

	render () {
				console.log('HEIGHT IS', parseInt(parseInt(this.props.height)));
//[{height: parseInt(this.props.height)}]
		return (
			<View style={ [styles.mainView] }>
				<KeyboardAwareScrollView
          onScroll={ () => { console.log('onScroll!'); } }
          scrollEventThrottle={ 200 }
          style={ styles.scrollView }> 
					{ this.stageRenderer() }
				</KeyboardAwareScrollView>					
			</View>
		)
	}

	/**
	 * Because there's lots going on here I'm splitting out the render function into smaller render calls. 
	 */
	
	stageRenderer () {
		if(!this.state.renderNext){
			return this.renderAutoComplete();
		}else{
			return this.renderPersonalInfo();
		}
	}

	/**
	 * This is the first screen, the AutoComplete name input
	 */
	
	renderAutoComplete () {

		/**
		 * For some reason a glitch in the autoComplete plugin doesn't allow me to store the selected value 
		 * in the component state so I have to store it as this variable. Ends up being quite useful for validation
		 * though
		 */
		
		let selectedValue = '';

		/**
		 * If the AutoComplete hasn't been done properly, we update the state which sets the below to visible
		 */
		
		let autoCompleteError;

		/**
		 * Some basic error handling to return a simple error message if they didn't fill in the form correctly
		 */
		
		if(this.state.autoCompleteError){
			autoCompleteError = <Text style={ styles.error }>{ this.props.view_1.error }</Text>;
		}

		return(
			<View style={ styles.fullHeight }>
				<View style={ styles.row }>
					<Text style={ styles.mainTitle }>{ this.props.view_1.title }</Text>		
				</View>
				<View>
					{ autoCompleteError }	   
		   	</View>
				<View style={ styles.row }>
					<AutoComplete
		        onTyping={ (text) => this.handleChange(text) }
		        onSelect={ (e) => { selectedValue = e; this.autoCompleteSubmit(selectedValue); } }
		        onSubmitEditing={ (e) => { this.autoCompleteSubmit(selectedValue) } }
		        autoFocus= {true}
		        suggestions={ this.state.people }

		        placeholder={ this.props.view_1.q }
		        style={ [styles.textInput, styles.colour_2_bg] }
		        clearButtonMode='always'
		        returnKeyType='go'
		        textAlign='center'
		        clearTextOnFocus={ true }

		        maximumNumberOfAutoCompleteRows={ 10 }
		        applyBoldEffectToAutoCompleteSuggestions={ true }
		        reverseAutoCompleteSuggestionsBoldEffect={ true }
		        showTextFieldDropShadowWhenAutoCompleteTableIsOpen={ false }
		        autoCompleteTableViewHidden={ false }

		        autoCompleteTableBackgroundColor={ ysColours['patrick'] }
		        autoCompleteTableCornerRadius={ 0 }
		        autoCompleteTableBorderWidth={ 0 }

		        autoCompleteRowHeight={ 90 }

		        autoCompleteFontSize={ 20 }
		        autoCompleteRegularFontName='Din OT'
		        autoCompleteBoldFontName='Din OT'
		        autoCompleteTableCellTextColor={'white'}
		      />
		   	</View>
			 </View>
		)
	}

	/**
	 * This is the second screen, where we get their details
	 * I've used a string replace to populate the data of who they submitted
	 */
	
	renderPersonalInfo () {

		/**
		 * If the Personal Info hasn't been filled out properly, we update the state which sets the below to visible
		 */
		
		let personalInfoError;

		if(this.state.personalInfoError){
			personalInfoError = <Text style={ styles.error }>{ this.props.view_2.error }</Text>;
		}

		return(
			<View style={ styles.fullHeight }>
				<View style={ styles.row }>
					<Text style={ styles.mainTitle }>{ this.props.view_1.title }</Text>		
				</View>				
				<View style={ styles.column } >
					{ this.textInputs() }
					<TouchableHighlight onPress={ (e) => { this.addPerson() } }>
						<Text style={ styles.smallText }>{ this.props.view_2.add_person }</Text>
					</TouchableHighlight>
					<TextInput 
						autoCorrect={ false }
						ref="CompanyNameInput"
						onChangeText={(company) => this.setState({ company: company })} 
						style={ [styles.textInput, styles.colour_2_bg] }
						placeholder={ this.props.view_2.q2 }
						/>
	        <TouchableHighlight underlayColor={ ysColours['squirtle'] } style={ [styles.touchableButton, styles.colour_2_border] } onPress={ this.handleSubmit }>
	        	<Text style={ styles.button }>{ this.props.view_2.submit.replace('!!!!', this.state.visiting.split(' ')[0] ) }</Text>
	        </TouchableHighlight>
		   	</View>
		   	<View>
		   		{ personalInfoError }
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
  	view_1: state.CONFIG.text.screen_3.view_1,
  	view_2: state.CONFIG.text.screen_3.view_2,
  	people: state.people,
  	height: state.height
  }
}

export default connect(mapStateToProps)(Meeting);