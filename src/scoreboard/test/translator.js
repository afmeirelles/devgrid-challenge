const _ = require('lodash')
const expect = require('expect.js')
const sinon = require('sinon')
const { UNAUTHORIZED } = require('iate-components').errors

const responseMock = require('../../components/responseMock')
const translator = require('../translator')
const interactor = require('../interactor')

describe('the scoreboard translator', () => {

    describe('when saving a queue snapshot', () => {

        let saveScoreStub, res
        const payload = [
            [ 1, 1, 10, 'C'],
            [ 2, 1, 15, 'I'],
        ]

        beforeEach(() => {
            // mock interactor create fn 
            saveScoreStub = sinon.stub(interactor, 'save')
            // mock the response obj
            res = responseMock()
        })

        afterEach(() => {
            saveScoreStub.restore()
        })

        it('should respond an error if something goes wrong in the interactor', async () => {
            saveScoreStub.throws(new UNAUTHORIZED('Invalid credentials'))
            await translator.saveScore({ body: payload }, res)
            expect(saveScoreStub.firstCall.args).to.eql([ payload ])
            expect(res.json.firstCall.args).to.eql([{ message: 'Invalid credentials', info: undefined }])
        })

        it('should respond a 200 HTTP status if saved correctly', async () => {
            saveScoreStub.resolves()
            await translator.saveScore({ body: payload }, res)
            expect(saveScoreStub.firstCall.args).to.eql([ payload ])
        })

    })

    describe('when getting the scoreboard', () => {

        let scoreboardStub, res

        beforeEach(() => {
            // mock interactor create fn 
            scoreboardStub = sinon.stub(interactor, 'scoreboard')
            // mock the response obj
            res = responseMock()
        })

        afterEach(() => {
            scoreboardStub.restore()
        })

        it('should respond an error if something goes wrong in the interactor', async () => {
            scoreboardStub.throws(new UNAUTHORIZED('Invalid credentials'))
            await translator.get({}, res)
            expect(scoreboardStub.firstCall.args).to.eql([ ])
            expect(res.json.firstCall.args).to.eql([{ message: 'Invalid credentials', info: undefined }])
        })

        it('should respond a 200 HTTP status if saved correctly', async () => {
            scoreboardStub.resolves()
            await translator.get({}, res)
            expect(scoreboardStub.firstCall.args).to.eql([ ])
        })

    })

})