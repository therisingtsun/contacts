const Contact = require("./Contact");
const ContactManager = require("./ContactManager");

const manager = new ContactManager();

manager.contacts.push(
	new Contact("Vipin", "Yadav", 1234567890),
	new Contact("Vipin", "Changed", 1122334455),
	new Contact("Risabh", "Yadav", 8899889988),
);

console.log(manager.search("lastName", "Changed", "strictSearch"));