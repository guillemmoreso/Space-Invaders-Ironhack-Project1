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
    this.spaceship.update();
  }

  draw() {
    this.spaceship.draw();
    this._drawBullet();
    this._drawEnemies();
  }

  _drawEnemies() {
    this.enemies.forEach(enemy => {
      this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      if (enemy.direction) {
        enemy.moveRight();
      } else {
        enemy.moveLeft();
      }

      if (enemy.x > 790 || enemy.x < 0) {
        this.enemies.forEach(enemyY => {
          enemyY.y += 10;
          enemyY.direction = !enemyY.direction;
        });
      }
    });
  }

  // _drawEnemies() {
  //   var edge = false;
  //   for (var i = 0; i < this.enemies.length; i++) {
  //     this.enemies[i].enemy.move();
  //     console.log(this.enemies[i].enemy.move());
  //     if (this.enemies[i].x > this.gameWidth || this.enemies[i].x < 0) {
  //       edge = true;
  //     }
  //   }

  //   if (edge) {
  //     for (var i = 0; i < this.enemies.length; i++) {
  //       this.enemies[i].shiftDown();
  //     }
  //   }
  // }

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
      this.enemies.push(new Enemy(x, y, 20, 20));
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
