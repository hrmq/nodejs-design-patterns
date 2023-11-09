const { writeFile, unlink } = require('fs')
const path = require('path')
const { createInterface } = require('readline')

class ExitCommand {
    get name()  {
        return 'exit ... bye!'
    }
    
    execute() {
        process.exit(0)
    }
}

class CreateCommand {
    constructor(fileName, text) {
        this.fileName = fileName
        this.text = text
        this.fullPath = path.join(__dirname, fileName)
    }

    get name() {
        return `create ${this.fileName}`
    }

    execute() {
        writeFile(this.fullPath, this.text, f => f)
    }

    undo() {
        unlink(this.fullPath, f => f)
    }
}

class Conductor {
    constructor() {
        this.history = []
        this.undone = []
    }

    run(command) {
        console.log(`Executing command: ${command.name}`)
        command.execute()
        this.history.push(command)
    }

    printHistory() {
        this.history.forEach(command => console.log(command.name))
    }

    undo() {
        const command = this.history.pop()
        console.log(`undo ${command.name}`)
        command.undo()
        this.undone.push(command)
    }

    redo() {
        const command = this.undone.pop()
        console.log(`redo ${command.name}`)
        command.execute()
        this.history.push(command)
    }
}

function runApplication() {
    const conductor = new Conductor()
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    })

    console.log('create <fileName> <text> | history | undo | redo | exit')
    rl.prompt()

    rl.on('line', input => {
        const [ commandText, ...remaining ] = input.split(' ')
        const [ fileName, ...fileText ] = remaining
        const text = fileText.join(' ')


        switch(commandText) {
            case "exit":
                conductor.run(new ExitCommand())
                break

            case "create":
                conductor.run(new CreateCommand(fileName, text))
                break
            
            case "history":
                conductor.printHistory()
                break
            
            case "undo":
                conductor.undo()
                break
            
            case "redo":
                conductor.redo()
                break
                
            default:
                console.log(`${commandText} command not found!`)
        }

        rl.prompt()
    })
}

runApplication()

