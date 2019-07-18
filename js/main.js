window.onload = function() {
  let canvas = document.getElementById("gameScreen");
  let ctx = canvas.getContext("2d");

  let gameVisible = document.getElementById("game");
  let splashVisible = document.getElementById("splash");
  let gameWonVisible = document.getElementById("gameWon");
  let starWarsVisible = document.getElementById("star-wars");
  let gameOverVisible = document.getElementById("gameOver");

  let introSound = document.getElementById("intro-sound");
  let starWarsSound = document.getElementById("starWars-sound");

  let btnRestart = document.getElementById("restart");
  let btnStart = document.getElementById("start");

  btnStart.addEventListener("click", startGame);

  function startGame() {
    gameVisible.style.display = "block";
    splashVisible.style.display = "none";
    gameOverVisible.style = "display: none;";

    introSound.remove();

    const GAME_WIDTH = 1200;
    const GAME_HEIGHT = 600;

    const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT, gameOver, gameWon);
    game.start();
  }

  function gameWon() {
    gameVisible.style.display = "none";
    gameWonVisible.style = "display: block;";
    starWarsVisible.style = "display: block;";
    starWarsSound.play();

    setTimeout(
      function() {
        location.reload();
      }.bind(this),
      17000
    );
  }

  function gameOver() {
    gameWonVisible.style = "display: none;";
    starWarsVisible.style = "display: none;";
    gameVisible.style.display = "none";
    splashVisible.style.display = "none";
    gameOverVisible.style = "display: block;";

    btnRestart.addEventListener("click", _restartGameScreen);
  }

  function _restartGameScreen() {
    gameOverVisible.style = "display: none;";
    location.reload();
    startGame();
  }
};
