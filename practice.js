class Service {
    constructor(type) {
        this.type = type
    }

    method() {
        console.log('service is running')
    }
}

class Proxy {
    constructor(service) {
        this.service = service
    }

    method() {
        if (this.service.type === 'remote') {
            console.log('service is running from remote')
        } else {
            this.service.method()
        }
    }
}

function run() {
    const service = new Service('remote')
    const proxy = new Proxy(service)
    proxy.method()
}

run()