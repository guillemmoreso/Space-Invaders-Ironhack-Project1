"use strict";
class Spaceship {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 80;
    this.height = 180;

    this.bullets = [];
    this.lives = 30;
    this.score = 0;

    this.maxSpeed = 10;
    this.speed = 0;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2, //center Spaceship in the Screen
      y: game.gameHeight - this.height
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

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

    // this.ctx.fillRect(
    // this.position.x, this.position.y, this.width, this.height;
    // );
  }

  update() {
    this.position.x += this.speed;
    if (this.position.x < 0) {
      this.position.x = 0;
    } //Avoid getting out the box on the left side
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    } //Avoid getting out the box on the right side
  }
  attack() {
    this.bullets.push(
      new Bullet(this.position.x + this.width / 3, this.position.y, 20, 40)
    );
  }
  removeLife() {
    this.lives--;
    document.querySelector(".live-img").remove();
  }
  updateScore() {
    this.score += 100;
    console.log(this.score);
  }
}
