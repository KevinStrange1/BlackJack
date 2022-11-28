
let deck;
let hidden;

let dealerResult = 0;
let playerResult = 0;

let dealerAceLogic = 0;
let playerAceLogic = 0;

window.onload = function () {
    buildDeck();
    shuffle(deck);
    startGame();
}

function buildDeck() {
    deck = [];
    let suits = ['clubs', 'hearts', 'spades', 'diamonds'];
    let value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < value.length; j++ ) {
            deck.push(value[j] + "-" + suits[i]);
        }
    }
    //console.log(deck);
}

function shuffle(deck) {
    for (let i = 0; i < 500; i++) {
        let j = Math.floor((Math.random() * deck.length));
        let k = Math.floor((Math.random() * deck.length));
        
        let temp = deck[j];
        deck[j] = deck[k];
        deck[k] = temp;
    }
    console.log(deck);
}

function cardValues(card) {
    let cardSplit = card.split('-');
    let value = cardSplit[0];

    if (isNaN(value)) {
        if(value == 'A') {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == 'A') {
        return 1;
    }
    return 0;
}


function startGame() {
    hidden = deck.pop();
    dealerResult += cardValues(hidden);
    dealerAceLogic += checkAce(hidden);
   // console.log(hidden);
   // console.log(dealerResult);
   while (dealerResult < 17) {
       let cardImg = document.createElement('Img');
       let card = deck.pop();
       cardImg.src = './Images/' + card + '.png';
       dealerResult += cardValues(card);
       dealerAceLogic += checkAce(card);
       document.getElementById("dealer-cards").append(cardImg);
   }
   console.log(dealerResult);
}



// https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript By Walter Guevara
// https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript By Walter Guevara
// https://www.youtube.com/watch?v=bMYCWccL-3U By Kenny Yip Coding
