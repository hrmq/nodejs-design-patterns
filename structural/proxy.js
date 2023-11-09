const path = require('path')

class FS_Proxy {
    constructor(fs_subject) {
        this.fs = fs_subject
    }

    readFile(path, format, callback) {
        if(!path.match(/.md$|.MD$/)) {
            return callback(new Error('Can only read Markdown files.'))
        }

        this.fs.readFile(path, format, (error, data) => {
            if (error) {
                console.error(error)
                return callback(error)
            }

            return callback(null, data)
        })
    }
}

function run() {
    const fs = new FS_Proxy(require('fs'))
    const txtFile = path.join(__dirname, 'stubs', 'Readme.txt')
    const mdFile = path.join(__dirname, 'stubs', 'Readme.md')

    const result = (error, contents) => {
        if (error) {
            console.log('\x07')
            console.error(error)
            process.exit(0)
        }

        console.log('reading file...')
        console.log(contents)
    }

    // fs.readFile(txtFile, 'UTF-8', result)
    fs.readFile(mdFile, 'UTF-8', result)
}

run()