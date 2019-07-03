"use strict";
class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.bullets = [];
  }
  start() {
    this.spaceship = new Spaceship(this);
    this.enemy = new Enemy(this);

    this.inputHandler();
  }
  update() {
    this.spaceship.update();
    /*if (this.bullets.length > 0)
      this.bullets.forEach(bullet => {
        bullet.update();
      }); */ //FUNCION IF PARA QUE NO SEA UNDIFINED I QUE EL BULLET DE ADALT SIGUI UN ARRAY
  }
  draw(ctx) {
    this.spaceship.draw(ctx);
    this.enemy.draw(ctx);
    //console.log(this.bullets);
    this.bullets.forEach(bullet => {
      bullet.draw(ctx);
    });
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
      if (event.keyCode === 32) {
        console.log("pam");
        this.attack();
      }
    });
  }
  attack() {
    this.bullets.push(new Bullet(10, 10, 2, 2, 3));
  }
}
