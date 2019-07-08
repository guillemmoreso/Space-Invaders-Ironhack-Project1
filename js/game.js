"use strict";
class Game {
  constructor(options) {
    this.gameWidth = options.gameWidth;
    this.gameHeight = options.gameHeight;
    this.enemies = [];
    this.ctx = options.ctx;
    this.gameOver = undefined;
  }

  update() {
    this.spaceship.update();
    if (this.intervalGame !== undefined) {
      window.requestAnimationFrame(this.update.bind(this));
    }
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
    });
  }

  _drawBullet() {
    this.spaceship.bullets.forEach(bullet => {
      bullet.draw();
      bullet.update();
    });
  }

  _createEnemies() {
    for (let i = 0; i < 30; i++) {
      let x = 20 + (i % 8) * 60;
      let y = 20 + (i % 3) * 60;
      this.enemies.push(new Enemy(x, y, 20, 20, this.ctx));
    }
  }

  detectCollision(enemy) {
    let bottomOfBullet = this.y + this.height;
    let topOfBullet = this.y;

    let topOfEnemy = enemy.y;
    let leftSideOfEnemy = enemy.x;
    let rightSideOfEnemy = enemy.x + enemy.width;
    let bottomOfEnemy = enemy.y + enemy.height;

    if (
      bottomOfBullet >= topOfEnemy &&
      topOfBullet <= bottomOfEnemy &&
      this.x >= leftSideOfEnemy &&
      this.x + this.width <= rightSideOfEnemy
    ) {
      return console.log("pam");
    } else {
      return console.log("nada");
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

  pause() {
    if (this.intervalGame) {
      window.cancelAnimationFrame(this.intervalGame);
      this.intervalGame = undefined;
    }
  }

  start() {
    this.spaceship = new Spaceship(this);
    this._createEnemies();
    this._inputHandler();
    this.intervalGame = window.requestAnimationFrame(this.update.bind(this));
  }
}
//Copiar aixo del Snake
// la funcion de abajo sabe cuando tiene que volver a llamar la funcion que se pasa por parametro;
/*if (this.intervalGame !== undefined) {
  window.requestAnimationFrame(this._update.bind(this));
}
  }
pause() {
  if (this.intervalGame) {
    window.cancelAnimationFrame(this.intervalGame);
    this.intervalGame = undefined;
  }
}
start() {
  // bucle infinito que se encarga de pintar el canvas
  this._assignControlsToKeys();
  this._generateFood();
  this.snake.move();
  this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
}
}*/
