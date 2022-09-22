const Employee = require("./employee.js");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = this.github;
    }

    getGitHub() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;