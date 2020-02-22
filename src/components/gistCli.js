const Gists = require('gists')

module.exports = new Gists({
    username: process.env.GIT_USERNAME || '',
    password: process.env.GIT_PASSWORD || ''
})