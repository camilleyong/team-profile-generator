const Employee = require("./employee.js");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber
    }

    getOfficeNumber(){
        return this.officenumber;
    }
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;