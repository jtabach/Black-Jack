var Suit = {
    
    CLUBS: 'clubs',
    SPADES: 'spades',
    HEARTS: 'hearts',
    DIAMONDS: 'diamonds'
    
};

var deck = [
    { face: 'Ace', value: 11, suit: Suit.CLUBS },
    { face: 'Ace', value: 11, suit: Suit.SPADES },
    { face: 'Ace', value: 11, suit: Suit.HEARTS },
    { face: 'Ace', value: 11, suit: Suit.DIAMONDS },
    { face: '2', value: 2,  suit: Suit.CLUBS },
    { face: '2', value: 2,  suit: Suit.SPADES },
    { face: '2', value: 2,  suit: Suit.HEARTS },
    { face: '2', value: 2,  suit: Suit.DIAMONDS },
    { face: '3', value: 3, suit: Suit.CLUBS },
    { face: '3', value: 3, suit: Suit.SPADES },
    { face: '3', value: 3, suit: Suit.HEARTS },
    { face: '3', value: 3, suit: Suit.DIAMONDS },
    { face: '4', value: 4, suit: Suit.CLUBS },
    { face: '4', value: 4, suit: Suit.SPADES },
    { face: '4', value: 4, suit: Suit.HEARTS },
    { face: '4', value: 4, suit: Suit.DIAMONDS },
    { face: '5', value: 5, suit: Suit.CLUBS },
    { face: '5', value: 5, suit: Suit.SPADES },
    { face: '5', value: 5, suit: Suit.HEARTS },
    { face: '5', value: 5, suit: Suit.DIAMONDS },
    { face: '6', value: 6, suit: Suit.CLUBS },
    { face: '6', value: 6, suit: Suit.SPADES },
    { face: '6', value: 6, suit: Suit.HEARTS },
    { face: '6', value: 6, suit: Suit.DIAMONDS },
    { face: '7', value: 7, suit: Suit.CLUBS },
    { face: '7', value: 7, suit: Suit.SPADES },
    { face: '7', value: 7, suit: Suit.HEARTS },
    { face: '7', value: 7, suit: Suit.DIAMONDS },
    { face: '8', value: 8, suit: Suit.CLUBS },
    { face: '8', value: 8, suit: Suit.SPADES },
    { face: '8', value: 8, suit: Suit.HEARTS },
    { face: '8', value: 8, suit: Suit.DIAMONDS },
    { face: '9', value: 9, suit: Suit.CLUBS },
    { face: '9', value: 9, suit: Suit.SPADES },
    { face: '9', value: 9, suit: Suit.HEARTS },
    { face: '9', value: 9, suit: Suit.DIAMONDS },
    { face: '10', value: 10, suit: Suit.CLUBS },
    { face: '10', value: 10, suit: Suit.SPADES },
    { face: '10', value: 10, suit: Suit.HEARTS },
    { face: '10', value: 10, suit: Suit.DIAMONDS },
    { face: 'Jack', value: 10, suit: Suit.CLUBS },
    { face: 'Jack', value: 10, suit: Suit.SPADES },
    { face: 'Jack', value: 10, suit: Suit.HEARTS },
    { face: 'Jack', value: 10, suit: Suit.DIAMONDS },
    { face: 'Queen', value: 10, suit: Suit.CLUBS },
    { face: 'Queen', value: 10, suit: Suit.SPADES },
    { face: 'Queen', value: 10, suit: Suit.HEARTS },
    { face: 'Queen', value: 10, suit: Suit.DIAMONDS },
    { face: 'King', value: 10, suit: Suit.CLUBS },
    { face: 'King', value: 10, suit: Suit.SPADES },
    { face: 'King', value: 10, suit: Suit.HEARTS },
    { face: 'King', value: 10, suit: Suit.DIAMONDS }
];

var player = {
    hand: [],
    chipstack: 1000,
    bet: 0,
    isdone: false,
    hashit: false,
    hasdoubled: false,
    count: 0,
    bust: false,
    candouble: false
};

var dealer = {
    hand: [],
    count: 0
};

