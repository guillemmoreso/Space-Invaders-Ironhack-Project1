"use strict";
class Insecticide {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 80;
    this.height = 180;

    this.sprays = [];
    this.lives = 30;
    this.score = 0;

    this.maxSpeed = 10;
    this.speed = 0;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height
    };
  }

  // INSECTICIDE MOVEMENTS

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  insecticideMovementConditions() {
    this.position.x += this.speed;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
  //Refactor in GAME
  draw(ctx) {
    this.image = new Image();
    this.image.src = "./img/spray.png";
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  attack() {
    this.sprays.push(
      new Spray(this.position.x + this.width / 3, this.position.y, 20, 40)
    );
  }
  // removeLife() {
  //   this.lives--;
  //   document.querySelector(".live-img").remove();
  // }
  updateScore() {
    this.score += 100;
  }
}
