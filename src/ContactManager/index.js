const crypto = require("node:crypto");
const Trie = require("trie-search");
const validator = require("validator")

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
			return this.prefixSearch(manager, keyType, key)
				.filter(contact => contact[keyType].toLowerCase() === key.toLowerCase());
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

		if (!firstName.length || !phoneNumber.length) throw new Error("Input can't be NULL")
		if (!(/^\+[1-9]\d{1,14}$/).test(phoneNumber)) throw new Error("Phone Number should be a valid input")

		if (firstName.length > 100) throw new Error("First Name length exceeds limit")
		if (lastName.length > 100) throw new Error("Last Name length exceeds limit")
		if (phoneNumber.length > 15) throw new Error("Phone Number length exceeds limit")

		const index = this.contacts.length;
		this.tries.firstName.map(firstName, index);
		this.tries.lastName.map(lastName, index);
		this.tries.phoneNumber.map(phoneNumber, index);
		this.contacts.push(new Contact(firstName, lastName, phoneNumber));
		return this;
	}
}

module.exports = ContactManager;