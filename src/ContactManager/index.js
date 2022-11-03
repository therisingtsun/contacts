const Contact = require("../Contact");
const ResultsCache = require("../ResultsCache");
const crypto = require('node:crypto');

/** @typedef {"firstName" | "lastName" | "phoneNumber"} keyType */

const strategies = {
	prefixSearch(contact, keyType, key) {
		return new RegExp(`^${key}.*`).test(contact[keyType]);
	},
	strictSearch(contact, keyType, key) {
		return contact[keyType] === key;
	}
};

class ContactManager {
	constructor() {
		this.contacts = [];
		this.cachedResults = new ResultsCache();
	}

	/**
	 * @param {keyType} keyType 
	 * @param {string} key 
	 * @param {string} searchStrategy 
	 * @returns 
	 */
	search(keyType, key, searchStrategy) {
		const secret = 'CRED';
		const hash = crypto.createHmac('sha256', secret)
			.update(keyType + key + searchStrategy)
			.digest('hex');
			
		let results = this.cachedResults.retrieve(hash);
		console.log("check",results)
		if (!results) {
			results = this.contacts.filter(contact => strategies[searchStrategy](contact, keyType, key));
			this.cachedResults.put(hash, results);
		}
		return {
			count: results.length,
			results
		};
	}

	/**
	 * @param {string} firstName 
	 * @param {string} lastName 
	 * @param {string} phoneNumber 
	 */
	addContact(firstName, lastName, phoneNumber) {
		const newContact = new Contact(firstName, lastName, phoneNumber)
		this.contacts.push(newContact)
		return this;
	}
}

module.exports = ContactManager;