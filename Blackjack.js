// https://www.youtube.com/watch?v=bMYCWccL-3U By Kenny Yip Coding - watch as a tutorial.

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
    playAudio();
    document.getElementById("player-sum").innerText = playerResult;
}
function playAudio() { //plays a shuffling sound at start of game. Does not work unless you enable autoplay in browser.
    const shuffling = document.getElementById("shuffling");
    shuffling.play();
    } 

function buildDeck() { //builds deck of cards
    deck = [];
    let suits = ['clubs', 'hearts', 'spades', 'diamonds'];
    let value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < value.length; j++ ) {
            deck.push(value[j] + "-" + suits[i]);
        }
    }
}

function shuffle(deck) { //shuffles cards.
    for (let i = 0; i < 500; i++) {
        let j = Math.floor((Math.random() * deck.length));
        let k = Math.floor((Math.random() * deck.length));
        
        let temp = deck[j];
        deck[j] = deck[k];
        deck[k] = temp;
    }
}

function cardValues(card) { //gets value of cards.
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

function checkAce(card) { //checks if card is an ace. 
    if (card[0] == 'A') {
        return 1;
    }
    return 0;
}

function playerAceLogic (playerResult, playerAceCount) { //player ace logic.
    while (playerResult > 21 && playerAceCount > 0) {
        playerResult -= 10;
        playerAceCount -= 1;
    }
    document.getElementById("player-sum").innerText = playerResult;
    return playerResult;
}

function dealerAceLogic (dealerResult, dealerAceCount) { //dealer ace logic.
    while (dealerResult > 21 && dealerAceCount > 0) {
        dealerResult -= 10;
        dealerAceCount -= 1;
    }
    document.getElementById("dealer-sum").innerText = dealerResult;
    return dealerResult;
}

function getDealerCards(numberOfCards) { //deals dealers cards.
    for (let j = 0; j < numberOfCards; j++) {
        let cardImg = document.createElement('Img');
        let card = deck.pop();
        cardImg.src = './Images/' + card + '.png';
        dealerResult += cardValues(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
}

function getPlayerCards(numberOfCards) { //deals players cards.
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

    hidden = deck.pop();                //hides one dealer card.
    dealerResult += cardValues(hidden);
    dealerAceCount += checkAce(hidden); 
    
    getDealerCards(1);
    getPlayerCards(2);

    document.getElementById("hit").addEventListener('click', hit);
    document.getElementById("stay").addEventListener('click', stay);

    const $click = new Audio("Audio/click.wav"); //adds button click sound.
    $("#hit").click(e => $click.play());
    $("#stay").click(e => $click.play());
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

    while (dealerResult < 17) {     //unhide dealer card and add dealer rules.
        getDealerCards(1);  
        dealerResult = dealerAceLogic(dealerResult, dealerAceCount);     
   }

    let result = ""; //adds result text.

    if (playerResult == dealerResult) {
        result = "Draw!";
    }
    else if (playerResult == 21) {
        result = "BlackJack!!";
    }
    else if (playerResult > 21) {
        result = "You Lose!";
    }
    else if (dealerResult > 21) {
        result = "You Win!";
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

$(document).ready(function(){                   // add results and sounds with jquery.
    const $win = new Audio("Audio/cheer.wav");
    const $lose = new Audio("Audio/boo.wav");
    const $blackjack = new Audio("Audio/blackjack.wav"); 

    switch (result) {
        case "You Win!":
            $("#result").css("color", "#f3f656");
            $win.play();
            break;
        case "You Lose!":
            $("#result").css("color", "#ff000e");
            $lose.play();
            break;
        case "BlackJack!!":
            $("#result").css("color", "#56f65f");
            $blackjack.play();
            break;
        case "Draw!":
            $("#result").css("color", "#33e2eb")
            break;
    }
});


// all code below this line was not created by me, added to make better UX.

//text animation thanks to Van Huynh, from website https://freefrontend.com/jquery-text-animations-effects/

(function( $ ){
  
    $.fn.textAnimation = function( animation_speed, text_speed, animation ){
      var text, i = 0;
      var $this = $(this);
      
      // store text and clear
      text = $this.text();
      $this.css('white-space', 'pre');
      $this.html('');
      
      var addLetter = setInterval(function(){
        $this.append('<div class="text_animation" style="display: inline-block; animation: ' + animation + ' ' + animation_speed + 'ms forwards">' + text[i] + '</div>');
        i++;
        if (i == text.length) clearInterval(addLetter);
      }, text_speed);
    }
  })( jQuery )
  
  var temp = $('.bounce_in_animation').text();
  var i = 1;
  
  $('.bounce_in_animation').textAnimation(500, 100, 'bounceIn');
  
  setInterval(function(){
    i %= 4;
    $('.bounce_in_animation').html(temp);
    switch(i) {
      case 0:
        $('.bounce_in_animation').textAnimation(500, 100, 'bounceIn');
        break;
      case 1:
        $('.bounce_in_animation').textAnimation(500, 100, 'slideDown');
        break;
      case 2:
        $('.bounce_in_animation').textAnimation(500, 100, 'slideUp');
        break;
      default:
        $('.bounce_in_animation').textAnimation(500, 100, 'spinIn');
            }
    i++;
  }, 1000 + 50 * temp.length + 250);
}
