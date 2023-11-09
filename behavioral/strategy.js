const path = require('path')
const { appendFile } = require('fs')

class Logger {
    constructor(strategy='toConsole') {
        this.logs = []
        this.strategy = LogStrategy[strategy]
    }

    get count() {
        return this.logs.length
    }

    changeStrategy(newStrategy) {
        this.strategy = LogStrategy[newStrategy]
    }

    log(message) {
        const timestamp = new Date().toISOString()
        this.logs.push({ message, timestamp})
        this.strategy(timestamp, message)
    }
}

class LogStrategy {
    static noDate(timestamp, message) {
        console.log(message)
    }

    static toFile(timestamp, message) {
        const fileName = path.join(__dirname, 'data', 'log.txt')
        appendFile(fileName, `${timestamp} - ${message} \n`, error => {
            if (error) {
                console.log('Error writing to file')
                console.error(error)
            }
        })
    }

    static toConsole(timestamp, message) {
        console.log(`${timestamp} - ${message}`)
    }

    static none() {

    }
}

const config = {
    logs: {
        strategy: 'noDate'
    }
}

function run() {
    const logger = new Logger(config.logs.strategy)

    logger.log('Hello World');
    logger.log('Hi World');
    logger.log('Yo World');

    logger.changeStrategy('none');

    logger.log('Hello World');
    logger.log('Hi World');
    logger.log('Yo World');
}

run()

