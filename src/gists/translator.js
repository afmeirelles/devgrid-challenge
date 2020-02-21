const { toHttp } = require('../components/errors')

const interactor = require('./interactor')

const translator = {
    create: async (req, res) => {
        try {
            res.json(await interactor.create(req.body))
        } catch (error) {
            // translates application errors to HTTP semantics
            toHttp(error, res)
        }
    }

}

module.exports = translator