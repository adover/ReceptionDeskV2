/**
 * The Redux Reducer is the source of a lot of confusion but it's actually super simple.
 * The reducer expects an action with a 'type' property (String)
 * The other information contained in the action modifies only the part of the state
 * it needs to. 
 * 
 * When updating the state you should never do anything which would produce any side effects, 
 * this is known as a pure function (https://en.wikipedia.org/wiki/Pure_function)
 *
 * If you are looking to do stuff which involves making API calls or doing other funky stuff
 * it's worth putting it before the action is dispatched in the view's logic 
 * or using a tool like Redux Thunk (https://github.com/gaearon/redux-thunk)
 */

import { 
  combineReducers 
} from 'redux';
import INITIAL_STATE from '../initialState';

/**
 * When Importing using lodash be sure to import just the method you want to use. 
 * Importing the whole library creates bloat
 */

import assignIn from 'lodash/assignIn';

/**
 * In this reducer you'll see I've chosen to do things using Lodash's AssignIn instead
 * of Immutable. I feel that for our situation and the fact we're a small, tightly knit 
 * team using something like Immutable is somewhat excessive and serves to add confusion
 * instead of clarity
 */

const people = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    /**
     * Here you can see I've got two different actions that do the same thing. This is
     * simply to keep things verbose and readable.
     */
    
    case 'ADD_PEOPLE':
  	case 'FILTER_PEOPLE':
  		return assignIn(action.people, state);
  	break;

  	/**
  	 * In the case of clearing the search we want to return the initial state. As you can 
  	 * see in the method declaration I've used ES6 default arguments syntax to return the 
  	 * initial state object
  	 */
  	
  	case 'CLEAR_PEOPLE':
    default:
      return state
  }
}

/**
 * Once we've got the access token for slack we can push it into the state of the application
 */

const slackAccesstoken = (state = INITIAL_STATE, action) => {
  if(action.type === 'SET_ACCESS_TOKEN'){
    return assignIn(action.token, state)
  }

  return state;
}

const drink = (state = INITIAL_STATE, action) => {
  if(action.type === 'SET_DRINK'){
    return assignIn(action.drink, state)
  }

  return state;
}

/**
 * When combining reducers it's important to produce the same object as the keys applied to it
 * or else it throws an error. 
 * http://stackoverflow.com/questions/33677833/react-redux-combining-reducers-unexpected-keys
 */

export default combineReducers({
  people,
  slackAccesstoken,
  drink,
  CONFIG: (state = {}) => state
})