import React from 'react';
import CONFIG from './config/config';
import { 
  connect 
} from 'react-redux';

/**
 * Import all of the page components which could be called by the navigator
 */

import Welcome from './views/welcomeView';
import Delivery from './views/deliveryView';
import Meeting from './views/meetingView';
import Default from './views/defaultView';
import Drinks from './views/drinkView';

/**
 * React Native deals with components called <Text /> and <View /> in place of <span /> and <div /> tags
 * This component contains the navigator component, which handles moving from one view to another
 */

import { 
  Navigator 
} from 'react-native';

class App extends React.Component {
  constructor () {
    super();

    /**
     * If you want to access the component directly within a custom function you need to bind 'this'
     */
    
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene (route, navigator) {

    /**
     * We get the route name from the _navigate() call made in the components below
     * {...route.passProps} contains properties which get passed from one view to another
     */

    switch (route.name) {
      case 'Welcome':
       return <Welcome navigator={navigator} {...route.passProps} />
      break;    
      case 'Delivery':
       return <Delivery navigator={navigator} {...route.passProps} />
      break;
      case 'Meeting':
       return <Meeting navigator={navigator} {...route.passProps} />
      break;
      case 'Drinks':
       return <Drinks navigator={navigator} {...route.passProps} />
      break;
      case 'Default':
       return <Default navigator={navigator} {...route.passProps} />
      break;
    }

  }

  /**
   * configureScene is where you can set how the scene is rendered onto the screen.
   * Choose from the following
   * PushFromRight
   * FloatFromRight
   * FloatFromLeft
   * FloatFromBottom
   * FloatFromBottomAndroid
   * FadeAndroid
   * HorizontalSwipeJump
   * HorizontalSwipeJumpFromRight
   * VerticalUpSwipeJump
   * VerticalDownSwipeJump
   */
  
  configureScene(route, routeStack){

    /**
     * If you want to pass a type prop in you could use the following condition
     */

    // if(route.type === 'Modal') {
    //   return Navigator.SceneConfigs.FloatFromBottom
    // }

    return Navigator.SceneConfigs.PushFromRight 
  }

  /**
   * The only component which gets called is the Navigator component, it deals with the rest of it
   */

  render () {
    return (
      <Navigator
        configureScene={ this.configureScene }
        style={{ flex:1 }}
        initialRoute={{ name: 'Welcome' }}
        renderScene={ this.renderScene }
      />
    )
  }
}

export default App;