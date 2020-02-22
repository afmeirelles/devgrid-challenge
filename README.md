# DevGrid Challenge

## configs
You can pass your git credentials through env vars:

```GIT_USERNAME={your_username_here} GIT_PASSWORD={your_password_here} npm start```

Or set them directly in the gistCli.js file `(/src/components/gistCli.js)`:

```
    const Gists = require('gists')

    module.exports = new Gists({
        username: process.env.GIT_USERNAME || 'your_username_here',
        password: process.env.GIT_PASSWORD || 'your_password_here'
    })
```

## how to run it

### server
1. Install dependencies: `npm install`
2. Start the server: `npm start`

### tests
1. Make sure depencencies are installed (`npm install`)
2. Run tests: `npm test`

## IATE architecture
If you're interested in find more about the architecture used in this project, [please check out my article about it]: (https://www.linkedin.com/pulse/iate-yet-another-clean-architecture-andré-feijó-meirelles)
