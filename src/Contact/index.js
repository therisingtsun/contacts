class Contact {
	/**
	 * @param {string} firstName 
	 * @param {string} lastName 
	 * @param {number} phoneNumber 
	 */
	constructor (firstName, lastName, phoneNumber) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
	}
}

module.exports = Contact;