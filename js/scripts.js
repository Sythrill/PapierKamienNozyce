var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click',newGame);

var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { 
    playerPick('rock')
});
pickPaper.addEventListener('click', function(){
    playerPick('paper')
});
pickScissors.addEventListener('click', function(){
    playerPick('scissors')
});

var gameState = 'notStarted';
var player = {
    name: '',
    score: 0
};
var computer = {
    score: 0
};

var newGameBtn = document.getElementById('js-newGameButton');
var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
        break;
        case 'ended':
            newGameBtn.innerHTML = 'Jeszcze raz';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
};

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerText= player.name;
        setGamePoints();
    }
};

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

function getComputerPick() { 
    var possiblePicks = ['rock', 'paper', 'scissors']; 
    return possiblePicks[Math.floor(Math.random()*3)]; 
};

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none';
        playerResultElem.innerHTML = 'Remis';
        computerResultElem.innerHTML = 'Remis';
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') || 
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')
            ) {
                winnerIs = 'computer';
            }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = 'Wygrana !';
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = 'Wygrana !';
        computer.score++;
    }
};

function playerPick(playerPick) { 
    var computerPick = getComputerPick(); 

    playerPickElem.innerHTML = playerPick; 
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick,computerPick);
    setGamePoints();
    endOfGame();
};

function setGamePoints() { 
    playerPointsElem.innerHTML = player.score; 
    computerPointsElem.innerHTML = computer.score; 
};

function endOfGame() {
    if (player.score == 10) {
         playerPointsElem.innerHTML = player.score; 
        alert('wygrał gracz');
        reset();
    } else if (computer.score == 10) {
        computerPointsElem.innerHTML = computer.score;
        alert('wygrał komputer');
        reset();
    }
    
};

function reset(){
    newGameBtn.innerHTML = 'Jeszcze raz';
    newGameElem.style.display = 'block';
    pickElem.style.display = 'none';
    resultsElem.style.display = 'none';
};
