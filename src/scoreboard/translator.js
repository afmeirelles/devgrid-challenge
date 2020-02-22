const { toHttp } = require('iate-components').errors
const { validator } = require('iate-components')

const interactor = require('./interactor')

const translator = {
    create: async (req, res) => {
        // ajv schema
        const schema = {
            additionalProperties: false,
            type: 'object',
            properties: {
                file_name: { type: 'string' },
                description: { type: 'string' },
                content: { type: 'string' },
                visibility: { enum: [ 'public', 'private' ]},
            },
            required: [ 'file_name', 'description', 'content', 'visibility' ]
        }
        try {
            validator(schema, req.body)
            res.json(await interactor.create(req.body))
        } catch (error) {
            // translates application errors to HTTP semantics
            toHttp(error, res)
        }
    },
    comments: async (req, res) => {
        // ajv schema
        const schema = {
            additionalProperties: false,
            type: 'object',
            properties: {
                id: { type: 'string' },
            },
            required: [ 'id' ]
        }
        try {
            validator(schema, req.params)
            res.json(await interactor.comments(req.params.id))
        } catch (error) {
            // translates application errors to HTTP semantics
            toHttp(error, res)
        }
    }

}

module.exports = translator