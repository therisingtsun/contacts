const ContactManager = require("./src/ContactManager");
const { readFileSync } = require("node:fs");

const dataString = readFileSync("data_1M.csv", "utf-8");

const manager = new ContactManager();

const label_1M_add = "Adding 1M Contacts";
console.time(label_1M_add);
dataString.split("\n").forEach(line => manager.addContact(...line.split(",")));
console.timeEnd(label_1M_add);

const label_search = "Searching...";
console.time(label_search);
manager.search("firstName", "fe", "prefixSearch");
// manager.search("firstName", "se", "prefixSearch");
// manager.search("firstName", "te", "prefixSearch");
// manager.search("firstName", "be", "prefixSearch");
// manager.search("firstName", "me", "prefixSearch");

// manager.search("firstName", "pi", "prefixSearch");
// manager.search("firstName", "lo", "prefixSearch");

// manager.search("firstName", "be", "prefixSearch");
// manager.search("firstName", "me", "prefixSearch");
// manager.search("firstName", "martin", "strictSearch");
console.timeEnd(label_search);

const label_search_2 = "Searching 2...";
console.time(label_search_2);
manager.search("firstName", "fe", "prefixSearch");
// manager.search("firstName", "martin", "strictSearch");
console.timeEnd(label_search_2);
// console.log(manager.cachedResults.cache);