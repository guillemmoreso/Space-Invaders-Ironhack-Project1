"use strict";
class Bullet {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x; // - this.width / 2;
    this.y = y;
    this.speed = 20;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y = this.y - 8;
  }
}
