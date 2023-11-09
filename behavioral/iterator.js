const readline = require('readline')

class InventoryItem {
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    writeLn() {
        process.stdout.write(`${this.name}: $${this.price}`)
    }
}

class Iterator {
    constructor(items=[]) {
        this.index = 0
        this.items = items
    }

    first() {
        const [first] = this.items
        return first
    }

    last() {
        const [first] = [...this.items.reverse()]
        return first
    }

    next() {
        if (this.hasNext()) {
            this.index++
        }
        return this.current()
    }

    prev() {
        if(this.index !== 0) {
            return this.index--
        }
        return this.current()
    }

    hasNext() {
        return this.index < this.items.length - 1
    }

    current() {
        return this.items[this.index]
    }
}

function run() {
    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)

    console.log('Press any direction key...')

    const inventory = new Iterator([
        new InventoryItem('Poles', 9.99),
        new InventoryItem('Skis', 799.99),
        new InventoryItem('Boots', 799.99),
        new InventoryItem('Burgers', 5.99),
        new InventoryItem('Fries', 2.99),
        new InventoryItem('Shake', 4.99),
        new InventoryItem('Jeans', 59.99),
        new InventoryItem('Shoes', 39.99),
    ])

    process.stdin.on('keypress', (str, key) => {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)

        switch(key.name) {
            case 'right':
                inventory.next().writeLn()
                break
            
            case 'left':
                inventory.prev().writeLn()
                break
            
            case 'up':
                inventory.first().writeLn()
                break
            
            case 'down':
                inventory.last().writeLn()
                break
            
            case 'c':
                if (key.ctrl) {
                    process.exit()
                }
        }
    })
}

run()