window.onload = function() {
  let canvas = document.getElementById("gameScreen");
  let ctx = canvas.getContext("2d");

  let gameVisible = document.getElementById("game");
  let splashVisible = document.getElementById("splash");
  let introSound = document.getElementById("intro-sound");

  let btnStart = document.getElementById("start");
  btnStart.addEventListener("click", startGame);

  // let btnContinue = document.getElementById("btnContinue");
  // btnContinue.addEventListener("click", resumeGame);

  let btnRestart = document.getElementById("btnRestart");
  btnRestart.addEventListener("click", startGame);

  function startGame() {
    gameVisible.style.display = "block";
    splashVisible.style.display = "none";

    introSound.remove();

    const GAME_WIDTH = 1200;
    const GAME_HEIGHT = 600;

    const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT, gameOver);
    game.start();
  }
  function gameOver() {
    gameVisible.style.display = "none";
    splashVisible.style.display = "block";
  }
};
