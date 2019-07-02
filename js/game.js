class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    let spaceship = new Spaceship(GAME_WIDTH, GAME_HEIGHT);
    let bullet = new Bullet();
    //spaceship.draw(ctx);

    new InputHandler(spaceship);
  }
}
