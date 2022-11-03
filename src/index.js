const Contact = require("./Contact");
const ContactManager = require("./ContactManager");

const strictSearch = (key, param) => {
    const searchResults = contactBook.filter(contact => contact[param] === key)
    return searchResults
}