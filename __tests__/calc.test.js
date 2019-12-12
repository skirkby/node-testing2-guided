//----------------------------------------------------------------------------//
//
// this test suite is for the calculator.js functions.
//
// note that we need to bring calculator.js into this file via require() in
// order to be able to test its functionality.
//
// The describe() sections allow us to group tests together, which aid in
// locating failed tests (especially in suites with dozens or hundreds of
// tests), and also aid in test result reporting.
//
// you can next describe() sections.
//
//----------------------------------------------------------------------------//
const calculator = require('../calculator.js')

const valA = 2
const valB = 2

describe('addition', () => {
    test('add numbers', () => {
        let expectedResult = 4
        let result = calculator.add(valA, valB)
        expect(result).toBe(expectedResult)
    })

    test('identity', () => {
        expect(calculator.add(2, 0)).toBe(2);
    })

    test('sub num', () => {
        let expected = 0
        let result = calculator.subtract(valA, valB)
        expect(result).toBe(expected)
    })
})

describe('multiply', () => {
    test('mult num', () => {
        let expected = 4
        let result = calculator.multiply(valA, valB)
        expect(result).toBe(expected)
    })
    test('div num', () => {
        let expected = 1
        let result = calculator.divide(valA, valB)
        expect(result).toBe(expected)
    })
})
