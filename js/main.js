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
const boxes = document.querySelectorAll('.box');

//Returns X or O .svg based on active player
function playerSymbol() {
  if (player1.classList == "players active"){
    return "url('img/o.svg')";
  } else if (player2.classList == "players active"){
    return "url('img/x.svg')";
  }
}

//Returns blue or orange color based on active player
function playerChecked(){
  if (player1.classList == "players active"){
    return 'box box-filled-1';
  } else if (player2.classList == "players active"){
    return 'box box-filled-2';
  }
}

//Helper function for mouseout event listener
function mouseOut(event) {
  event.target.style.backgroundImage = none;
}

//Helper function for mouseover event listener
function mouseOver(event){
  event.target.style.backgroundImage = playerSymbol();
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
boxes.forEach(box => box.addEventListener('mouseover', mouseOver));

//Displays background image upon mouseout depending on turn
boxes.forEach(box => box.addEventListener('mouseout', mouseOut));

//Displays background image upon mouseout depending on turn
//Switches players turn
boxes.forEach(box => box.addEventListener('click', handler));

//Helper function for click event listner
function handler(event) {
  event.target.removeEventListener(event.type, arguments.callee);
  event.target.removeEventListener('mouseout', mouseOut);
  event.target.removeEventListener('mouseover', mouseOver);
  event.target.setAttribute('class', playerChecked());
  event.target.style.backgroundImage = playerSymbol();
  if (player1.classList == "players active"){
    activePlayer(notActive, active);
  } else if (player2.classList == "players active"){
    activePlayer(active, notActive);
  }
}
