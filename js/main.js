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
const endScreenMessage = document.querySelectorAll('#finish p')[0];
const endMenuButton = document.querySelectorAll('.button')[1];



//Returns X or O .svg based on active player
function playerSymbol() {
  if (player1.classList == "players active"){
    return "url('img/o.svg')";
  } else if (player2.classList == "players active"){
    return "url('img/x.svg')";
  }
}

//Displays winning screen based on active player at win
function winningScreen(){
  endScreenMessage.innerHTML = 'Winner';
  if (player1.classList == "players active"){
    winMenu.setAttribute('class', 'screen screen-win screen-win-one' );
  } else if (player2.classList == "players active"){
    winMenu.setAttribute('class', 'screen screen-win screen-win-two' );
  }
}

//Displays tie screen based on active player at win
function tieScreen(){
  endScreenMessage.innerHTML = "It's a Tie!";
  winMenu.setAttribute('class', 'screen screen-win screen-win-tie' );
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

//When New game button is pressed, gameMenu screen appears
endMenuButton.addEventListener('click', (e) =>{
  document.location.reload();
});

//Displays background image upon mouseover depending on turn
boxes.forEach(box => box.addEventListener('mouseover', mouseOver));

//Displays background image upon mouseout depending on turn
boxes.forEach(box => box.addEventListener('mouseout', mouseOut));

//Displays background color upon click depending on turn
//Displays symbol image upon click depending on turn
//Switches players turn, makes box inactive
boxes.forEach(box => box.addEventListener('click', handler));

//Checks for win after each click
//boxes.forEach(box => box.addEventListener('click', checkWinAll));

//Helper function for click event listner
function handler(event) {
  event.target.removeEventListener(event.type, arguments.callee);
  event.target.removeEventListener('mouseout', mouseOut);
  event.target.removeEventListener('mouseover', mouseOver);
  event.target.setAttribute('class', playerChecked());
  event.target.style.backgroundImage = playerSymbol();
  checkWinAll();
  checkTie();
}

function checkWin(box1, box2, box3) {
  if (boxes[box1].classList == playerChecked() &&
  boxes[box2].classList == playerChecked() &&
  boxes[box3].classList == playerChecked()){
    return true;
  }
}

//Checks for win.  If true, delays 5 seconds and calls endGameWin function
function checkWinAll(){
  if (checkWin(0, 1, 2) == true ||
      checkWin(3, 4, 5) == true ||
      checkWin(6, 7, 8) == true ||
      checkWin(0, 3, 6) == true ||
      checkWin(1, 4, 7) == true ||
      checkWin(2, 5, 8) == true ||
      checkWin(0, 4, 8) == true ||
      checkWin(6, 4, 2) == true
    ){
    setTimeout(endGameWin, 500);
  } else {
    if (player1.classList == "players active"){
      activePlayer(notActive, active);
    } else if (player2.classList == "players active"){
      activePlayer(active, notActive);
    }
  }
}

////Checks for win.  If true, delays 5 seconds and calls endGameTie function
function checkTie (){
  let crossSquares = document.querySelectorAll('.box-filled-1');
  if (crossSquares.length == 5 && winMenu.style.display !== 'block'){
    setTimeout(endGameTie, 500);
  }
}

//Displays end screen with winner based on activePlayer
function endGameWin(){
  screenDisplay(none, none, block);
  winningScreen();
}

//Displays end screen with tie
function endGameTie(){
  screenDisplay(none, none, block);
  tieScreen();
}
