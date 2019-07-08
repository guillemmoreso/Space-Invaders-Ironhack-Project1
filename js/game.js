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
    this._collision();
  }

  update() {
    this.spaceship.update();
  }

  draw() {
    this.spaceship.draw();
    this._drawBullet();
    this._drawEnemies();
  }

  _drawEnemies() {
    this.enemies.forEach(enemy => {
      enemy.clear();
      if (enemy.direction) {
        enemy.moveRight();
      } else {
        enemy.moveLeft();
      }

      if (enemy.x > 750 || enemy.x < 0) {
        this.enemies.forEach(enemyY => {
          enemyY.y += 20;
          enemyY.direction = !enemyY.direction;
        });
      }
      enemy.draw();
      // enemy.bombing();
    });
  }

  _drawBullet() {
    this.spaceship.bullets.forEach(bullet => {
      bullet.draw();
    });
    this.spaceship.bullets.forEach((bullet, index) => {
      if (bullet.y < 0) {
        this.spaceship.bullets.splice(index, 1);
      }
      bullet.update();
    }); //Verificar que funciona correcto al 100%
  }

  _createEnemies() {
    for (let i = 0; i < 30; i++) {
      let x = 20 + (i % 8) * 60;
      let y = 20 + (i % 3) * 60;
      this.enemies.push(new Enemy(x, y, 20, 20, this.ctx));
    }
  }

  // _collision(enemy) {
  //   let bottomOfBullet = this.y + this.height;
  //   let topOfBullet = this.y;

  //   let topOfEnemy = enemy.y;
  //   let leftSideOfEnemy = enemy.x;
  //   let rightSideOfEnemy = enemy.x + enemy.width;
  //   let bottomOfEnemy = enemy.y + enemy.height;

  //   if (
  //     bottomOfBullet >= topOfEnemy &&
  //     topOfBullet <= bottomOfEnemy &&
  //     this.x >= leftSideOfEnemy &&
  //     this.x + this.width <= rightSideOfEnemy
  //   ) {
  //     return console.log("pam");
  //   } else {
  //     return console.log("nada");
  //   }
  // }

  _collision() {
    this.spaceship.bullets.forEach(bullet => {
      this.enemies.forEach(enemy => {
        if (
          bullet.y < enemy.y /*+ enemy.height*/ &&
          bullet.y > enemy.y &&
          bullet.x > enemy.x &&
          bullet.x /*+ bullet.width*/ < enemy.x /*+ enemy.height*/
        ) {
          setTimeout(() => {
            let currentIndex = this.enemies.indexOf(enemy);
            this.enemies.splice(currentIndex, 1);
          }, 50);
          this.spaceship.bullets.splice(indexBullet, 1);
        }
      });
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
        this.spaceship.attack();
      }
    });
  }
}
