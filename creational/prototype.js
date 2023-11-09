class Customer {
    constructor(first, last, status) {
        this.first = first
        this.last = last
        this.status = status
    }

    say() {
        console.log(`name: ${this.first} ${this.last}, status: ${this.status}`)
    }
}

class CustomerPrototype {
    constructor(proto) {
        this.proto = proto
    }

    clone() {
        const { first, last, status } = this.proto
        const customer = new Customer(first, last, status)
        return customer
    }
}


function run() {
    const proto = new Customer('n/a', 'n/a', 'pending')
    const prototype = new CustomerPrototype(proto)

    const customer = prototype.clone()
    customer.say()
}

run()