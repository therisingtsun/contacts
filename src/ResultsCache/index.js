const Contact = require("../Contact");

class ResultsCache {
    /**
     * @param {number} size 
     */
    constructor(size) {
        this.cache = new Map();
        this.size = size;
    }

    /**
     * @param {string} key 
     */
    retrieve(key) {

    }

    /** 
     * @param {string} key 
     * @param {Array<Contact>} value 
     */
    put(key, value) {
        this.cache.delete(key);

        if (this.cache.size === this.size) {
            this.cache.delete(this.cache.keys().next().value);
            this.cache.set(key, value);
        }
        else {
            this.cache.set(key, value);
        }
    }
}

module.exports = ResultsCache;