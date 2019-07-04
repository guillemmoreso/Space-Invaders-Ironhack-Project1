"use strict";
class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.ctx = ctx;
  }

  start() {
    this.spaceship = new Spaceship(this);
    this.enemy = new Enemy(this);

    this._inputHandler();
  }

  update() {
    this.spaceship.update();
    /*if (this.bullets.length > 0)
      this.bullets.forEach(bullet => {
        bullet.update();
      }); */ //FUNCION IF PARA QUE NO SEA UNDIFINED I QUE EL BULLET DE ADALT SIGUI UN ARRAY
  }

  draw() {
    this.spaceship.draw();
    this.enemy.draw();
    this._drawBullet();
  }

  _drawBullet() {
    this.spaceship.bullets.forEach(bullet => {
      bullet.draw();
      bullet.update();
    });
  }

  _inputHandler() {
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
      if (event.keyCode === 32) {
        console.log("pam");
        this.spaceship.attack();
      }
    });
  }
}
