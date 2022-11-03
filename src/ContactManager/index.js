const crypto = require("node:crypto");
const Trie = require("trie-search");

const Contact = require("../Contact");
const ResultsCache = require("../ResultsCache");

/** @typedef {"firstName" | "lastName" | "phoneNumber"} keyType */

class ContactManager {
	constructor() {
		this.contacts = [];
		this.cachedResults = new ResultsCache();
		this.tries = {
			firstName: new Trie(),
			lastName: new Trie(),
			phoneNumber: new Trie()
		};
	}

	static strategies = {
		prefixSearch(manager, keyType, key) {
			return manager.tries[keyType].search(key).map(index => manager.contacts[index]);
		},
		strictSearch(manager, keyType, key) {
			return manager.contacts.filter(contact => contact[keyType].toLowerCase() === key.toLowerCase());
		}
	}

	/**
	 * @param {keyType} keyType 
	 * @param {string} key 
	 * @param {string} searchStrategy 
	 * @returns 
	 */
	search(keyType, key, searchStrategy) {
		const secret = "CRED";
		const hash = crypto.createHmac("sha256", secret)
			.update(keyType + key + searchStrategy)
			.digest("hex");
		let results = this.cachedResults.retrieve(hash);
		if (!results) {
			results = ContactManager.strategies[searchStrategy](this, keyType, key);
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
		this.tries.firstName.map(firstName, this.contacts.length);
		this.tries.lastName.map(lastName, this.contacts.length);
		this.tries.phoneNumber.map(phoneNumber, this.contacts.length);
		this.contacts.push(new Contact(firstName, lastName, phoneNumber));
		return this;
	}
}

module.exports = ContactManager;