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

    describe('when creating a new gist', () => {

        const payload = {
            file_name: 'thegist.js',
            description: 'my gist',
            content: 'the content',
            visibility: 'public'
        }

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
            // test spy - check if create was called with de expected data
            expect(createStub.firstCall.args).to.eql([ payload ])
            // test spy - default express res returns HTTP 200, so no need to test it here
            expect(res.json.firstCall.args).to.eql([ expectedResponse ])
        })

    })

    describe('when getting comments of a gist', () => {

        const params = { id: 'gistId' }
        
        let commentsStub, res

        beforeEach(() => {
            // mock interactor create fn 
            commentsStub = sinon.stub(interactor, 'comments')
            // mock the response obj
            res = mockResponse()
        })

        afterEach(() => {
            commentsStub.restore()
        })

        it('should respond an error if something goes wrong in the controller', async () => {
            // stub interactor create function so it throws
            commentsStub.throws(new UNAUTHORIZED('Invalid credentials'))
            // call create fn
            await translator.comments({ params }, res)
            // test arguments sent to res.status() - we could test with res.status.calledWith(...)
            // but it just returns a boolean, so it's harder to debug than when we compare the
            // actual arguments to the expected ones
            // expect(res.status.firstCall.args).to.eql([ 401 ])
            expect(res.json.firstCall.args).to.eql([{ message: 'Invalid credentials', info: undefined }])
        })

        it('should respond a 200 HTTP status and the contents the interactor returns', async () => {
            const expectedResponse = [
                {
                    "url": "https://api.github.com/gists/262e8dff65709a70c39b272f4d986fc8/comments/3184873",
                    "id": 3184873,
                    "body": "this is sorta of sparta",
                    "created_at": "2020-02-21T17:34:07Z",
                    "updated_at": "2020-02-21T17:34:07Z",
                    "user": "afmeirelles",
                    "user_url": "https://api.github.com/users/afmeirelles"
                }
            ]
            commentsStub.resolves(expectedResponse)
            // call create fn
            await translator.comments({ params }, res)
            expect(commentsStub.firstCall.args).to.eql([ params.id ])
            expect(res.json.firstCall.args).to.eql([ expectedResponse ])
        })

    })

})