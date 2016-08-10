/**
 * The Initial State object is exactly that. The Initial State of the application. 
 * This is where you want to set things up.
 */

import CONFIG from './config/config';

/**
 * If we're developing we don't want it constantly calling slack on each reload
 */

const people = (CONFIG.slack.enabled) ? {} : [{
	"first_name": "Ryan",
	"last_name": "Overeem",
	"title": "Aerodynamic",
	"skype": "",
	"phone": "02108294777",
	"image_24": "https://avatars.slack-edge.com/2015-11-05/13915764390_9a4a6c7dd6f425ea27da_24.jpg",
	"image_32": "https://avatars.slack-edge.com/2015-11-05/13915764390_9a4a6c7dd6f425ea27da_32.jpg",
	"image_48": "https://avatars.slack-edge.com/2015-11-05/13915764390_9a4a6c7dd6f425ea27da_48.jpg",
	"image_72": "https://avatars.slack-edge.com/2015-11-05/13915764390_9a4a6c7dd6f425ea27da_72.jpg",
	"image_192": "https://avatars.slack-edge.com/2015-11-05/13915764390_9a4a6c7dd6f425ea27da_192.jpg",
	"image_512": "https://avatars.slack-edge.com/2015-11-05/13915764390_9a4a6c7dd6f425ea27da_192.jpg",
	"image_1024": "https://avatars.slack-edge.com/2015-11-05/13915764390_9a4a6c7dd6f425ea27da_192.jpg",
	"image_original": "https://avatars.slack-edge.com/2015-11-05/13915764390_9a4a6c7dd6f425ea27da_original.jpg",
	"avatar_hash": "9a4a6c7dd6f4",
	"real_name": "Ryan Overeem",
	"real_name_normalized": "Ryan Overeem",
	"email": "ryan.overeem@youngshand.com"
}];
	
const INITIAL_STATE = {
	slackAccesstoken: null,
	people: people,
	CONFIG,
	drink: null
}

export default INITIAL_STATE;