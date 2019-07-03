"use strict";
class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    //this.bullet = bullet;
  }
  start() {
    this.spaceship = new Spaceship(this);
    // this.bullet = new Bullet(this);
    this.enemy = new Enemy(this);
    this.inputHandler();
  }
  update(deltaTime) {
    this.spaceship.update(deltaTime);
    //this.bullet.update(deltaTime); //FUNCION IF PARA QUE NO SEA UNDIFINED I QUE EL BULLET DE ADALT SIGUI UN ARRAY
  }
  draw(ctx) {
    this.spaceship.draw(ctx);
    //this.bullet.draw(ctx);
    this.enemy.draw(ctx);
  }
  inputHandler() {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          this.spaceship.moveLeft();
          break;

        case 39:
          this.spaceship.moveRight();
          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (this.spaceship.speed < 0) {
            this.spaceship.stop();
          }
          break;

        case 39:
          if (this.spaceship.speed > 0) {
            this.spaceship.stop();
          }
          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 32:
          this.bullet = this.spaceship.attack();
          break;
      }
    });
  }
}
