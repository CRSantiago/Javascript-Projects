/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

//change content of html element. querySelector selects elements similar to CSS
//setter example
//document.querySelector('#current-' + activePlayer).textContent = dice;

//innerHTML change must be a string
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//getter example
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

/*callback functions can be called from the addEventLister as a parameter after the event parameter, ex. 'click'. anonymous functions are a function without name. They are functions written once inside of a parameter*/
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. random number
    var dice =  Math.floor(Math.random() * 6) + 1;
    
    //2.display results
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    //img tag manipulation
    diceDOM.src = 'dice-' + dice + '.png';
    
    //3. update the round score IF the rolled number was NOT 1
    
    if (dice !== 1) {
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //next player
        nextPlayer();
    }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won game
        if (scores[activePlayer] >= 10){
            //end game
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
        //next player
        nextPlayer();
        }
    }
})

function nextPlayer() {
       //next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
     scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    //css manipulation
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}