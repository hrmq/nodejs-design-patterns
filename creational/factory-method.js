class Factory {
    constructor() {
        this.employee = null
    }
    
    createEmployee(type) {
        
        if (type === 'fulltime') {
            this.employee = new FullTime()
        } else if (type === 'part-time') {
            this.employee = new PartTime()
        } else if (type === 'temporary') {
            this.employee = new Temporary()
        } else if (type === 'contractor') {
            this.employee = new Contractor()
        }

        this.employee.say = this.say

        return this.employee
    }

    say() {
        console.log(`${this.type}: rate ${this.hourly}/hour`)
    }
}

class FullTime {
    constructor() {
        this.type = 'full-time'
        this.hourly = '$12'
    }
}

class PartTime {
    constructor() {
        this.type = 'part-time'
        this.hourly = '$11'
    }
}

class Temporary {
    constructor() {
        this.type = 'temporary'
        this.hourly = '$10'
    }
}

class Contractor {
    constructor() {
        this.type = 'contractor'
        this.hourly = '$15'
    }
}

function run() {
    var employees = [];
    var factory = new Factory();

    employees.push(factory.createEmployee("fulltime"));
    employees.push(factory.createEmployee("part-time"));
    employees.push(factory.createEmployee("temporary"));
    employees.push(factory.createEmployee("contractor"));

    for (var i = 0, len = employees.length; i < len; i++) {
        employees[i].say();
    }
}

run()