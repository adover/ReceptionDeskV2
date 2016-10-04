/**
 * This is the main app state and is where we create the Redux store
 * The createStore method expects the Reducer and the Initial App State,
 * which essentially is just an object. We can also pass middleware
 * at this point by using the applyMiddleware() method
 * @type {Object}
 */

import { 
	createStore 
} from 'redux';
import INITIAL_STATE from '../initialState';
import REDUCER from '../reducers/reducer';

const buildStore = createStore(REDUCER, INITIAL_STATE);

export default buildStore;