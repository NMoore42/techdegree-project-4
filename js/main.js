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
const header = document.querySelectorAll('header')[0];
const screenVs = document.querySelectorAll('.board2')[0];





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

//Displays tie screen
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
  let nameInput = document.createElement('input');
  nameInput.className = 'button-input';
  nameInput.setAttribute('placeholder', 'Enter initials...');
  nameInput.setAttribute('maxlength', '3');
  header.appendChild(nameInput);
  nameInput.focus();

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
  let nameInput = document.querySelectorAll('.button-input')[0];
  if (nameInput.value == ''){
    nameInput.style.borderColor = 'red';
  } else {
    player1.value = nameInput.value;
    screenVs.innerHTML = nameInput.value + ' vs HAL';
    activePlayer(active, notActive);
    screenDisplay(none, block, none);
  }
});

//When New game button is pressed, gameMenu screen appears and gameplay
endMenuButton.addEventListener('click', (e) =>{
  player1.style.backgroundColor = '';
  player2.style.backgroundColor = '';
  boxes.forEach(box => box.setAttribute('class', 'box'));
  boxes.forEach(box => box.style.backgroundImage = none);
  boxes.forEach(box => box.addEventListener('mouseover', mouseOver));
  boxes.forEach(box => box.addEventListener('mouseout', mouseOut));
  boxes.forEach(box => box.addEventListener('click', handler));
  activePlayer(active, notActive);
  screenDisplay(none, block, none);
});

//Displays background image upon mouseover depending on turn
boxes.forEach(box => box.addEventListener('mouseover', mouseOver));

//Displays background image upon mouseout depending on turn
boxes.forEach(box => box.addEventListener('mouseout', mouseOut));

//Displays background color upon click depending on turn
//Displays symbol image upon click depending on turn
//Switches players turn, makes box inactive
boxes.forEach(box => box.addEventListener('click', handler));

//Helper function for click event listner
function handler(event) {
  event.target.removeEventListener(event.type, arguments.callee);
  event.target.removeEventListener('mouseout', mouseOut);
  event.target.removeEventListener('mouseover', mouseOver);
  event.target.setAttribute('class', playerChecked());
  event.target.style.backgroundImage = playerSymbol();
  if(checkWinAll()){
    checkWinAll();
  } else if (checkTie()){
  checkTie();
} else {
  computerPlay1();
  }
}

//Helper function for checkWinAll
function checkWin(box1, box2, box3) {
  if (boxes[box1].classList == playerChecked() &&
  boxes[box2].classList == playerChecked() &&
  boxes[box3].classList == playerChecked()){
    return true;
  }
}

//Checks for win.  If true, delays 5 seconds and calls endGameWin function
function checkWinAll(){
  let nameInput = document.querySelectorAll('.button-input')[0].value;
  if (checkWin(0, 1, 2) == true ||
      checkWin(3, 4, 5) == true ||
      checkWin(6, 7, 8) == true ||
      checkWin(0, 3, 6) == true ||
      checkWin(1, 4, 7) == true ||
      checkWin(2, 5, 8) == true ||
      checkWin(0, 4, 8) == true ||
      checkWin(6, 4, 2) == true
    ){
    boxes.forEach(box => box.removeEventListener('click', handler));
    boxes.forEach(box => box.removeEventListener('mouseover', mouseOver));
    boxes.forEach(box => box.removeEventListener('mouseout', mouseOut));
    if (player1.classList == "players active"){
      endScreenMessage.setAttribute('data-text', nameInput);
      endScreenMessage.style.fontFamily = "Montserrat";
      player1.style.backgroundColor = '#54D17A';
    } else if (player2.classList == "players active"){
      endScreenMessage.setAttribute('data-text', 'HAL')
      player2.style.backgroundColor = '#54D17A';
      endScreenMessage.style.fontFamily = "Montserrat";
    }
    setTimeout(endGameWin, 1000);
    return true;
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
  if (crossSquares.length == 5 && checkWinAll() !== true){
    setTimeout(endGameTie, 1000);
    return true;
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

function computerPlay1(){
  let i = Math.floor(Math.random() * 9)
  if (boxes[i].classList.value !== 'box box-filled-1' && boxes[i].classList.value !== 'box box-filled-2'){
    boxes[i].removeEventListener('click', handler);
    boxes[i].removeEventListener('mouseout', mouseOut);
    boxes[i].removeEventListener('mouseover', mouseOver);
    boxes[i].setAttribute('class', playerChecked());
    boxes[i].style.backgroundImage = playerSymbol();
    checkWinAll();
    checkTie();
  } else {computerPlay2()}
}

function computerPlay2(){
  let i = Math.floor(Math.random() * 9)
  if (boxes[i].classList.value !== 'box box-filled-1' && boxes[i].classList.value !== 'box box-filled-2'){
    boxes[i].removeEventListener('click', handler);
    boxes[i].removeEventListener('mouseout', mouseOut);
    boxes[i].removeEventListener('mouseover', mouseOver);
    boxes[i].setAttribute('class', playerChecked());
    boxes[i].style.backgroundImage = playerSymbol();
    checkWinAll();
    checkTie();
  } else {computerPlay1()}
}
