const { createTerminus } = require('@godaddy/terminus')

const onSignal = () => {
    console.log('server is starting cleanup')
    // start cleanup of resource, like databases or file descriptors
}

module.exports = app => 
    createTerminus(app, {
        signal: 'SIGINT',
        onSignal
    })