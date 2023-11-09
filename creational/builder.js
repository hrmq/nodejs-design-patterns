class Person {
    constructor(builder) {
        this.name = builder.name
        this.isEmployee = builder.isEmployee
        this.isManager = builder.isManager
        this.hours = builder.hours || 0
        this.money = builder.money || 0
        this.shoppingList = builder.shoppingList || []
    }

    toString(){
        return JSON.stringify(this)
    }
}

class PersonBuilder {
    constructor(name) {
        this.name = name
    }

    makeEmployee() {
        this.isEmployee = true
        return this
    }

    makeManager(hours=40) {
        this.isManager = true
        this.hours = hours
        return this
    }

    makePartTime(hours=20) {
        this.hours = hours
        return this
    }

    withMoney(money) {
        this.money = money
        return this
    }

    withList(list=[]) {
        this.shoppingList = list
        return this
    }

    build() {
        return new Person(this)
    }
}

function run() {
    
    // Employees
    const sue = new PersonBuilder('Sue').makeEmployee().makeManager(60).build()
    const bill = new PersonBuilder('Bill').makeEmployee().makePartTime().build()
    const phil = new PersonBuilder('Phil').makeEmployee().build()

    // Shoppers
    const charles = new PersonBuilder('Charles')
        .withMoney(500)
        .withList(['jeans', 'sunglasses'])
        .build()

    const tabbitha = new PersonBuilder('Tabbitha').withMoney(1000).build()

    console.log(sue.toString())

}

run()