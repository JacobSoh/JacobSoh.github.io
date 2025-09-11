'use strict';

const photoPath = '/IS216/assets/week4';
var lockOut = 0;
var totalScore = 0;
const fruits = ['apple', 'banana', 'kiwi', 'orange'];

// Retrieve element of game board;
const gameBoard = document.getElementById('game-board');

// Main Function
function generate_board() {
    //============================================================================
    // Task 1
    // Retrieve the friend name(s) from the 'friends' multi-select dropdown menu
    //============================================================================

    // Array to contain the names of user-selected friend(s)
    // For example, if the user selected 'Darryl' and 'Yin Kit',
    //   this array's value will be:
    //      [ 'darryl', 'yinkit' ]
    //
    // let friends = []; // Initialize to empty


    // YOUR CODE GOES HERE
    const friends = getFriends();

    //============================================================================
    // Task 2
    // Given one or more selected friends and given 4 fruit names,
    //   generate a 'randomized' Array of finalized card names.
    // 
    // Card names are as follows:
    //    apple_brandon.png
    //    banana_brandon.png
    //    kiwi_brandon.png
    //    orange_brandon.png
    //
    // where 'brandon' can be replaced with another friend's name,
    // e.g.
    //    apple_nick.png
    // (and so on)
    //
    // Display all 4 fruit cards of one or more selected friends.
    //
    // NOTE: Each card must be displayed TWO and ONLY TWO times (thus, a 'pair')
    //       (such that the user can attempt to 'match').
    //
    // Check out this utility function (declared at the bottom of this file)
    //   for randomizing the order of Array elements.
    //        shuffleArray()
    //============================================================================

    // YOUR CODE GOES HERE
    const data = [];
    let counter = 0;
    for (let friend of friends) {
        for (let fruit of fruits) {
            data.push(
                genOneCard(friend, fruit, counter),
                genOneCard(friend, fruit, counter)
            );
            counter++;
        };
    };
    shuffleArray(data);

    //============================================================================
    // Task 3
    // Display the cards in <div id='game-board'>
    //
    // For this, we will make use of Template Literal (using backticks).
    //
    // NOTE: The game board will always have 4 columns and N rows, where N denotes
    //       (number of selected friends) x 2.
    //
    //       For example, if I chose 'Brandon', 'Darryl', and 'Nick' (3 friends),
    //         then the newly generated game board will be
    //         6 (rows) by 4 (columns).
    //============================================================================
    const num_cols = fruits.length;
    const num_rows = friends.length * 2;

    console.log('# of columns: ' + num_cols)
    console.log('# of rows: ' + num_rows);


    // YOUR CODE GOES HERE
    // You will need to rewrite the value of this result_str (String).
    // let result_str = `
    //     <div style='color: red'>
    //         <p>This is a sample HTML code that will replace the parent div's innerHTML!</p>
    //         <p>Instead of paragraph texts, you will display cards here.</p>
    //     </div>
    // `;

    // Append the element 
    const tmp = document.createDocumentFragment();
    tmp.append(updateHeader());

    let y = 0;
    for (let x = 0; x < num_rows; x++) {
        // Create new div element of row to append cards
        tmp.append(genCardRow(data.slice(y, y + num_cols)));
        y += num_cols;
    };

    document.getElementById('game-board').replaceChildren(tmp);

    // DO NOT MODIFY THE FOLLOWING
    // Replace the innerHTML of <div id='game-board'>
    //   with a newly prepared HTML string (result_str).
    // document.getElementById('game-board').innerHTML = result_str;
}

function getFriends() {
    const sel = document.getElementById('friends');
    return Array.from(sel?.selectedOptions ?? [], o => o.value);
};

// Function to create h1 or update h1 for total score
function updateHeader() {
    // Create h1 element for formatting
    var header = document.getElementById('tsh');
    if (!header) {
        header = document.createElement('h1');
        header.id = 'tsh';
    };

    header.innerText = 'Total Score: ' + totalScore;
    return header;
};

// Function to create individual cards needed
function genOneCard(friend, fruit, counter) {
    const cardName = `${fruit}_${friend}`;

    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const img1 = new Image();
    const img2 = new Image();

    div1.className = 'column card';
    div1.dataset.testCard = cardName + counter;
    div2.className = 'card-inner';
    div2.dataset.cardName = cardName;

    img1.src = `${photoPath}/hidden.png`;
    img1.alt = `hidden_img_${counter}`;
    img1.className = 'card-front';

    img2.src = `${photoPath}/${cardName}.png`;
    img2.alt = `${cardName}_${counter}`;
    img2.className = 'card-back';

    div2.append(img1, img2);
    div1.append(div2);
    return div1;
};

function genCardRow(data) {
    const div = document.createElement('div');
    div.classList.add('row');
    div.append(...data);
    return div;
};

function listenForCardFlip() {
    gameBoard.addEventListener('click', (e) => {
        if (lockOut >= 2) return;

        const card = e.target.closest('.card-inner');
        if (!card || !gameBoard.contains(card) || card.dataset.cardMatched === "true") return;

        card.classList.add('show');

        const prevCard = document.getElementById('current-toggled');
        if (prevCard === card) return;
        lockOut++;
        if (!prevCard) {card.id = 'current-toggled';return;};
        prevCard.removeAttribute('id');

        const x = card.dataset.cardName;
        const y = prevCard.dataset.cardName;

        if (x === y) {
            totalScore ++;
            [card, prevCard].forEach(e => {
                e.dataset.cardMatched = true;
                setTimeout(() => {
                    e.parentElement?.classList.add('matched');
                },500);
            });
            lockOut = 0; 
            if (totalScore === (getFriends().length * fruits.length)) {
                updateHeader().textContent = "All Matched, Congratulations!";
                return;
            }
            updateHeader();
        } else {
            setTimeout(() => {
                [card, prevCard]. forEach(e => e.classList.remove('show'));
                lockOut = 0;
            }, 2000);
        };
    });
};

(() => {
    listenForCardFlip();
})();

// Utility Function
// DO NOT MODIFY
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}