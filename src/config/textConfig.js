import set from 'lodash/set';

/**
 * This is the main configuration file. It's always worth putting all of the text in one 
 * file if you're not using a database, making edits and updates relatively easy.
 * It also means this file can be handed off to a non technical person if need be
 */

let TEXT_CONFIG = {
	'welcome': 'Welcome to Young + Shand',
	'screen_1': {
		'title': 'Welcome',
		'q': 'What are you here for today?',
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
			'default_text': 'Great. Someone will be with you shortly.',
			'delivery_no_signature': 'Nice. Thanks for dropping it off!',
			'has_name': 'Cool. personComing will be with you shortly, please take a seat.',
			'drink': 'We\'ll fix you that drink.'
		}
	},
	'screen_3': {
		// I have a meeting with someone
		'view_1': {
			'title': 'Here for a meeting',
			'q': 'Who do you have a meeting with?',
			'defaultPersonInputValue': '',
			'error': 'Please select a name from the drop down'
		},
		'view_2': {
			'q': 'What\'s your name?',
			'q2': 'Which company are you from?',
			'add_person': 'Add another person',
			'submit': 'Tell !!!! you\'re here',
			'error': 'Please fill in the fields'
		}
	},
	'screen_4': {
		// I have a delivery
		'title': 'Delivering an item',
		'q': 'Do you need a signature?',
		'answers': [
			'Yes',
			'No'
		]
	},
	'screen_5': {
		// Drink
		'title': 'Fancy a drink?',
		'q': 'Do you want a drink?',
		'answers': [
			'No thanks',
			'Coffee: Long Black',
			'Coffee: Flat White',
			'Tea',
			'Green Tea',
			'Water',
			'Beer',
			'White Wine',
			'Red Wine'
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