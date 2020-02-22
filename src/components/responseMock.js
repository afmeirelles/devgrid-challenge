const sinon = require('sinon')

module.exports = () => {
    const res = {}
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    return res
}