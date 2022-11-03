const Contact = require("../Contact");

class ResultsCache {
	/**
	 * @param {number} size 
	 */
	constructor (size) {
		this.cache = new Map();
		this.size = size;
	}

	/**
	 * @param {string} key 
	 */
	retrieve(key) {

	}

	/** 
	 * @param {string} key 
	 * @param {Array<Contact>} value 
	 */
	put(key, value) {

	}
}

module.exports = ResultsCache;