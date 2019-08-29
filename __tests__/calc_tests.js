//
// this test suite is for the calculator.js functions.
//
// note that we need to bring calculator.js into this file
// via require() in order to be able to test its functionality.
//
// The describe() sections allow us to group tests together,
// which aid in locating failed tests (especially in suites with 
// dozens or hundreds of tests), and also aid in test result reporting.
//
// you can next describe() sections.
//
// 

const calculator = require('../calculator.js');

describe('calc funcs', () => {
    
    describe('adds', () => {
        
        it('should add 2 numbers', () => {
            expect(calculator.add([2,2])).toBe(4);
        });
        
        it ('it should be reflexive', () => {
            expect(calculator.add([2,0])).toBe(2);
        })
        
        it ('should subtract 2 numbers', () => {
            expect(calculator.subtract(2,2)).toBe(0);
        })
        
        
        it ('should divide 2 numbers', () => {
            expect(calculator.divide(2,2)).toBe(1);
        })
    });

    describe('mults', ()=> {
        it ('should mult 2 numbers', () => {
            expect(calculator.multiply(2,2)).toBe(4);
        })
    })
});

//
// AAA
//
// A = Arrange
// A = Act
// A = Assess
//
