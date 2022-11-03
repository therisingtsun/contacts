const Contact = require("../Contact");
const strategies = { }
class ContactManager {
	constructor() {
		this.contacts = [];
	}

	/**
	 * @param {"firstName" | "lastName" | "phoneNumber"} keyType 
	 * @param {string | number} key 
	 */
	partialSearch(keyType, key) {
		const results = this.contacts.filter(
			(contact) => new RegExp(`^${key}.*`)
				.test(contact[keyType].toString())
		);

		return {
			count: results.length,
			results
		};
	}
	search(keyType, key, partial = false) {

		const results = contactBook.filter(contact => (partial ? this.partialSearch : this.strictSearch).call(null,contact,keyType,key))
		return {
			count: results.length,
			results
		};
	}

	/**
	 * @param {"firstName" | "lastName" | "phoneNumber"} keyType 
	 * @param {string | number} key 
	 */
	strictSearch(keyType, key) {
		const results = contactBook.filter(contact => contact[keyType].toString() === key)
		return {
			count: results.length,
			results
		};
	}

	/**
	 * @param {string} firstName 
	 * @param {string} lastName 
	 * @param {number} phoneNumber 
	 */
	addContacts(firstName, lastName, phoneNumber) {
		const newContact = new Contact(firstName, lastName, phoneNumber)
		this.contacts.push(newContact)
	}
}

module.exports = ContactManager;