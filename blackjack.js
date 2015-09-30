//joel is cool


var baseCards = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];
var cardValue = [11,2,3,4,5,6,7,8,9,10,10,10,10];
var baseSuits = ['clubs','spades','hearts','diamonds'];
var deck = [];



var i=0;
while(i<52){
    for(var j = 0; j < baseCards.length; j++) {
        for(var k = 0; k < baseSuits.length; k++){
            deck[i] = [baseCards[j], baseSuits[k], cardValue[j]];
            i++;
        }
    }
}


var shuffle = deck;
var compHand = 0;
var userHand = 0;
var chipStack = 1000;
var bet;
(function rules() {

    alert("Welcome to the blackjack table!\nHere are some of the rules:\n" +
          "You must bet every hand. Minimum bet is 5. Maximum bet is 500.\n" +
          "Dealer stays on any 17. Aces are worth 11. Black Jack pays even money.");
    play();
    
}());

function play() {
    deck = shuffle;
    bet = prompt("You have " + chipStack + ". How much would you like to bet?");
    
    if(chipStack == 0) {
        return alert("You don't have enough money to left to play at this table. Goodbye.");
    }
    
    if(bet < 1 || bet > 500) {
        alert("That is not a permitted bet at this table");
        return play();
    }
    
    if(bet > chipStack) {
        alert("You do not have enough money left for that bet")
        return play();
    }
    else {
        return dealerHand();
    }

}




function dealerHand() {
    //Randomly generates a number 0 - 51 (in this case the length of the array) and         assigns it to num1
    var num1 = Math.floor(Math.random()*deck.length);
    //Assigns the dealer a card corresponding to the index of the deck array
    var firstCard = deck[num1];
    alert("The dealer's first card is: " + firstCard[0] + " of " + firstCard[1]);
    this.cardShowing = firstCard[0] + " of " + firstCard[1];
    //Removes the card from the deck so it cannot be reused
    deck.splice(num1, 1);
    //Randomly generates a number 0 - 51 and assigns it to num1
    var num2 = Math.floor(Math.random()*deck.length);
    //Assigns the dealer a second card corresponding to the index of the deck array
    var secondCard = deck[num2];
    alert("The dealer's second card is hidden");
    this.cardHidden = secondCard[0] + " of " + secondCard[1];
    //Removes the card from the deck so it cannot be reused
    deck.splice(num2, 1);
    console.log(firstCard);
    console.log(secondCard);
    //Sums the value of the dealers cards
    compHand = firstCard[2] + secondCard[2];
    console.log(compHand);
    playerHand();
};



function playerHand() {
    //Randomly generates a number 0 - 51 (in this case the length of the array) and         assigns it to num1
    var num1 = Math.floor(Math.random()*deck.length);
    //Assigns the dealer a card corresponding to the index of the deck array
    var firstCard = deck[num1];
    alert("Your first card is: " + firstCard[0] + " of " + firstCard[1]);
    //Removes the card from the deck so it cannot be reused
    deck.splice(num1, 1);
    //Randomly generates a number 0 - 51 and assigns it to num1
    var num2 = Math.floor(Math.random()*deck.length);
    //Assigns the dealer a second card corresponding to the index of the deck array
    var secondCard = deck[num2];
    alert("Your second card is: " + secondCard[0] + " of " + secondCard[1]);
    //Removes the card from the deck so it cannot be reused
    deck.splice(num2, 1);
    console.log(firstCard);
    console.log(secondCard);
    //Sums the value of the dealers cards
    userHand = firstCard[2] + secondCard[2];
    console.log(userHand);
    if(userHand == 21){
        alert("Black Jack");
        return win();
    }
    playerAction();
};

console.log("There are " + deck.length + " left in the deck");




function playerAction() {
    
    var action = prompt("You have " + userHand + ". Would you like to 'hit', 'stay' or 'double'?\nDealer has a " + cardShowing + " showing");
    if(action == 'stay') {
        alert("You have chosen to stay with " + userHand);
        return showDealerHand();
    }
    if(action == 'hit') {
        return takeCard();
    }
    if(action == 'double') {
        bet *= 2;
        return takeCard(action);
    }
    else {
        alert("That is not an option");
        //recalls playerAction function
        playerAction();
    }
    
};




function takeCard(action) {
    
    var hit = Math.round(Math.random()*deck.length);
    //Assigns the dealer a card corresponding to the index of the deck array
    var hitCard = deck[hit];
    alert("Your hit card is: " + hitCard[0] + " of " + hitCard[1]);
    //Removes the card from the deck so it cannot be reused
    deck.splice(hit, 1);
    userHand += hitCard[2];
    console.log(userHand);
    if(action == 'double') {
         return checkForBust(userHand, "You", action);
    }
    else{
        checkForBust(userHand, "You");
    }
    
}



function dealerRules() {
    
    alert("The dealer has " + compHand)
    if(compHand > 16) {
        alert("The dealer has over 16. Dealer must stay");
        return compareHands();
    }
    else{
        alert("Dealer has less than 17 and must hit");
        return dealerAction();
    }
    
}



function showDealerHand() {

alert("The dealer has a " + cardShowing + " and a " + cardHidden);
return dealerRules();
    
}



function dealerAction() {

    var hit = Math.round(Math.random()*deck.length);
    var hitCard = deck[hit];
    alert("Dealer hit card is: " + hitCard[0] + " of " + hitCard[1]);
    deck.splice(hit, 1);
    compHand += hitCard[2];
    console.log(compHand);
    checkForBust(compHand, "Dealer")

}



function checkForBust(hand, player, action) {
    
    if(hand == 21){
        if(player == "You"){
            alert(player +" have 21");
            return showDealerHand();
        }else{
            alert(player +" has 21");
            return compareHands();
        }
    }
    if(hand > 21) {
        
        alert(player + " have " + hand + ". " + player + " busted!");
        if(player == "You"){
            return lose();
        }else{
            return win();
        }
    }
    else{
        if(player == "You"){
            if(action == 'double'){
                return showDealerHand();
            }
            return playerAction();
        }else{
            return dealerRules();
        }
    }
    
}


function compareHands() {

    alert("You and the dealer both stay. Let's see who won");
    if(compHand == userHand){
        alert("It's a push! You both have " + userHand);
        alert("You have $" + chipStack + " at the table.");
    }else if(userHand > compHand){
        alert("You win! You have " + userHand + ". Dealer has " + compHand);
        win();
    }else{
        alert("You lost... You have " + userHand + ". Dealer has " + compHand);
        lose();
    }
}


function playAgain() {
    
    var again = prompt("Would you like to play again? 'yes' or 'no'");
    if(again == 'yes') {
        return play();
    }
    if(again == 'no') {
        return alert("Ok. Thanks for playing! You left the table with $" + chipStack);
        
    }
    else {
        alert("I don't understand");
        return playAgain();
    }

}


function win() {
    chipStack += Number(bet);
    alert("You won your bet of " + bet + "!\nYou now have $" + chipStack + " at the table.");
    playAgain();
}

function lose() {
    chipStack -= Number(bet);
    alert("You lost your bet of " + bet + ":(\nYou now have $" + chipStack + " at the table.");
    playAgain();
}


