window.onload = function() {
  let canvas = document.getElementById("gameScreen");
  let ctx = canvas.getContext("2d");

  let gameVisible = document.getElementById("game");
  let splashVisible = document.getElementById("splash");
  let introSound = document.getElementById("intro-sound");
  let gameWonVisible = document.getElementById("gameWon");
  let starWarsVisible = document.getElementById("star-wars");
  let gameOverVisible = document.getElementById("gameOver");

  let btnRestart = document.getElementById("restart");
  let btnStart = document.getElementById("start");

  btnStart.addEventListener("click", startGame);

  function startGame() {
    gameVisible.style.display = "block";
    splashVisible.style.display = "none";

    introSound.remove();

    const GAME_WIDTH = 1200;
    const GAME_HEIGHT = 600;

    const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT, gameOver, gameWon);
    game.start();
  }
  //Revisar punt per posar RestartGame
  function gameWon() {
    gameVisible.style.display = "none";
    splashVisible.style.display = "none";
    gameWonVisible.style = "display: block;";
    starWarsVisible.style = "display: block;";
    setTimeout(
      function() {
        gameWonVisible.style = "display: none;";
        starWarsVisible.style = "display: none;";
        gameOver();
      }.bind(this),
      17000
    );
  }

  function gameOver() {
    gameVisible.style.display = "none";
    splashVisible.style.display = "none";
    gameOverVisible.style = "display: block;";

    btnRestart.addEventListener("click", _restartGame);
  }

  function _restartGame() {
    gameOverVisible.style = "display: none;";
    gameWonVisible.style = "display: none;";
    starWarsVisible.style = "display: none;";
    startGame();
  }
};
