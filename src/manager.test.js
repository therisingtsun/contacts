const Contact = require("./Contact");
const ContactManager = require("./ContactManager");

const manager = new ContactManager();

test("Add Contact", () => {
	manager
		.addContact("Uday Bhanu", "Bose", 9008997008)
		.addContact("Vipin", "Yadav", 1234567890)
		.addContact("Vipin", "Changed", 1122334455)
		.addContact("Risabh", "Yadav", 8899889988);

	expect(manager.contacts.length).toBe(4);
	expect(manager.contacts[0]).toStrictEqual(new Contact("Uday Bhanu", "Bose", 9008997008));
});

test("Strict Search", () => {
	expect(manager.search("lastName", "Changed", "strictSearch")).toStrictEqual({
		count: 1,
		results: [
			new Contact("Vipin", "Changed", 1122334455)
		]
	});
});

test("Prefix Search", () => {
	expect(manager.search("firstName", "Ri", "prefixSearch")).toStrictEqual({
		count: 1,
		results: [
			new Contact("Risabh", "Yadav", 8899889988)
		]
	});
});