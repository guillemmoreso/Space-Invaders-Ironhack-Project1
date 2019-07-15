"use strict";
class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.enemies = [];
    this.bombs = [];
    this.gameOver = false;
    this.gameWon = false;
    this.counterBombing = 0;
    this.intervalBombing = 30;
    this.gameInterval = undefined;

    this.soundIsMuted = false;

    this.spraySound = new Audio("./src/Aerosol Can 01.wav");
    this.mosquitoAttackSound = new Audio("./src/mosquito-attack.wav");
    this.mosquitoPain = new Audio("./src/mosquitoPain.wav");
    this.gameWinSnores = new Audio("./src/snores.wav");
  }

  start() {
    this.spaceship = new Spaceship(this);
    this._createEnemies();
    this._inputHandler();
    this.gameInterval = window.requestAnimationFrame(this.gameLoop.bind(this));
    this._footerButtonActions();
  }

  update() {
    this._counterBombing();
    this.spaceship.update();
    this._collisionBullets();
    this._collisionBombs();
    this._checkCollisionEnemiesWithBottom();
    this._checkGameStatus();
    this.draw();
    console.log(this.spaceship.lives);
    document.querySelector("#actual-score").innerHTML = this.spaceship.score;
  }
  //Solucionar el tema de la pantalla final
  _checkGameStatus() {
    if (this.gameOver === true) {
      //Repeated Code
      let gameVisible = document.getElementById("game");
      let splashVisible = document.getElementById("splash");
      let gameOverVisible = document.getElementById("game-over");
      gameOverVisible.style.display = "block";
      gameVisible.style.display = "none";
      splashVisible.style.display = "none";

      // this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
      // this.ctx.font = "45px Comic Sans";
      // this.ctx.fillStyle = "white";
      // this.ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
      setTimeout(
        function() {
          this.mosquitoPain.play();
          this.mosquitoPain = undefined;
        }.bind(this),
        2500
      );
      btnStart.addEventListener("click", function() {
        gameVisible.style.display = "block";
        splashVisible.style.display = "none";

        let canvas = document.getElementById("gameScreen");
        let ctx = canvas.getContext("2d");

        const GAME_WIDTH = 800;
        const GAME_HEIGHT = 600;
        const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT); // Starts the new Game instantiating the Game Object

        game.start();
      });
    }
    if (this.enemies.length === 0) {
      this.gameWon = true;
      this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
      this.ctx.font = "45px Comic Sans";
      this.ctx.fillText("Game Won", this.gameWidth / 2, this.gameHeight / 2);
      setTimeout(
        function() {
          this.gameWinSnores.play();
          this.gameWinSnores = undefined;
        }.bind(this),
        2500
      );
    }
  }
  _counterBombing() {
    this.counterBombing++;
    if (this.counterBombing === this.intervalBombing) {
      this._bombing();
      this.counterBombing = 0;
    }
  }
  _pauseGame() {
    window.cancelAnimationFrame(this.gameInterval);
  }

  draw() {
    this.spaceship.draw(this.ctx);
    this._drawEnemies();
    this._drawBullet(this.ctx);
    this._drawEnemiesBombs(this.ctx);
  }

  _checkCollisionEnemiesWithBottom() {
    this.enemies.forEach(enemy => {
      if (enemy.y >= this.gameHeight) {
        this.gameOver = true;
      }
    });
  }

  _drawEnemies() {
    this.enemies.forEach(enemy => {
      if (enemy.direction) {
        enemy.moveRight();
      } else {
        enemy.moveLeft();
      }

      if (enemy.x > this.gameWidth - 30 || enemy.x < 0) {
        this._changeDirection();
      }
      this.ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.size, enemy.size);
    });
  }

  _changeDirection() {
    // this.enemies.forEach(enemy => {
    //   enemy.y += 40;
    //   enemy.direction = !enemy.direction;
    // });
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].y += 40;
      this.enemies[i].direction = !this.enemies[i].direction;
    }
  }

  _drawBullet() {
    this.spaceship.bullets.forEach((bullet, index) => {
      if (bullet.y < 0) {
        this.spaceship.bullets.splice(index, 1);
      } else {
        bullet.update();
        bullet.draw(this.ctx);
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
        bomb.draw(this.ctx);
      }
    });
  }

  _createEnemies() {
    for (let i = 0; i < 30; i++) {
      let x = 20 + (i % 8) * 60;
      let y = 20 + (i % 3) * 60;
      this.enemies.push(new Enemy(x, y, 40));
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
          this.spaceship.updateScore();
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
        this.spaceship.removeLife();
      }
    });
  }

  _bombing() {
    let enemyRandoom = Math.floor(Math.random() * this.enemies.length);
    this.bombs.push(
      new Bomb(
        this.enemies[enemyRandoom].x,
        this.enemies[enemyRandoom].y,
        30,
        30
      )
    );
    if (this.soundIsMuted === false) this.mosquitoAttackSound.play();
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
        this.spraySound.play();
      }
      if (event.keyCode === 80) {
        this._pauseGame();
      }
    });
  }
  _footerButtonActions() {
    let btnPause = document.getElementById("btn-pause");
    let btnMute = document.getElementById("btn-mute");
    let btnReset = document.getElementById("btn-reset");

    btnMute.addEventListener("click", event => {
      if (event) this.soundIsMuted = true;
    });

    // btnReset.addEventListener("click", event => {
    //   if (event) //Mirar com es fa per posar-ho a la pagina inicial
    // });

    btnPause.addEventListener("click", event => {
      if (event) this.soundIsMuted = true;
    });
  }
  gameLoop() {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    if (this.gameOver === false && this.gameWon === false) {
      this.update();
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
