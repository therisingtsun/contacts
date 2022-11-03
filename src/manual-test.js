const Contact = require("./Contact");
const ContactManager = require("./ContactManager");

const manager = new ContactManager();

manager
	.addContact("Vipin", "Yadav", "+919234567890")
	.addContact("Vipin", "Changed", "+121122334455")
	.addContact("Risabh", "Yadav", "+918899889988");

console.log(manager.search("lastName", "Y", "prefixSearch"));
// console.log(manager.cachedResults.cache);