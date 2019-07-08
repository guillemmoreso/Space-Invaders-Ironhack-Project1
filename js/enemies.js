"use strict";
class Enemy {
  constructor(x, y, width, height, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    this.direction = true;

    this.xVelocidad = 3;
    this.yVelocidad = 3;
  }
  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
  }
  shiftDown() {
    this.y += this.yVelocidad;
    if (this.y === 500) {
      this.yVelocidad = 0;
      this.moveLeft();
    }
  }
  moveRight() {
    this.x += this.xVelocidad;
    // if (this.x === 500) {
    //   this.xVelocidad = 0;
    //   this.shiftDown();
    // }
  }
  moveLeft() {
    this.x -= this.xVelocidad;
    // if (this.x === 100) {
    //   this.xVelocidad = 0;
    //   //this.shiftDown();
    // }
  }

  update() {}
}
