const { writeFile, existsSync, readFileSync, unlink } = require('fs')

class LocalStorage {
    
    constructor() {
        if (existsSync('localStorage.json')) {
            console.log('Loading items from localStorage.json')
            const text = readFileSync('localStorage.json')
            this.items = JSON.parse(text)
        } else {
            this.items = { }
        }
    }

    get length() {
        return Object.keys(this.items).length
    }

    getItem(key) {
        return this.items[key]
    }

    setItem(key, value) {
        this.items[key] = value
        writeFile('localStorage.json', JSON.stringify(this.items), error => {
            if (error) {
                console.error(error)
            }
        })
    }

    clear() {
        this.items = {}
        unlink('localStorage.json', () => {
            console.log('localStorage file removed')
        })
    }
}

function run() {
    const localStorage = new LocalStorage()
    console.log('localStorage length: ', localStorage.length)

    const uid = localStorage.getItem('uid')
    if (!uid) {
        console.log('User ID not found. Setting the user id and token ...')
        localStorage.setItem('token', 'token_id')
        localStorage.setItem('uid', '12345')
    } else {
        console.log('User ID found', uid)
        console.log('clearing the User ID')
        localStorage.clear()
    }
}

run()