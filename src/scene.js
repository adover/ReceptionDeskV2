import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

class Scene extends React.Component{

	/**
	 * It's important to add PropTypes to all of your components,
	 * this will ensure that the data which gets passed through as props
	 * will be typed correctly. I also intend to move over to FlowType
	 * which introduces static typing, much safer
	 */
	
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    onForward: React.PropTypes.func.isRequired,
    onBack: React.PropTypes.func.isRequired,
  }

	constructor () {
		super();
	}
	
	render () {
		return (
			<View>
				<Text>This appears</Text>
				<TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
			</View>
		)
	}
}

export default Scene;