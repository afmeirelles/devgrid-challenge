const gists = require('../gists/translator')

module.exports = app => {
    // checks if API is online
    app.get('/', (req, res) => res.status(200).json({ status: 'ok' }))
    // gists
    app.post('/gists', gists.create)
    app.get('/gists/:id/comments', gists.comments)
}