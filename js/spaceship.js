"use strict";
class Spaceship {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 100;
    this.height = 100;
    this.ctx = ctx;

    this.bullets = [];

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

  draw() {
    this.image = new Image();
    this.image.src = "./img/spaceship.png";
    this.ctx.drawImage(
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
      new Bullet(this.position.x + this.width / 2, this.position.y, 4, 20)
    );
  }
}
