'use strict'

function calculate() {

    // YOUR CODE GOES HERE
    const numberOne = document.getElementById("number1");
    const numberTwo = document.getElementById("number2");

    const valueOne = parseInt(numberOne.value);
    const valueTwo = parseInt(numberTwo.value);

    let total = 0;

    for (let i = Math.min(valueOne, valueTwo); i <= Math.max(valueOne, valueTwo); i++) {
        total += i;
    };

    document.getElementById("result").innerText = `The sum is: ${total}`;

}