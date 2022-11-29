
let deck;
let hidden;

let dealerResult = 0;
let playerResult = 0;

let dealerAceLogic = 0;
let playerAceLogic = 0;

let hitCard = true;

window.onload = function () {
    buildDeck();
    shuffle(deck);
    startGame();
    document.getElementById("player-sum").innerText = playerResult;
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

   for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement('Img');
        let card = deck.pop();
        cardImg.src = './Images/' + card + '.png';
        playerResult += cardValues(card);
        playerAceLogic += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
   }
   document.getElementById("hit").addEventListener('click', hit);
   document.getElementById("stay").addEventListener('click', stay);
   console.log(playerResult);
}

function hit () {
    if (!hitCard) {
        return;
    }
    let cardImg = document.createElement('Img');
        let card = deck.pop();
        cardImg.src = './Images/' + card + '.png';
        playerResult += cardValues(card);
        playerAceLogic += checkAce(card);
        document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerResult, playerAceLogic) > 21) {
        hitCard = false;

    // document.getElementById("player-sum").innerText = playerResult;
     //console.log(playerResult);
    }
}

function stay () {
    dealerResult = reduceAce(dealerResult, dealerAceLogic);
    playerResult = reduceAce(playerResult, playerAceLogic);

    hitCard = false;
    document.getElementById('hidden').src="./Images/" + hidden + ".png";

    let result = "";
    if (playerResult > 21) {
        result = "You Lose!";
    }
    else if (dealerResult > 21) {
        result = "You Win!";
    }
    else if (playerResult == dealerResult) {
        result = "Draw!";
    }
    else if (playerResult > dealerResult) {
        result = "You Win!";
    }
    else if (playerResult < dealerResult) {
        result = "You Lose!";
    }
    document.getElementById("result").innerText = result;
    document.getElementById("dealer-sum").innerText = dealerResult;
    document.getElementById("player-sum").innerText = playerResult;
    console.log(playerResult);
}

function reduceAce (playerResult, playerAceLogic) {
    while (playerResult > 21 && playerAceLogic) {
        playerAceLogic -= 1;
    }
    return playerResult;
}





// https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript By Walter Guevara
// https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript By Walter Guevara
// https://www.youtube.com/watch?v=bMYCWccL-3U By Kenny Yip Coding
