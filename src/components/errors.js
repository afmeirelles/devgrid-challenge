class ALREADY_CREATED {
    constructor(message, info) {
        this.name = 'ALREADY_CREATED'
        this.message = message || 'Resource already created'
        this.info = info
    }
}

class NOT_FOUND {
    constructor(message, info) {
        this.name = 'NOT_FOUND'
        this.message = message || 'Resource not found'
        this.info = info
    }
}

class UNAUTHORIZED {
    constructor(message, info) {
        this.name = 'UNAUTHORIZED'
        this.message = message || 'Invalid credentials'
        this.info = info
    }
}

class UNCAUGHT_ERROR {
    constructor(message, info) {
        this.name = 'UNCAUGHT_ERROR'
        this.message = message
        this.info = info
    }
}

class VALIDATION_ERROR {
    constructor(message, info) {
        this.name = 'VALIDATION_ERROR'
        this.message = message
        this.info = info
    }
}

const toHttp = (error, res) => {

    let status = 500
    if (error instanceof UNAUTHORIZED) status = 401
    if (error instanceof NOT_FOUND) status = 404
    if (error instanceof ALREADY_CREATED) status = 409
    if (error instanceof VALIDATION_ERROR) status = 422
    
    return res.status(status).json({ message: error.message, info: error.info })
}

module.exports = { 
    ALREADY_CREATED,
    NOT_FOUND,
    UNAUTHORIZED,
    UNCAUGHT_ERROR,
    VALIDATION_ERROR,
    toHttp
}