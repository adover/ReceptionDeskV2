/**
 * The fetch call is basically a decorated promise. I decided to abstract it out so that
 * I can use it whenever I need to
 */

const doFetch = (url, method = null, headers = {}, cors = null, cache = null) => {

	/**
	 * The Headers interface allows you to create your own headers object via the Headers() constructor. 
	 * A headers object is a simple multi-map of names to values.
	 */
	
	headers = new Headers(headers);

	const init = {
		method,
		headers,
		cors,
		cache
	}

	return fetch(url, init)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default doFetch;