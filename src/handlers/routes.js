const gists = require('../gists/translator')
const scoreboard = require('../scoreboard/translator')

module.exports = app => {
    // checks if API is online
    app.get('/', (req, res) => res.status(200).json({ status: 'ok' }))
    // gists
    app.post('/gists', gists.create)
    app.get('/gists/:id/comments', gists.comments)
    // scoreboard
    app.post('/scores', scoreboard.saveScore)
    app.get('/scoreboard', scoreboard.get)
}