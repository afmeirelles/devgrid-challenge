const util = require('util')
const fs = require('fs')

module.exports = {
    writeFile: util.promisify(fs.writeFile),
    readFile: util.promisify(fs.readFile)
}