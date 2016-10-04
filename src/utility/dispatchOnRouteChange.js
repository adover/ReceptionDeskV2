/**
 * Connect to the Redux store so we can update the state
 */

import store from '../store/buildStore';
import { setRoute } from '../actions/actionCreators';

const dispatchOnRouteChange = (routeName) => {

  /**
   * We'll null the routeName if it's welcome, as that means we're starting over
   */

  if(routeName === 'Welcome') routeName = null;

  store.dispatch(setRoute(routeName));

}

export default dispatchOnRouteChange;