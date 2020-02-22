const { toHttp } = require('iate-components').errors
const { validator } = require('iate-components')

const interactor = require('./interactor')

const translator = {
    saveScore: async (req, res) => {
        try {
            res.json(await interactor.save(req.body))
        } catch (error) {
            // translates application errors to HTTP semantics
            toHttp(error, res)
        }
    },
    get: async (req, res) => {
        try {
            res.json(await interactor.scoreboard())
        } catch (error) {
            // translates application errors to HTTP semantics
            toHttp(error, res)
        }
    }
}

module.exports = translator