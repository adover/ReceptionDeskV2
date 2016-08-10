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
			'drink': 'We\'ll fix you that drinkOfChoice.'
		}
	},
	'screen_3': {
		// I have a meeting with someone
		'view_1': {
			'title': 'Here for a meeting',
			'q': 'Who do you have a meeting with?',
			'defaultPersonInputValue': 'Start typing the name of who you want to see',
			'error': 'Please select a name from the drop down'
		},
		'view_2': {
			'q': 'What\'s your name?',
			'q2': 'Which company are you from?',
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
			'Coffee',
			'Tea',
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
if (time < 12) {
	console.log('time!', time)
  TEXT_CONFIG['screen_5']['q'] = TEXT_CONFIG['screen_5']['q'].slice(0,3)
}

export default TEXT_CONFIG;