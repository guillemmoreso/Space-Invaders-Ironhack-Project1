"use strict";
class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.enemies = [];
    this.bombs = [];
    this.ctx = ctx;
    this.gameOver = false;
    this.gameWon = false;
    this.counterBombing = 0;
    this.intervalBombing = 30;
    this.gameInterval = undefined;
  }

  start() {
    this.spaceship = new Spaceship(this);
    this._createEnemies();
    this._inputHandler();
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  update() {
    this.counterBombing++;
    this.spaceship.update();
    if (this.counterBombing === this.intervalBombing) {
      this._bombing();
      this.counterBombing = 0;
    }
    this._collisionBullets();
    this._collisionBombs();

    if (this.enemies.length === 0) {
      this.gameWon = true;
    }
  }

  _pauseGame() {
    window.cancelAnimationFrame(this.gameInterval);
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
    this.bombs.forEach((bomb, index) => {
      if (bomb.y >= this.gameHeight) {
        this.bombs.splice(index, 1);
      } else {
        //No estoy pillando las referencias
        bomb.update();
        bomb.draw();
      }
    });
  }

  _createEnemies() {
    for (let i = 0; i < 30; i++) {
      let x = 20 + (i % 8) * 60;
      let y = 20 + (i % 3) * 60;
      this.enemies.push(new Enemy(x, y, 20, this.ctx));
    }
  }

  _collisionBullets() {
    this.spaceship.bullets.forEach((bullet, indexBullet) => {
      this.enemies.forEach(enemy => {
        if (
          bullet.y < enemy.y + enemy.size &&
          bullet.y > enemy.y &&
          bullet.x > enemy.x &&
          bullet.x + bullet.width < enemy.x + enemy.size
        ) {
          //Corregir
          setTimeout(() => {
            let currentIndex = this.enemies.indexOf(enemy);
            this.enemies.splice(currentIndex, 1);
          }, 0);
          this.spaceship.bullets.splice(indexBullet, 1);
        }
      });
    });

    this.enemies.forEach(element => {
      if (element.y + element.size / 2 > this.spaceship.y) {
        this.gameOver = true;
      }
    });
  }
  _collisionBombs() {
    this.bombs.forEach(bomb => {
      if (
        bomb.y < this.spaceship.position.y + this.spaceship.height &&
        bomb.y > this.spaceship.position.y &&
        bomb.x > this.spaceship.position.x &&
        bomb.x + bomb.width < this.spaceship.position.x + this.spaceship.width
      ) {
        this.gameOver = true;
      }
    });
  }

  _bombing() {
    if (Math.random() > 0.1) {
      let enemyRandoom = Math.floor(Math.random() * this.enemies.length);
      this.bombs.push(
        new Bomb(
          this.enemies[enemyRandoom].x,
          this.enemies[enemyRandoom].y,
          2,
          20
        )
      );
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
      if (event.keyCode === 80) {
        this._pauseGame();
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
