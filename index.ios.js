/**
 * This is the start point for iOS, although this code is exactly the same 
 * as the Android so we can share code
 */

import { AppRegistry } from 'react-native';
import Init from './src/init';

/**
 * AppRegistry is the JS entry point to running all React Native apps. 
 * App root components should register themselves with AppRegistry.registerComponent, 
 * then the native system can load the bundle for the app and then actually 
 * run the app when it's ready by invoking AppRegistry.runApplication.
 */

AppRegistry.registerComponent('ReceptionDesk', Init);





