const Contact = require("../Contact");
class ContactManager {
	constructor() {
		this.contacts = [];
	}
	addContacts(firstName, lastName, phoneNumber) {
		const newContact = new Contact(firstName, lastName, phoneNumber)
		this.contacts.push(newContact)
	}
}

module.exports = ContactManager;