var results = {

    playerWin: function (verdict) {
    
        if (verdict === 'bust') {
        
            alert("Dealer busts. You win!");
            
            
            if (player.hasdoubled === true) {
                
                player.chipstack += player.betDub;
                alert("You doubled on your bet of $" + player.bet + 
                      " and won $ " + player.betDub + "!\n\n" +
                      "You now have $" + player.chipstack + " in chips.");
                
            } else {
            
                player.chipstack += player.bet;
                alert("You won your bet of $" + player.bet + "!\n\n" +
                      "You now have $" + player.chipstack + " in chips.");
                
            }        
        
        }
        if (verdict === 'higherCards') {
        
            alert("You beat the dealer!");
            
            if (player.hasdoubled === true) {
                
                player.chipstack += player.betDub;
                alert("You doubled on your bet of $" + player.bet + 
                      " and won $" + player.betDub + "!\n\n" +
                      "You now have $" + player.chipstack + " in chips.");
                
            } else {
            
                player.chipstack += player.bet;
                alert("You won your bet of $" + player.bet + "!\n\n" +
                  "You now have $" + player.chipstack + " in chips.");
            }
            
        }
        if (verdict === 'blackjack') {
        
            var disphand = "";
            
            for (var i = 0; i < player.hand.length; i++) {
        
                disphand += "\n" + player.hand[i].face + " of " + player.hand[i].suit;
                
            }
            
            alert("You got BlackJack! \n\n" + disphand);
        
            
            player.chipstack += player.betBJ;
            alert("You got black jack on your bet of $" + player.bet + 
                  " and won $" + player.betBJ + "!\n\n" +
                  "You now have $" + player.chipstack + " in chips.");
        
        }
        
        actions.resetDeck();
        checks.playAgain();
    
    },
    
    dealerWin: function (verdict) {
    
        if (verdict === 'bust') {
        
            alert("You bust. You lose.. :(");
            
            player.chipstack -= player.bet;
            alert("You lost your bet of $" + player.bet + "!\n\n" +
                  "You now have $" + player.chipstack + " in chips.");        
        
        }
        if (verdict === 'higherCards') {
        
            alert("You lost to the dealer!");
            
            if (player.hasdoubled === true) {
                
                player.chipstack -= player.betDub;
                alert("You doubled on your bet of $" + player.bet + 
                      " and lost $" + player.betDub + "!\n\n" +
                      "You now have $" + player.chipstack + " in chips.");
                
            } else {
            
                player.chipstack -= player.bet;
                alert("You lost your bet of $" + player.bet + "!\n\n" +
                  "You now have $" + player.chipstack + " in chips.");
            }
            
        }
        
        actions.resetDeck();
        
        checks.playAgain();
    
    },
    
    push: function () { 
    
        alert ("you and the dealer both have " + player.count +
               "\n\nYou still have $" + player.chipstack + ".");
        
        actions.resetDeck();
        checks.playAgain();
    
    }
    
}

