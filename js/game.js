"use strict";
class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.mosquitoes = [];
    this.greenVenoms = [];

    this.gameInterval = undefined;
    this.status = undefined;

    // this.gameOver = false;
    // this.gameWon = false;

    this.counterVenom = 0;
    this.intervalVenom = 9960;

    this.soundIsMuted = false;
    this.spraySound = new Audio("./src/Aerosol Can 01.wav");
    this.mosquitoAttackSound = new Audio("./src/mosquito-attack.wav");
    this.mosquitoPain = new Audio("./src/mosquitoPain.wav");
    this.gameWinSnores = new Audio("./src/snores.wav");
  }

  // GAME STATUS

  _checkStatus() {
    switch (this.status) {
      case "running":
        this.update();
        break;
      case "paused":
        break;
    }
  }

  _pauseGame() {
    window.cancelAnimationFrame(this.gameInterval);
  }

  // START UPDATE & LOOP

  start() {
    this.insecticide = new Insecticide(this);
    this._createMosquitoes();
    this._inputHandler();
    this._footerButtonActions();

    this.gameInterval = window.requestAnimationFrame(this.gameLoop.bind(this));
  }
  update() {
    this._checkStatus();
    this._clear();
    this.draw();
    this.insecticide.update();

    this._counterVenom();
    this._collisionSprays();
    this._collisionVenom();
    this._checkCollisionMosquitoesWithBottom();
    this._gameScoring();
  }

  gameLoop() {
    this.update();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  // CLEAR & DRAW

  _clear() {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
  }

  draw() {
    this.insecticide.draw(this.ctx);
    // this._drawInsecticide(this.ctx);
    this._drawMosquitoes();
    this._drawSprays(this.ctx);
    this._drawGreenVenoms(this.ctx);
  }

  // _drawInsecticide() {
  //   this.image = new Image();
  //   this.image.src = "./img/spray.png";
  //   this.ctx.drawImage(
  //     this.insecticide.image,
  //     this.insecticide.position.x,
  //     this.insecticide.position.y,
  //     this.insecticide.width,
  //     this.insecticide.height
  //   );
  // }

  _drawMosquitoes() {
    this.mosquitoes.forEach(mosquito => {
      if (mosquito.direction) {
        mosquito.moveRight();
      } else {
        mosquito.moveLeft();
      }

      if (mosquito.x > this.gameWidth - 30 || mosquito.x < 0) {
        this._changeMosquitoesDirection();
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

  _drawSprays() {
    this.insecticide.sprays.forEach((spray, index) => {
      if (spray.y < 0) {
        this.insecticide.sprays.splice(index, 1);
      } else {
        spray.update();
        spray.draw(this.ctx);
      }
    });
  }

  _drawGreenVenoms() {
    this.greenVenoms.forEach((venom, index) => {
      if (venom.y >= this.gameHeight) {
        this.greenVenoms.splice(index, 1);
      } else {
        venom.update();
        venom.draw(this.ctx);
      }
    });
  }

  // MOSQUITOES FEATURES

  _createMosquitoes() {
    for (let i = 0; i < 30; i++) {
      let x = 20 + (i % 8) * 60;
      let y = 20 + (i % 3) * 60;
      this.mosquitoes.push(new Mosquito(x, y, 40));
    }
  }

  _counterVenom() {
    this.counterVenom++;
    if (this.counterVenom === this.intervalVenom) {
      this._venom();
      this.counterVenom = 0;
    }
  }

  _venom() {
    let mosquitoRandoom = Math.floor(Math.random() * this.mosquitoes.length);
    this.greenVenoms.push(
      new Venom(
        this.mosquitoes[mosquitoRandoom].x,
        this.mosquitoes[mosquitoRandoom].y,
        30,
        30
      )
    );
    if (this.soundIsMuted === false) this.mosquitoAttackSound.play();
  }

  _changeMosquitoesDirection() {
    for (let i = 0; i < this.mosquitoes.length; i++) {
      this.mosquitoes[i].y += 40;
      this.mosquitoes[i].direction = !this.mosquitoes[i].direction;
    }
  }

  _mosquitoArmyIsDead() {
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
    console.log("hi");
  }

  // COLLISIONS

  _checkCollisionMosquitoesWithBottom() {
    this.mosquitoes.forEach(mosquito => {
      if (mosquito.y >= this.insecticide.position.y) {
        this.gameOver = true;
      }
    });
  }

  _collisionSprays() {
    this.insecticide.sprays.forEach((spray, indexSpray) => {
      this.mosquitoes.forEach(mosquito => {
        if (
          spray.y < mosquito.y + mosquito.size &&
          spray.y > mosquito.y &&
          spray.x > mosquito.x &&
          spray.x + spray.width < mosquito.x + mosquito.size
        ) {
          //Corregir
          setTimeout(() => {
            let currentIndex = this.mosquitoes.indexOf(mosquito);
            this.mosquitoes.splice(currentIndex, 1);
          }, 0);
          this.insecticide.sprays.splice(indexSpray, 1);
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
  _collisionVenom() {
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

  // KEYBOARD FUNCTIONS

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

  // EXTRA FEATURES

  _gameScoring() {
    document.querySelector("#actual-score").innerHTML = this.insecticide.score;
  }
}
