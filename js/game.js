"use strict";
class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.enemies = [];
    this.ctx = ctx;
    this.gameOver = false;
    this.gameWon = false;
  }

  start() {
    this.spaceship = new Spaceship(this);
    this._createEnemies();
    this._inputHandler();
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  update() {
    this.spaceship.update();
    this._collision();
    this._drawEnemiesBombs();
    if (this.enemies.length === 0) {
      this.gameWon = true;
    }
  }

  draw() {
    this.spaceship.draw();
    this._drawEnemies();
    this._drawBullet();
    this._drawEnemiesBombs();
  }

  _drawEnemies() {
    this.enemies.forEach(enemy => {
      if (enemy.y >= this.gameHeight) {
        this.gameOver = true;
      }
      enemy.clear();
      if (enemy.direction) {
        enemy.moveRight();
      } else {
        enemy.moveLeft();
      }

      if (enemy.x > this.gameWidth - 30 || enemy.x < 0) {
        this.enemies.forEach(enemyY => {
          enemyY.y += 20;
          enemyY.direction = !enemyY.direction;
        });
      }
      enemy.draw();
    });
  }

  _drawBullet() {
    this.spaceship.bullets.forEach((bullet, index) => {
      if (bullet.y < 0) {
        this.spaceship.bullets.splice(index, 1);
      } else {
        bullet.update();
        bullet.draw();
      }
    });
  }

  _drawEnemiesBombs() {
    this.enemies.forEach(enemy => {
      enemy.bombs.forEach((bomb, index) => {
        if (bomb.y >= this.gameHeight) {
          enemy.bombs.splice(index, 1);
        } else {
          bomb.update();
          bomb.draw();
        }
      });
    });
  }

  _createEnemies() {
    for (let i = 0; i < 30; i++) {
      let x = 20 + (i % 8) * 60;
      let y = 20 + (i % 3) * 60;
      this.enemies.push(new Enemy(x, y, 20, this.ctx));
    }
  }

  _collision() {
    this.spaceship.bullets.forEach((bullet, indexBullet) => {
      this.enemies.forEach(enemy => {
        if (
          bullet.y < enemy.y + enemy.size &&
          bullet.y > enemy.y &&
          bullet.x > enemy.x &&
          bullet.x + bullet.width < enemy.x + enemy.size
        ) {
          setTimeout(() => {
            let currentIndex = this.enemies.indexOf(enemy);
            this.enemies.splice(currentIndex, 1);
          }, 50);
          this.spaceship.bullets.splice(indexBullet, 1);
        }
      });
    });

    this.enemies.forEach(element => {
      if (element.y + element.size / 2 > this.spaceship.y) {
        this.gameOver = true;
      }
    });

    this.enemies.forEach((bomb, index) => {
      if (bomb.y + bomb.height > this.gameHeight) {
        this.enemies.splice(index, 1);
      } else if (bomb.y + bomb.height > this.spaceship.y) {
        if (
          bomb.x > this.spaceship.x &&
          bomb.x + bomb.width < this.spaceship.x + this.spaceship.width
        ) {
          this.enemies.splice(index, 1);
          this.gameOver = true;
        }
      }
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

  gameLoop() {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    if (this.gameOver === false && this.gameWon === false) {
      this.update();
      this.draw();
    }
    if (this.gameOver === true) {
      this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
      this.ctx.font = "45px Comic Sans";
      this.ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameWon === true) {
      this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
      this.ctx.font = "45px Comic Sans";
      this.ctx.fillText("Game Won", this.gameWidth / 2, this.gameHeight / 2);
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
