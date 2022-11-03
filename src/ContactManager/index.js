const Contact = require("../Contact");
const ResultsCache = require("../ResultsCache");

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
		const results = this.contacts.filter(contact => strategies[searchStrategy](contact, keyType, key));
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