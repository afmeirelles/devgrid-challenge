const expect = require('expect.js')
const sinon = require('sinon')
const { NOT_FOUND } = require('iate-components').errors

const fsDB = require('../../components/fsDB')
const adapter = require('../adapter')

describe('the scoreboard adapter', () => {

    let writeFileStub, readFileStub
    const scores = [ 'some', 'scores' ]

    beforeEach(() => {
        writeFileStub = sinon.stub(fsDB, 'writeFile')
        readFileStub = sinon.stub(fsDB, 'readFile')
    })

    afterEach(() => {
        writeFileStub.restore()
        readFileStub.restore()
    })

    describe('when saving to the db', () => {

        it('should send the correct parameters to the fsDB', async () => {
            expect(await adapter.save(scores)).to.be()
            expect(writeFileStub.firstCall.args[1]).to.eql(JSON.stringify(scores, null, 4))
        })

    })

    describe('when reading the db', () => {

        it('should get the data and convert to JSON', async () => {
            readFileStub.resolves(JSON.stringify(scores))
            expect(await adapter.read()).to.eql(scores)
        })

        it('should return an empty array if db is empty', async () => {
            readFileStub.resolves() // explicity resolves undefined
            expect(await adapter.read()).to.eql([])
        })

        it('should throw a NOT_FOUND error if the db could not be found on fs', async () => {
            readFileStub.throws({ code: 'ENOENT' })
            try {
                await adapter.read()
                expect().fail('should have thrown an error')
            } catch (error) {
                expect(error).to.be.a(NOT_FOUND)
            }
        })

        it('should re-throw other exceptions', async () => {
            readFileStub.throws(new Error('this is odd...'))
            try {
                await adapter.read()
                expect().fail('should have thrown an error')
            } catch (error) {
                expect(error).to.be.a(Error)
            }
        })

    })


})