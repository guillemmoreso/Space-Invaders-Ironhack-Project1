"use strict";
class Enemy {
  constructor(x, y, size, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;

    //this.bombs = [];

    this.direction = true;

    this.xVelocidad = 1;
    this.yVelocidad = 1;
  }
  draw() {
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, this.size, this.size);
  }

  moveRight() {
    this.x += this.xVelocidad;
  }
  moveLeft() {
    this.x -= this.xVelocidad;
  }

  update() {}
}
