"use strict";
class Enemy {
  constructor(x, y, width, height, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    this.direction = true;

    this.xVelocidad = 1;
    this.yVelocidad = 1;
  }
  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
  }

  moveRight() {
    this.x += this.xVelocidad;
  }
  moveLeft() {
    this.x -= this.xVelocidad;
  }

  update() {}
}
