const { readFileSync } = require("node:fs");
const ContactManager = require("./src/ContactManager");

const manager = new ContactManager();

const label_1M_add = "Adding 1M Contacts";
console.time(label_1M_add);
const dataString = readFileSync("data_1M.csv", "utf-8");
dataString.split("\n").forEach(line => manager.addContact(...line.split(",")));
console.timeEnd(label_1M_add);

const label_search = "Searching...";
console.time(label_search);
manager.search("firstName", "fe", "prefixSearch");
// manager.search("firstName", "martin", "strictSearch");
console.timeEnd(label_search);

const label_search_2 = "Searching 2...";
console.time(label_search_2);
manager.search("firstName", "fe", "prefixSearch");
// manager.search("firstName", "martin", "strictSearch");
console.timeEnd(label_search_2);