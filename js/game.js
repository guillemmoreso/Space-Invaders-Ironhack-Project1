"use strict";
class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.mosquitoes = [];
    this.greenVenoms = [];
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
    this.insecticide = new Insecticide(this);
    this._createEnemies();
    this._inputHandler();
    this.gameInterval = window.requestAnimationFrame(this.gameLoop.bind(this));
    this._footerButtonActions();
  }

  update() {
    this._counterBombing();
    this.insecticide.update();
    this._collisionBullets();
    this._collisionBombs();
    this._checkCollisionEnemiesWithBottom();
    this._checkGameStatus();
    this.draw();
    console.log(this.insecticide.lives);
    document.querySelector("#actual-score").innerHTML = this.insecticide.score;
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
    if (this.mosquitoes.length === 0) {
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
    this.insecticide.draw(this.ctx);
    this._drawEnemies();
    this._drawBullet(this.ctx);
    this._drawEnemiesBombs(this.ctx);
  }

  _checkCollisionEnemiesWithBottom() {
    this.mosquitoes.forEach(mosquito => {
      if (mosquito.y >= this.gameHeight) {
        this.gameOver = true;
      }
    });
  }

  _drawEnemies() {
    this.mosquitoes.forEach(mosquito => {
      if (mosquito.direction) {
        mosquito.moveRight();
      } else {
        mosquito.moveLeft();
      }

      if (mosquito.x > this.gameWidth - 30 || mosquito.x < 0) {
        this._changeDirection();
      }
      this.ctx.drawImage(
        mosquito.image,
        mosquito.x,
        mosquito.y,
        mosquito.size,
        mosquito.size
      );
    });
  }

  _changeDirection() {
    // this.mosquitoes.forEach(mosquito => {
    //   mosquito.y += 40;
    //   mosquito.direction = !mosquito.direction;
    // });
    for (let i = 0; i < this.mosquitoes.length; i++) {
      this.mosquitoes[i].y += 40;
      this.mosquitoes[i].direction = !this.mosquitoes[i].direction;
    }
  }

  _drawBullet() {
    this.insecticide.bullets.forEach((bullet, index) => {
      if (bullet.y < 0) {
        this.insecticide.bullets.splice(index, 1);
      } else {
        bullet.update();
        bullet.draw(this.ctx);
      }
    });
  }

  _drawEnemiesBombs() {
    this.greenVenoms.forEach((venom, index) => {
      if (venom.y >= this.gameHeight) {
        this.greenVenoms.splice(index, 1);
      } else {
        //No estoy pillando las referencias
        venom.update();
        venom.draw(this.ctx);
      }
    });
  }

  _createEnemies() {
    for (let i = 0; i < 30; i++) {
      let x = 20 + (i % 8) * 60;
      let y = 20 + (i % 3) * 60;
      this.mosquitoes.push(new Mosquito(x, y, 40));
    }
  }

  _collisionBullets() {
    this.insecticide.bullets.forEach((bullet, indexBullet) => {
      this.mosquitoes.forEach(mosquito => {
        if (
          bullet.y < mosquito.y + mosquito.size &&
          bullet.y > mosquito.y &&
          bullet.x > mosquito.x &&
          bullet.x + bullet.width < mosquito.x + mosquito.size
        ) {
          //Corregir
          setTimeout(() => {
            let currentIndex = this.mosquitoes.indexOf(mosquito);
            this.mosquitoes.splice(currentIndex, 1);
          }, 0);
          this.insecticide.bullets.splice(indexBullet, 1);
          this.insecticide.updateScore();
        }
      });
    });

    this.mosquitoes.forEach(element => {
      if (element.y + element.size / 2 > this.insecticide.y) {
        this.gameOver = true;
      }
    });
  }
  _collisionBombs() {
    this.greenVenoms.forEach(venom => {
      if (
        venom.y < this.insecticide.position.y + this.insecticide.height &&
        venom.y > this.insecticide.position.y &&
        venom.x > this.insecticide.position.x &&
        venom.x + venom.width <
          this.insecticide.position.x + this.insecticide.width
      ) {
        this.insecticide.removeLife();
      }
    });
  }

  _bombing() {
    let mosquitoRandoom = Math.floor(Math.random() * this.mosquitoes.length);
    this.greenVenoms.push(
      new Bomb(
        this.mosquitoes[mosquitoRandoom].x,
        this.mosquitoes[mosquitoRandoom].y,
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
          this.insecticide.moveLeft();
          break;

        case 39:
          this.insecticide.moveRight();
          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (this.insecticide.speed < 0) {
            this.insecticide.stop();
          }
          break;

        case 39:
          if (this.insecticide.speed > 0) {
            this.insecticide.stop();
          }
          break;
      }
    });

    document.addEventListener("keyup", event => {
      if (event.keyCode === 32) {
        this.insecticide.attack();
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
