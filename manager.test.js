const Contact = require("./src/Contact");
const ContactManager = require("./src/ContactManager");

const manager = new ContactManager();

test("Add Contact", () => {
	manager
		.addContact("Uday Bhanu", "Bose", "+919008997008")
		.addContact("Vipin", "Yadav", "+121234567890")
		.addContact("Vipin", "Changed", "+919122334455")
		.addContact("Risabh", "Yadav", "+918899889988");

	expect(manager.contacts.length).toBe(4);
	expect(manager.contacts[0]).toStrictEqual(new Contact("Uday Bhanu", "Bose", "+919008997008"));
});

test("Strict Search", () => {
	expect(manager.search("lastName", "changed", "strictSearch")).toStrictEqual({
		count: 1,
		results: [
			new Contact("Vipin", "Changed", "+919122334455")
		]
	});
});

test("Prefix Search", () => {
	expect(manager.search("firstName", "ri", "prefixSearch")).toStrictEqual({
		count: 1,
		results: [
			new Contact("Risabh", "Yadav", "+918899889988")
		]
	});
});

test("Cached Search", () => {
	expect(manager.search("firstName", "ri", "prefixSearch")).toStrictEqual({
		count: 1,
		results: [
			new Contact("Risabh", "Yadav", "+918899889988")
		]
	});
});

test("Invalid Input [ Invalid type for contact fields ]", () => {
	expect(() => manager.addContact("Abhishek", "Rana", 7879787675)).toThrow();
});
test("Invalid Input [ Empty strings as contact fields ]", () => {
	expect(() => manager.addContact("", "Rana", "+917879787675")).toThrow();
});
test("Invalid Input [ Invalid Phone Number ]", () => {
	expect(() => manager.addContact("Abhishek", "Rana", "+917u7978767 r")).toThrow();
});
test("Invalid Input [ Field length exceeds limit ]", () => {
	expect(() => manager.addContact("Abhishek", "Ranaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+917879787675")).toThrow();
});