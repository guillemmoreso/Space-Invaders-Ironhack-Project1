let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT); // Starts the new Game instantiating the Game Object
game.start();

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); //Clear Everytime sth gets updated

  game.update(deltaTime);
  game.draw(ctx);

  /*spaceship.update(deltaTime);
  spaceship.draw(ctx); // Redraws the spaceship

  bullet.update(deltaTime);
  bullet.draw(ctx);*/

  requestAnimationFrame(gameLoop); //When the next game is ready call this loop again
}

requestAnimationFrame(gameLoop);
