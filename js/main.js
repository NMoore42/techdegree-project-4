/**********************************************
Tic Tac Toe Game
**********************************************/

const startMenu = document.getElementById('start');
const gameMenu = document.getElementById('board');
const winMenu = document.getElementById('finish');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const none = 'none';
const block = 'block';
const active = 'players active';
const notActive = 'players';
const startMenuButton = document.querySelectorAll('.button')[0];
const boxes = document.querySelectorAll('.boxes')[0];
const mouseOut = function(){
  if (!event.target.classList.contains('box-filled')){
    event.target.style.backgroundImage = 'none';
  }
}




//Appends start and win clusters to DOM, displays only start menu on load
window.onload = function () {
  screenDisplay(block, none, none);
}

//Callback function for screen display Controls
function screenDisplay(start, game, win) {
  startMenu.style.display = start
  gameMenu.style.display = game;
  winMenu.style.display = win;
}

//Callback function for active player selection
function activePlayer(p1Status, p2Status) {
  player1.setAttribute('class', p1Status);
  player2.setAttribute('class', p2Status);
}

//When Start game button is pressed, gameMenu screen appears
startMenuButton.addEventListener('click', (e) =>{
  screenDisplay(none, block, none);
  activePlayer(active, notActive);
});

//Displays background image upon mouseover depending on turn
boxes.addEventListener('mouseover', (event) => {
  event.target.style.backgroundImage = "url('img/o.svg')";
});


//Displays background image upon mouseout depending on turn
boxes.addEventListener('mouseout', mouseOut);

//Displays background image upon mouseout depending on turn
boxes.addEventListener('click', (event) => {
  event.target.setAttribute('class', 'box box-filled-1')
  event.target.style.backgroundImage = "url('img/o.svg')";
});
