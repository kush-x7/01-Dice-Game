'use strict';

let scores, roundScore, activePlayer;



function reset()
{
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// Hidding the Dice
document.querySelector('.dice').style.display = 'none';


document.getElementById('current--0').textContent = '0';
document.getElementById('current--1').textContent = '0';
document.getElementById('score--0').textContent = '0';
document.getElementById('score--1').textContent = '0';

// Adding  background
document.querySelector('.player--' + activePlayer).classList.add('player--active');

// Adding player value
document.querySelector('#name--0').textContent =" Player 1";
document.querySelector('#name--1').textContent =" Player 2";

// unHide buttons
document.querySelector('.btn--roll').style.display ='block';
document.querySelector('.btn--hold').style.display ='block';
}

reset()


function nextPlayer()
{
    // Removing background
    document.querySelector('.player--' + activePlayer).classList.remove('player--active');

    

    //  Making current value 0
    document.getElementById('current--' + activePlayer).textContent = '0';
    roundScore = 0;

   
    // Changing player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Adding  background
    document.querySelector('.player--' + activePlayer).classList.add('player--active');
}


// It will take two argument - first event , second function
// in some cases we don't use () in function because it's a call back function
// A call backfunction is a function that is called by other function and not by the user
document.querySelector('.btn--roll').addEventListener('click', function() {

        // 1 We need a random number after clicking

        //Math.random will give random number between 0 - 1
        //0.455 * 6 = 5..... so we will add 1 to increase
        // Math.floor will give round off
        let dice = (Math.floor(Math.random() * 6) + 1);
        
        // 2 Display the Result
        let diceDom = document.querySelector('.dice');

        // Unhiding the Dice
        diceDom.style.display = 'block';

        // changing png
        diceDom.src = 'dice-' + dice + '.png';
        
       
        
        // 3 Update the round score IF the rolled number was not a 1
        if(dice > 1)
        {
            // Add score
            roundScore += dice
            document.getElementById('current--' + activePlayer).textContent = roundScore;

        }
        else
        {
            nextPlayer();
        }
});

document.querySelector('.btn--hold').addEventListener('click', function() {

        // Add current score to global score
        scores[activePlayer] += roundScore; 
        document.querySelector('#score--'+ activePlayer).textContent = scores[activePlayer];
        

        // check if player won the game
        if (scores[activePlayer] >= 100)
        {
            document.querySelector('#name--'+ activePlayer).textContent =" Winner!";

            // Hide buttons
            document.querySelector('.btn--roll').style.display ='none';
            document.querySelector('.btn--hold').style.display ='none';

            //clearing current value
            document.getElementById('current--' + activePlayer).textContent = '0';

            // Adding winner class
            document.querySelector('#name--'+ activePlayer).classList.add('player--winner');

            // Removing background
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');

            // Hidding the Dice
            document.querySelector('.dice').style.display = 'none';
        }
        else
        {
            nextPlayer()
        }  
});

document.querySelector('.btn--new').addEventListener('click', reset);