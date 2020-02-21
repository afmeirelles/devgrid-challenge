const expect = require('expect.js')
const sinon = require('sinon')
const { UNAUTHORIZED } = require('../../components/errors')

const translator = require('../translator')
const interactor = require('../interactor')

const mockResponse = () => {
    const res = {}
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    return res
}

describe('the gists translator', () => {

    describe('when creating a new gist', () => {

        let createStub

        beforeEach(() => {
            createStub = sinon.stub(interactor, 'create')
        })

        afterEach(() => {
            createStub.restore()
        })

        it('should respond an error if something goes wrong in the controller', async () => {
            createStub.throws(new UNAUTHORIZED('Invalid credentials'))
            const res = mockResponse()
            await translator.create({}, res)
            expect(res.status.firstCall.args).to.eql([401])
            expect(res.json.firstCall.args).to.eql([{ message: 'Invalid credentials', info: undefined }])
        })
        
        it('should respond a 200 HTTP status and the contents the interactor returns')

    })

})