var checks = {
    
    forAce: function(opp) {
    
        console.log(opp);
        for(var i = 0; i < opp.hand.length; i++) {
            if(opp.hand[i].value === 11) {
                opp.hand[i].value = 1;
            }
        }
        opp.count = 0;
        for (var i = 0; i < opp.hand.length; i++) {
            opp.count += opp.hand[i].value;
        } 
        
    },
    
    forBust: function (opp) {
    
        if (opp.count > 21) {
        
            if (opp === player) {
                
                checks.forAce(player);
                
            } else {
            
                checks.forAce(dealer);
            
            }
            
        }
        if (opp.count > 21) { 
            console.log(opp);
            if(opp === player) {
            
                return results.dealerWin('bust');
            
            } else { 
            
                return results.playerWin('bust');
            
            }
        
        }
        if (opp.count === 21) {
        
            player.isdone = true;
            
            if (opp === player) { 
                
                alert("You have 21!");
                actions.alertPlayer();
                actions.stay(opp);
                
            } else {
            
                alert("dealer has 21...");
                actions.showHand();
            
            }
            
        
        } else {
        
            if (opp === player) {
            
                return actions.playerMove();
            
            } else {
                
                if (dealer.count <= 16){
            
                    return actions.hit(dealer);
                    
                } else {
                
                    alert("The dealer stays with " + dealer.count);
                    return actions.showHand();
                
                }
            
            }
        
        }
        
    },

    allowedDouble: function () { 
    
        if (player.chipstack >= player.bet * 2) {
        
            player.candouble = true;
        
        }
    
    },
    
    playerBlackJack: function () {
    
        if(player.hand[0].value + player.hand[1].value === 21) {
            
            player.betBJ = player.bet * 1.5;
            return results.playerWin('blackjack');
        
        }
    
    },

    softSeventeen: function () {
    
        if (dealer.hand.length === 2 && dealer.hand[0].value === 11 || dealer.hand[1].value === 11) {
        
            alert("Dealer has soft seventeen and will hit.");
            return actions.hit(dealer);
        
        } else {
        
            return actions.showHand();
        
        }
    
    },
    
    playAgain () {
    
        var again = prompt("Would you like to play again?\n\n'yes' or 'no'").toLowerCase() 
        
        if (again === 'yes') {

            if (player.chipstack < 1) {
            
                alert('You have run out of chips. Here is $1000 more.');
                player.chipstack = 1000;      
            
            }
            return actions.play();

        } 
        if (again === 'no') {
            
            return alert("Okay. Thanks for playing.");
            
        } else {
        
            alert("Didn't catch that.");
            return checks.playAgain();
        
        }

    }

}

