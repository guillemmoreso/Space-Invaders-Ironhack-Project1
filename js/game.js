"use strict";
class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.enemies = [];
    this.ctx = ctx;
  }

  start() {
    this.spaceship = new Spaceship(this);
    this._createEnemies();
    this._inputHandler();
  }

  update() {
    this._drawEnemies();
    this.spaceship.update();
  }

  draw() {
    this.spaceship.draw();
    this._drawBullet();
  }

  _drawEnemies() {
    this.enemies.map(enemy => {
      enemy.x++;
      this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
  }

  _drawBullet() {
    this.spaceship.bullets.forEach(bullet => {
      bullet.draw();
      bullet.update();
    });
  }

  _createEnemies() {
    // this.enemies = [];
    console.log(this.enemies);
    for (let i = 0; i < 30; i++) {
      let x = 20 + (i % 8) * 30;
      let y = 20 + (i % 3) * 30;
      this.enemies.push(new Enemy(x, y, 5, 5));
    }
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
        this.spaceship.attack();
      }
    });
  }
}
