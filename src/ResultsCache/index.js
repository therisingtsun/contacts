const Contact = require("../Contact");

class ResultsCache {
	/**
	 * @param {number} size 
	 */
	constructor(size) {
		this.cache = new Map();
		this.size = size;
	}

	/**
	 * @param {string} key 
	 * @returns {Array<Contact>}
	 */
	retrieve(key) {
		const value = this.cache.get(key);
		if (value) {
			this.cache.delete(key);
			this.cache.set(key, value);
		}
		return value;
	}

	/** 
	 * @param {string} key 
	 * @param {Array<Contact>} value 
	 */
	put(key, value) {
		this.cache.delete(key);
		if (this.cache.size === this.size) this.cache.delete(this.cache.keys().next().value);
		this.cache.set(key, value);
	}
}

module.exports = ResultsCache;