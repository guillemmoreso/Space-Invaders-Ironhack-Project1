"use strict";
class Spaceship {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 100;
    this.height = 40;

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
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
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
}
