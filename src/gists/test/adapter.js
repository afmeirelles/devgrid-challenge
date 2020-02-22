const _ = require('lodash')
const expect = require('expect.js')
const sinon = require('sinon')
const { UNAUTHORIZED } = require('iate-components').errors

const adapter = require('../adapter')
const gistCli = require('../../components/gistCli')

describe('the gists adapter', () => {

    describe('when creating a new gist', () => {

        const payload = {
            file_name: 'thegist.js',
            description: 'my gist',
            content: 'the content',
            visibility: 'public'
        }

        let createStub

        beforeEach(() => {
            createStub = sinon.stub(gistCli, 'create')
        })

        afterEach(() => {
            createStub.restore()
        })

        it('should assemble the payload and return the gist id and url from the response', async () => {
            // stub interactor create function so it throws
            createStub.resolves({
                body: {
                    id: 'the gistid',
                    url: 'the url',
                    some: 'other properties'
                }
            })
            const response = await adapter.create(payload)
            expect(response).to.eql({
                id: 'the gistid',
                url: 'the url',
            })
            expect(createStub.firstCall.args).to.eql([{
                description: 'my gist',
                public: true,
                files: {
                    'thegist.js': {
                        content: 'the content'
                    }
                }
            }])
        })

    })

    describe('when getting comments of a gist', () => {

        let commentsStub

        beforeEach(() => {
            // mock interactor create fn 
            commentsStub = sinon.stub(gistCli, 'listComments')
        })

        afterEach(() => {
            commentsStub.restore()
        })

        it('should pass the id and return some fields from the comments list', async () => {
            // stub interactor create function so it throws
            commentsStub.resolves({
                body: [
                    {
                        url: 'url',
                        id: 'id',
                        body: 'body',
                        created_at: 'created_at',
                        updated_at: 'updated_at',
                        user: {
                            login: 'user login',
                            url: 'user_url'
                        }
                    }
                ]
            })
            const list = await adapter.comments('gistId')
            expect(list).to.eql([
                {
                    url: 'url',
                    id: 'id',
                    body: 'body',
                    created_at: 'created_at',
                    updated_at: 'updated_at',
                    user: 'user login',
                    user_url: 'user_url'
                }
            ])
            expect(commentsStub.firstCall.args).to.eql([ 'gistId' ])
        })

    })

})