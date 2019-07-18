"use strict";
class Insecticide {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 80;
    this.height = 180;

    this.sprays = [];
    this.lives = 3;
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

  attack() {
    this.sprays.push(
      new Spray(this.position.x + this.width / 3, this.position.y, 20, 40)
    );
  }
  removeLife() {
    if (this.lives > 0) {
      this.lives--;
      document.querySelector(".live-img").remove();
      // if (this.lives === 0) {
      //   this.lives = 3;
      // }
    }
  }
  updateScore() {
    this.score += 100;
  }
}
