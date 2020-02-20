const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// middleware handlers
const routes = require('./src/handlers/routes')
const shutdown = require('./src/handlers/shutdown')

// express server
const app = express()

// middlewares setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// incorporate routes to express server
routes(app)

const port = 5000
const server = http.createServer(app)

// adds shutdown handler
shutdown(server)

// server start
server.listen(port, () => console.log(`Server started on port ${port}`))