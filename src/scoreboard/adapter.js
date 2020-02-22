const path = require('path')
const { NOT_FOUND } = require('iate-components').errors
const fsDB = require('../components/fsDB')

const dbPath = path.join(__dirname, '..', 'storage', 'db')

const adapter = {
    // save scores to file. as we're gonna look only for the last
    // test case, previous data will be overwritten
    save: async scores => {
        await fsDB.writeFile(dbPath, JSON.stringify(scores, null, 4))
    },
    read: async () => {
        try {
            const db = await fsDB.readFile(dbPath, { encoding: 'utf8' })
            return JSON.parse(db || '[]')
        } catch (error) {
            // capture file read error, meaning no one has saved scores yet
            if (error.code === 'ENOENT') throw new NOT_FOUND('No scores found')
            // unexpected error, will be returned as a 500 INTERNAL SERVER ERROR
            throw error
        }
    }
}

module.exports = adapter