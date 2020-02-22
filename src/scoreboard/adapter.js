const _ = require('lodash')
const gistClient = require('../components/gistCli')

const adapter = {
    create: async ({ file_name, description, content, visibility }) => {
        const response = await gistClient.create({
            description,
            public: visibility === 'public',
            files: {
                [file_name]: { content }
            }
        })
        return _.pick(response.body, [ 'id', 'url' ])
    },
    comments: async id => {
        const response = await gistClient.listComments(id)
        return _.map(response.body,
            comment => ({
                ..._.pick(comment, [ 'url', 'id', 'body', 'created_at', 'updated_at' ]),
                user: comment.user.login,
                user_url: comment.user.url
            })
        )
    }

}

module.exports = adapter