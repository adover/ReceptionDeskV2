/**
 * This is the Main configuration file for the site. It's always a good idea 
 * to import all of the configurations into this one, as it'll be the 
 * first place people look
 */

import TEXT_CONFIG from './textConfig';

const CONFIG = {
	'text': TEXT_CONFIG,
	'slack': {
		'enabled': true, // Turn this to false for development
		'title': 'Reception Desk Announcement',
		'api': {
			'root': 'https://slack.com/api/',
			'client_id': '2536788802.67089751810',
			'client_secret': '09cc968176bb352a3005d69d1e1990cf',
			'oauth_uri': 'receptiondesk://auth',
			'ouath_access_uri': 'https://slack.com/api/oauth.access',
		},
		'default_user': 'andydover',
		'fallback_user': 'andydover',
		'notification_group': 'dovertest',
		'group_id': 'C0A1ENMAA',
		// ------------
		// general
		// C02FSP6Q6
		// ------------
		// 'default_user': 'sarah.myers',
		// 'fallback_user': 'courtney',
		// 'notification_group': 'general',
		'messages' : {
			'default_message': 'Hey<!channel>, there is a visitor at reception.',
			'visitor': '<!channel>, visitorName from company is here to see <@visiting> in reception. ',
			'visitor_not_online': 'It doesn\'t look like they\'re online.', 
			'delivery_nosig': '<!channel>, a package has been dropped at reception.',
			'delivery': '<!channel>, there\'s a courier at reception who needs a signature.',
			'drink': 'Hi <@slackUser>, can you make the visitor (visitorName) a drinkName. Thanks!'
		}
	}
}

export default CONFIG