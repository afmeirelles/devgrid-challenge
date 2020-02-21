const _ = require('lodash')
const expect = require('expect.js')
const sinon = require('sinon')
const { UNAUTHORIZED } = require('iate-components').errors

const translator = require('../translator')
const interactor = require('../interactor')

const mockResponse = () => {
    const res = {}
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    return res
}

describe('the gists translator', () => {

    const payload = {
        file_name: 'thegist.js',
        description: 'my gist',
        content: 'the content',
        visibility: 'public'
    }

    describe('when creating a new gist', () => {

        let createStub, res

        beforeEach(() => {
            // mock interactor create fn 
            createStub = sinon.stub(interactor, 'create')
            // mock the response obj
            res = mockResponse()
        })

        afterEach(() => {
            createStub.restore()
        })

        it('should respond an error if something goes wrong in the controller', async () => {
            // stub interactor create function so it throws
            createStub.throws(new UNAUTHORIZED('Invalid credentials'))
            // call create fn
            await translator.create({ body: payload }, res)
            // test arguments sent to res.status() - we could test with res.status.calledWith(...)
            // but it just returns a boolean, so it's harder to debug than when we compare the
            // actual arguments to the expected ones
            // expect(res.status.firstCall.args).to.eql([ 401 ])
            expect(res.json.firstCall.args).to.eql([{ message: 'Invalid credentials', info: undefined }])
        })

        it('should respond a 200 HTTP status and the contents the interactor returns', async () => {
            const expectedResponse = {
                id: 'new_gist_id',
                url: 'gist_url'
            }
            createStub.resolves(expectedResponse)
            // call create fn
            await translator.create({ body: payload }, res)
            // test spy - default express res returns HTTP 200, so no need to test it here
            expect(res.json.firstCall.args).to.eql([ expectedResponse ])
        })

    })

})