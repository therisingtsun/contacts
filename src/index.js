const Contact = require("./Contact");
const ContactManager = require("./ContactManager");

const manager = new ContactManager();

const contactA = new Contact("Vipin", "Yadav", 1234567890);
const contactB = new Contact("Vipin", "Changed", 1122334455);
const contactC = new Contact("Risabh", "Yadav", 8899889988);

manager.contacts.push(contactA, contactB, contactC);

// console.log(manager.searchPartial("phoneNumber", 1));
const strictSearch = (key, param) => {
    const searchResults = contactBook.filter(contact => contact[param] === key)
    return searchResults
}
