const Contact = require("./Contact");
const ContactManager = require("./ContactManager");

const manager = new ContactManager();

manager.contacts.push(
	new Contact("Vipin", "Yadav", "+919234567890"),
	new Contact("Vipin", "Changed", "+121122334455"),
	new Contact("Risabh", "Yadav", "+918899889988"),
);

console.log(manager.search("lastName", "Changed", "strictSearch"));
console.log(manager.cachedResults.cache);