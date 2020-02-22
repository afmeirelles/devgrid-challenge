const _ = require('lodash')
const expect = require('expect.js')
const sinon = require('sinon')

const interactor = require('../interactor')
const entity = require('../entity')

describe('the scoreboard interactor', () => {

    describe('when getting the scoreboard', () => {

        let getScoresStub, calculateScoreboardStub

        beforeEach(() => {
            getScoresStub = sinon.stub(entity, 'getScores')
            calculateScoreboardStub = sinon.stub(entity, 'calculateScoreboard')
        })

        afterEach(() => {
            getScoresStub.restore()
            calculateScoreboardStub.restore()
        })

        it('should call entity calculation with the scores', async () => {
            const scores = [
                [ 1, 1, 10, 'C'],
                [ 2, 1, 15, 'I'],
            ]
            const scoreboard = [
                [ 1, 1, 10],
                [ 2, 1, 20],
            ]
            getScoresStub.resolves(scores)
            calculateScoreboardStub.resolves(scoreboard)
            const result = await interactor.scoreboard()
            expect(result).to.eql(scoreboard)
            expect(calculateScoreboardStub.firstCall.args).to.eql([ scores ])
        })

    })

})