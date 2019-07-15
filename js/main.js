window.onload = function() {
  let gameVisible = document.getElementById("game");
  let splashVisible = document.getElementById("splash");
  let gameOverVisible = document.getElementById("game-over");
  let btnStart = document.getElementById("start");
  let introSound = document.getElementById("intro-sound");
  gameOverVisible.style.display = "none";

  btnStart.addEventListener("click", function() {
    gameVisible.style.display = "block";
    splashVisible.style.display = "none";
    introSound.remove();

    let canvas = document.getElementById("gameScreen");
    let ctx = canvas.getContext("2d");

    const GAME_WIDTH = 800;
    const GAME_HEIGHT = 600;
    const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT); // Starts the new Game instantiating the Game Object

    game.start();
  });
};
