const _ = require('lodash')
const adapter = require('./adapter')

const entity = {
    save: adapter.save,
    getScores: adapter.read,
    calculateScoreboard: scores => {
        // order: problems solved desc, penalty time asc, team number asc
        // sum teams' problems solved and penalty times
        const pointsSum = _.reduce(scores,
            (memo, [ team, , penalty, status ]) => {
                // we're only interested in correct and incorrect submissions
                if (_.includes([ 'C', 'I' ], status)) {
                    // if it's the first time we see this team, initialize it
                    if (!memo[team]) {
                        memo[team] = { problemsSolved: 0, totalPenalty: 0, team }
                    }
                    // if the answer is correct, it's another problem solved
                    if (status === 'C') {
                        memo[team].problemsSolved++
                        memo[team].totalPenalty += penalty
                    } else {
                        // incorrect answers incur in a 20min penalty
                        memo[team].totalPenalty += 20
                    }
                }
                return memo
            },
            {}
        )
        return _(pointsSum)
            // order teams in the scoredboard
            .orderBy([ 'problemsSolved', 'totalPenalty', 'team' ], [ 'desc', 'asc', 'asc' ])
            // format output
            .map(({ problemsSolved, totalPenalty, team }) => 
                [ team, problemsSolved, totalPenalty ]
            )
            .value()
    }
}

module.exports = entity