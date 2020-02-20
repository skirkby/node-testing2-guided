
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
// you can nest describe() sections.
//
//----------------------------------------------------------------------------//
const calc = require('../calculator.js');

describe('add', () => {
    it("adds two nums", () => {
        expect(calc.add(2, 2)).toBe(4);
        expect(calc.add(3, 1)).toBe(4);
    });

    it("subtracts two nums", () => {
        expect(calc.subtract(2, 2)).toBe(0);
    });
})

describe('multiple', () => {
    it("multiplies two nums", () => {
        expect(calc.multiply(2, 6)).toBe(12);
    });

    it("divides two nums", () => {
        expect(calc.divide(20, 2)).toBe(10);
    });
})
