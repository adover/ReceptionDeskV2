/**
 * This is where you define ActionCreators. Action creators are functions that create actions (obviously)
 * An action creator expects the new state property to be updated. This is a cleaner and more visual way
 * to call actions over having them in the dispatcher function call. 
 * This makes the dispatcher call look like so dispatch(actionToDispatch(newStateObject))
 */

export function updatePeopleList(filter) {
  return { 
  	type: 'SET_VISIBILITY_FILTER', filter 
  }
}

export function updateSlackAccessToken(token) {
	return { 
		type: 'SET_ACCESS_TOKEN', token 
	}
}

export function addPeople(people) {
	return { 
		type: 'ADD_PEOPLE', people 
	}
}

export function setRoute(chosenRoute) {
	return { 
		type: 'SET_ROUTE', chosenRoute 
	}
}

export function setContainerHeight(height) {
	return {
		type: 'SET_CONTAINER_HEIGHT', height
	}
}