var actions = {
    
    play: function () { 
    
        player.bet = Number(prompt("You have $" + player.chipstack + ". Place your bet?"));
        
        if (player.bet > player.chipstack) {
        
            alert("You don't have enough chips for that bet");
            return actions.play();
        
        }

        if (player.bet >= 1 && player.bet <= 500 && typeof player.bet === 'number') {
            
            return actions.deal(dealer, player, actions.playerturn);
            
        } else {
            
            alert("Not an allowed bet here.");
            return actions.play();
            
        }

    
    },
        
    deal: function (opp1, opp2, fn){ 

        var card;
        var i = 0;
        
        while(i < 2) {
        
            card = Math.floor(Math.random()*deck.length);
            opp1.hand[i] = deck[card];
            console.log(card);
            deck.splice(card,1);
            console.log(deck.length);

            card = Math.floor(Math.random()*deck.length);
            opp2.hand[i] = deck[card];
            deck.splice(card,1);
            
            i++;
        }
        
        //Checks if both player cards are aces and, if true, sets the value of one of the aces to 1.
        
        if(opp1.hand[0].value === 11 && opp1.hand[1].value === 11) {
        
            opp1.hand[0].value = 1;
        
        }
        
        if(opp2.hand[0].value === 11 && opp2.hand[1].value === 11) {
        
            opp2.hand[0].value = 1;
        
        }
        
        //Checks if the player was dealt a BlackJack and returns playerBlackJack function.
        
        checks.playerBlackJack();
        
        console.log(opp1.hand);
        console.log(opp2.hand);
        
            return fn()
        
    },
    
    alertPlayer: function () { 
    
        var disphand = "You have: \n";
        player.count = 0;
        dealer.count = 0;
        
        for (var i = 0; i < player.hand.length; i++) {
        
            disphand += "\n" + player.hand[i].face + " of " + player.hand[i].suit;
            player.count += player.hand[i].value;
        
        }
        if (player.count > 21) {
        
            checks.forAce(player);
        
        }
        if (dealer.count > 21) {
        
            checks.forAce(dealer);
        
        }
        
        disphand += "\n\nFor a total of " + player.count;
        disphand += "\n\n\nDealer has: \n";
        
        if (player.isdone === true) {
        
            for (var i = 0; i < dealer.hand.length; i++) {
        
                disphand += "\n" + dealer.hand[i].face + " of " + dealer.hand[i].suit;
                dealer.count += dealer.hand[i].value;
        
            }
            
            disphand += "\n\nFor a total of " + dealer.count;
        
        } else {
        
            disphand += "\n" + dealer.hand[0].face + " of " + dealer.hand[0].suit;
            disphand += "\nDealer's 2nd card is hidden";
            dealer.count = dealer.hand[0].value;
        
        }
        
        alert(disphand);
    
    
    },
    
    hit: function (opp) { 
    
        player.hashit = true;
        card = Math.floor(Math.random()*deck.length);
        opp.hand.push(deck[card]);
        
    
        if(opp === player) {
            deck.splice(card,1);
            return actions.playerturn();
            
        } else {
            
            alert("The dealer's hit card is " + deck[card].face + " of " + deck[card].suit);
            deck.splice(card,1);
            return actions.dealerMove();
        
        }
    },
    
    stay: function (opp) { 
        
        if (opp === player) {
            
            opp.isdone = true;
            alert("You stay with " + opp.count + ".");
            return actions.dealerMove();
            
        } else {
        
            alert("Dealer stays with " + opp.count + ".");
            return actions.showHand();
        
        }
        
    },
    
    double: function () {
    
        checks.allowedDouble();
        
        if (player.candouble === true) {
        
            player.hasdoubled = true;
            player.betDub = player.bet * 2;
            alert("You're bet is now $" + player.betDub + ".");
            card = Math.floor(Math.random()*deck.length);
            player.hand.push(deck[card]);
            deck.splice(card,1);
            return actions.playerturn();
        
        } else {
        
            alert("You don't have enough chips left to double");
            player.hashit = true;
            return actions.playerturn();
        
        }
    
    },
    
    checkforDealerBlackJack: function () { },
    
    showHand: function () {
    
        alert("You and the dealer both stay.\n\n" +
              "You have " + player.count + ".\n\n" +
              "Dealer has " + dealer.count + ".");
    
        if (player.count > dealer.count) {
        
            return results.playerWin('higherCards');
        
        }    
        if (player.count < dealer.count) {
        
            return results.dealerWin('higherCards');
            
        }
            
        if (player.count === dealer.count) {
        
            return results.push();
        
        }   
    
    },
    
    playerturn: function () { 
    
        actions.alertPlayer();
        //check for dealer blackjack
        checks.forBust(player);
    
    },
    
    playerMove: function () { 
        
        if (player.hasdoubled === true) {
        
            return actions.stay(player);
        
        }
        
    
        if (player.hashit === false) {

            var choice = prompt("You have " + player.count + 
                                ".\nDealer has " + dealer.count + 
                                ".\nWould you like to 'hit', 'stay', or 'double'?").toLowerCase();

        } else {

            var choice = prompt("You have " + player.count +
                                ".\nDealer has " + dealer.count +
                                ".\nWould you like to 'hit' or 'stay'?").toLowerCase();
            
        }
    
    
        if (choice === 'hit') {
        
            return actions.hit(player);
            
        }
        if (choice === 'stay') {
        
            return actions.stay(player);
        
        }
        if (choice === 'double' && player.hashit === false) {
        
            return actions.double();
        
        } else {
        
            alert("Not a proper choice.");
            return actions.playerMove();
        
        }
        
        
        
        
    
    },
    
    dealerMove: function () {
    
        actions.alertPlayer();
        
        if (dealer.count === 17) {
            
            checks.softSeventeen();
                
        }
        
        checks.forBust(dealer);
    
    },
    
    resetDeck: function () { 
    
        player.isdone = false;
        player.bet = 0;
        player.hashit = false;
        player.bust = false;
        player.candouble = false;
        player.hasdoubled = false;
        player.count = 0;
        dealer.count = 0;
        
        for (var i = 0; i < player.hand.length; i++) {
        
            deck.push(player.hand[i])
        
        }
        
        for (var i = 0; i < dealer.hand.length; i++) {
        
            deck.push(dealer.hand[i])
        
        }
        
        console.log(deck);
        player.hand = [];
        dealer.hand = [];
    }
    
};

(function rules() {

    alert("Welcome to the Blackjack table. \n\nMinumum bet is 1" + 
         "\n\nMaximum bet is 500.\n\nDealer hits on soft seventeen." +
         "\n\nThere is no splitting.\n\nBlack Jack pays 3/2." +
         "\n\nGood Luck!");
    actions.play();
    
}());





