const btn = document.getElementById("justin-btn");
const result = document.getElementById("result");

// Task 1
// Add an event listner to the button (the user drags his mouse over the button)
btn.addEventListener("mouseover", (e) => {
    e.preventDefault();
    result.innerText = "Welcome to My Heart";
    result.style.backgroundColor = "pink";
    result.style.color = "blue";
});

// Task 2
// Add an event listner to the button (the user drags his mouse out of the button)
btn.addEventListener("mouseout", (e) => {
    e.preventDefault();
    result.innerText = "Don't Leave Me Please";
    result.style.backgroundColor = "black";
    result.style.color = "red";
})