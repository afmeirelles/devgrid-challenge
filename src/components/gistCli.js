const Gists = require('gists')
const dotenv = require('dotenv')
const get = require('lodash/get')

const { parsed } = dotenv.config()

module.exports = new Gists({
    username: get(parsed, 'GIT_USERNAME'),
    password: get(parsed, 'GIT_PASSWORD')
})