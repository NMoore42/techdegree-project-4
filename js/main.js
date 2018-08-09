const startMenu = document.createElement('div');
const gameMenu = document.getElementById('board');
const winMenu = document.createElement('div');
const none = 'none';
const block = 'block';
const startMenuButton = document.querySelectorAll('.button')[0];


//Element clusters for start and win screens
const startTxt = `
  <div class="screen screen-start" id="start">
    <header>
      <h1>Tic Tac Toe</h1>
      <a href="#" class="button">Start game</a>
    </header>
  </div>
`;

const winTxt = `
  <div class="screen screen-win" id="finish">
    <header>
      <h1>Tic Tac Toe</h1>
      <p class="message"></p>
      <a href="#" class="button">New game</a>
    </header>
  </div>
`;

//Appends start and win clusters to DOM, displays only start menu on load
window.onload = function () {
  startMenu.innerHTML = startTxt;
  winMenu.innerHTML = winTxt;
  gameMenu.insertAdjacentElement('beforebegin', startMenu);
  gameMenu.insertAdjacentElement('afterend', winMenu);
  screenDisplay(block, none, none);
}

//Callback function for screen display Controls
function screenDisplay(start, game, win) {
  startMenu.style.display = start
  gameMenu.style.display = game;
  winMenu.style.display = win;
}

//When Start game button is pressed, gameMenu screen appears
startMenuButton.addEventListener('click', (e) =>{
  screenDisplay(none, block, none);
});
