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

  const stats = document.getElementById("live-p");

  btnStart.addEventListener("click", startGame);

  function startGame() {
    console.log("hi");
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
    // for (let i = 0; i < 3; i++) {
    //   let img = document.createElement("img");
    //   img.src = "./img/mosquito-enemy.png";
    //   img.width = "30";
    //   img.height = "30";
    //   img.className = "live-img";
    //   stats.appendChild(img);
    // }
    startGame();
  }
};
