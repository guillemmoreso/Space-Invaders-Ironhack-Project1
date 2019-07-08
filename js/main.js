let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT); // Starts the new Game instantiating the Game Object
game.start();

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); //Clear Everytime sth gets updated

  game.update();
  game.draw();

  requestAnimationFrame(gameLoop); //When the next game is ready call this loop again
}

requestAnimationFrame(gameLoop);
