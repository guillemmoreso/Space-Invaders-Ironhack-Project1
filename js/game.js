"use strict";
class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  start() {
    this.spaceship = new Spaceship(this);
    this.bullet = new Bullet(this);
    this.enemy = new Enemies(this);

    new InputHandler(this.spaceship);
  }
  update(deltaTime) {
    this.spaceship.update(deltaTime);
    this.bullet.update(deltaTime);
  }
  draw(ctx) {
    this.spaceship.draw(ctx);
    this.bullet.draw(ctx);
    this.enemy.draw(ctx);
  }
}
