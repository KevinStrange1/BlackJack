let deck;
let hidden;

let dealerResult = 0;
let playerResult = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

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
    // console.log(deck);
}

function shuffle(deck) {
    for (let i = 0; i < 500; i++) {
        let j = Math.floor((Math.random() * deck.length));
        let k = Math.floor((Math.random() * deck.length));
        
        let temp = deck[j];
        deck[j] = deck[k];
        deck[k] = temp;
    }
    // console.log(deck);
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

function playerAceLogic (playerResult, playerAceCount) {
    while (playerResult > 21 && playerAceCount > 0) {
        playerResult -= 10;
        playerAceCount -= 1;
    }
    document.getElementById("player-sum").innerText = playerResult;
    return playerResult;
}

function dealerAceLogic (dealerResult, dealerAceCount) {
    while (dealerResult > 21 && dealerAceCount > 0) {
        dealerResult -= 10;
        dealerAceCount -= 1;
    }
    return dealerResult;
}

function getDealerCards(numberOfCards) {
    for (let j = 0; j < numberOfCards; j++) {
        let cardImg = document.createElement('Img');
        let card = deck.pop();
        cardImg.src = './Images/' + card + '.png';
        dealerResult += cardValues(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
}

function getPlayerCards(numberOfCards) {
    for (let i = 0; i < numberOfCards; i++) {
        let cardImg = document.createElement('Img');
        let card = deck.pop();
        cardImg.src = './Images/' + card + '.png';
        playerResult += cardValues(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
   }
}

function startGame() {

    hidden = deck.pop();
    dealerResult += cardValues(hidden);
    dealerAceCount += checkAce(hidden);
    
    getDealerCards(1);
    getPlayerCards(2);

   document.getElementById("hit").addEventListener('click', hit);
   document.getElementById("stay").addEventListener('click', stay);

}

function hit () {
    if (!hitCard) {
        return;
    }
    getPlayerCards(1);
    document.getElementById("player-sum").innerText = playerResult;

    if (playerAceLogic(playerResult, playerAceCount) > 21) {
        hitCard = false;
        stay();
        document.getElementById("player-sum").innerText = playerResult;
    }
}

function stay () {
    playerResult = playerAceLogic(playerResult, playerAceCount);   

    hitCard = false;
    document.getElementById('hidden').src="./Images/" + hidden + ".png";

    while (dealerResult < 17) {
        getDealerCards(1);  
        dealerResult = dealerAceLogic(dealerResult, dealerAceCount);     
   }

    let result = "";

    if (playerResult == 21) {
        result = "BlackJack!!";
    }
    else if (playerResult > 21) {
        result = "Bust!! You Lose!";
    }
    else if (dealerResult > 21) {
        result = "Dealer Bust!! You Win!";
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
}

// https://www.youtube.com/watch?v=bMYCWccL-3U By Kenny Yip Coding
