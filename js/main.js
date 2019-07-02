let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let lastTime = 0;

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); //Clear Everytime sth gets updated
  spaceship.update();
  spaceship.draw(ctx); // Redraws the spaceship

  bullet.update();
  bullet.draw(ctx);

  requestAnimationFrame(gameLoop); //When the next game is ready call this loop again
}

gameLoop(); //Also we can call it this way: requestAnimationFrame(gameLoop);
