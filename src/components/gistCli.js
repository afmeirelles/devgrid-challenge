const Gists = require('gists')
const dotenv = require('dotenv')

const { parsed, error } = dotenv.config()

if (error) {
    throw Error('Missing or invalid .env file')
}

module.exports = new Gists({
    username: parsed.GIT_USERNAME || '',
    password: parsed.GIT_PASSWORD || ''
})