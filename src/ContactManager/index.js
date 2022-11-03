const Contact = require("../Contact");

class ContactManager {
	constructor () {
		this.contacts = [];
	}

	/**
	 * @param {"firstName" | "lastName", "phoneNumber"} keyType 
	 * @param {string | number} key 
	 */
	searchPartial(keyType, key) {
		const results = this.contacts.filter(
			(contact) => new RegExp(`^${key}.*`)
				.test(contact[keyType].toString())
		);
		
		return {
			count: results.length,
			results
		};
	}
}

module.exports = ContactManager;