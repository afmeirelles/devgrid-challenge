const adapter = require('./adapter')

const entity = {
    create: adapter.create,
    comments: adapter.comments,
}

module.exports = entity