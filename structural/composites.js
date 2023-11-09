class CatalogGroup {
    constructor(name, composites=[]) {
        this.name = name
        this.composites = composites
    }
    get total() {
        return this.composites.reduce((total, nextItem) => total += nextItem.total, 0)
    }

    print() {
        console.log(`\n${this.name.toUpperCase()}`)
        this.composites.forEach(item => item.print())
    }
}

class CatalogItem {
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    get total() {
        return this.price
    }

    print() {
        console.log(`${this.name} $${this.price}`)
    }
}

function run() {
    const boots = new CatalogItem('Leather Boots', 79.99)
    const sneakers = new CatalogItem('Kicks', 39.99)
    const flipFlops = new CatalogItem('California wook boots', 19.99)

    const group_shoes = new CatalogGroup('Shoes and Such', [boots, sneakers, flipFlops])
    const group_foods = new CatalogGroup('Food for while you try on clothes', [
        new CatalogItem('Milkshake', 5.99),
        new CatalogItem('French Fries', 3.99)
    ])
    const key_chain = new CatalogItem('Key Chain', 1.99)

    const catalog = new CatalogGroup('Clothes and Food', [key_chain, group_shoes, group_foods])
    
    catalog.print()
    console.log(`$${catalog.total}`)
}

run()

