const expect = require('expect.js')

const entity = require('../entity')

describe('the scoreboard entity', () => {

    describe('when calculating the scoreboard', () => {

        it('should correctly order teams by number of problems solved', () => {
            const input = [
                [ 1, 1, 10, 'C'],
                [ 3, 1, 10, 'C'],
                [ 1, 2, 10, 'C'],
            ]
            const expectedOutput = [
                [ 1, 2, 20 ],
                [ 3, 1, 10 ],
            ]
            expect(entity.calculateScoreboard(input)).to.eql(expectedOutput)
        })

        it('should order by increasing penalty time if teams solved the same amount of problems', () => {
            const input = [
                [ 1, 1, 20, 'C'],
                [ 3, 1, 10, 'C'],
                [ 2, 1, 30, 'C'],
            ]
            const expectedOutput = [
                [ 3, 1, 10 ],
                [ 1, 1, 20 ],
                [ 2, 1, 30 ],
            ]
            expect(entity.calculateScoreboard(input)).to.eql(expectedOutput)
        })

        it('should order by team number if teams are tied in problems solved and penalty time', () => {
            const input = [
                [ 1, 1, 10, 'C'],
                [ 3, 1, 10, 'C'],
                [ 2, 1, 10, 'C'],
            ]
            const expectedOutput = [
                [ 1, 1, 10 ],
                [ 2, 1, 10 ],
                [ 3, 1, 10 ],
            ]
            expect(entity.calculateScoreboard(input)).to.eql(expectedOutput)
        })

        it('should correctly ignore status other than correct and incorrect', () => {
            const input = [
                [ 1, 2, 10, 'I'],
                [ 3, 1, 11, 'C'],
                [ 1, 2, 19, 'R'],
                [ 1, 2, 21, 'C'],
                [ 1, 1, 25, 'C'],
                
            ]
            const expectedOutput = [
                [ 1, 2, 66 ],
                [ 3, 1, 11 ],
            ]
            expect(entity.calculateScoreboard(input)).to.eql(expectedOutput)
        })

        it('should return an empty scoreboard if there are no scores to compute', () => {
            const input = []
            const expectedOutput = []
            expect(entity.calculateScoreboard(input)).to.eql(expectedOutput)
        })


    })


})