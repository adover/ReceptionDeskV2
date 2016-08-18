import set from 'lodash/set';

/**
 * This is the main configuration file. It's always worth putting all of the text in one 
 * file if you're not using a database, making edits and updates relatively easy.
 * It also means this file can be handed off to a non technical person if need be
 */

let TEXT_CONFIG = {
	'welcome': 'Welcome to Young + Shand',
	'routes': {
		'Welcome': 'Welcome to our office',
		'Meeting': 'Here for a meeting',
		'Delivery': 'Something to deliver',
		'Default': 'Looking to speak to somebody'
	},
	'screen_1': {
		'small_title': 'Welcome to our office',
		'title': 'What are you here for today?',
		'answers': [
			{
				'route_name': 'Default',
				'text': 'I\'d like to speak with someone',
			},
			{
				'route_name': 'Meeting',
				'text': 'I have a meeting with someone',
			},
			{
				'route_name': 'Delivery',
				'text': 'I have a delivery',
			}			
		]
	},
	'screen_2': {
		// I would like to speak with someone
		'text': {
			'small_title': 'Take a seat',
			'big_text': 'Great.',
			'default_text': 'Someone will be with you shortly.',
			'delivery_no_signature': 'Thanks for dropping it off!',
			'has_name': 'personComing will be with you shortly, please take a seat.',
			'drink': 'We\'ll fix you that drink.'
		}
	},
	'screen_3': {
		'small_title': 'Meeting',
		// I have a meeting with someone
		'view_1': {
			'title': 'Who do you have a meeting with?',
			'q': 'Start typing the name of who you are visiting',
			'error': 'Please select a name from the drop down'
		},
		'view_2': {
			'title': 'Who do you have a meeting with?',
			'q': 'What\'s your name?',
			'q2': 'Which company are you from?',
			'add_person': 'Add another person',
			'submit': 'Tell !!!! you\'re here',
			'error': 'Please fill in the fields'
		}
	},
	'screen_4': {
		// I have a delivery
		'small_title': 'Delivery',
		'title': 'Do you need a signature?',
		'answers': [
			'Yes',
			'No'
		]
	},
	'screen_5': {
		/**
		 * As the drink is only available in the meeting scenario we'll cheat a little here,
		 * this will be the first thing that needs to be expanded
		 */
		
		'small_title': 'Meeting',
		'title': 'Do you want a drink?',
		'answers': [
			'No thanks',
			'Long Black Coffee',
			'Flat White Coffee',
			'Tea',
			'Green Tea',
			'Water',
			'Sparkling Water',
			'Beer',
			'White Wine',
			'Red Wine',
		]
	}
}

/**
 * It's a good idea if we're offering people drinks to exclude the alcohol before lunchtime
 */

const time = new Date().getHours(); 

if (time > 12) {

	let drinks = TEXT_CONFIG['screen_5']['answers'];

	/**
	 * If the list of drinks above changes you need to make sure the slice is modified
	 */
	
	let nonAlcoholic = drinks.slice(0, drinks.length - 3);

	/**
	 * Set is from Lodash
	 */
	
  set(TEXT_CONFIG, ['screen_5','answers'], nonAlcoholic);

}

export default TEXT_CONFIG;