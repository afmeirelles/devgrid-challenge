
module.exports = app => {
    // checks if API is online
    app.get('/', (req, res) => res.status(200).json({ status: 'ok' }))
}