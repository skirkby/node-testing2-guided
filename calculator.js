
//
// simple calculator functions, used for demonstrating
// the jest test framework.
//

function add(numbers) {
    const sum = (acc, curr) => acc + curr
    return numbers.reduce(sum)
 }

function subtract(a,b) { return a-b;}

function multiply(a,b) { return a*b; }

function divide(a,b) { return a/b; }

module.exports = {
    add,
    subtract,
    multiply,
    divide
}