const entity = require('./entity')

const interactor = {
    save: entity.save,
    scoreboard: async () => {
        // get last scores
        const scores = await entity.getScores()
        // calculate and return scoreboard
        return entity.calculateScoreboard(scores)
    }

}

module.exports = interactor