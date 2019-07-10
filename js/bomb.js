"use strict";
class Bomb {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.ctx = ctx;
  }

  draw() {
    ctx.fillStyle = "#1EFF65";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y = this.y + 8;
  }
}
