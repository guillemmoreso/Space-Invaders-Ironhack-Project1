"use strict";
class Bullet {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.positionX = x;
    this.positionY = y;
    this.speed = { x: 0, y: -4 };
  }
  draw(ctx) {
    ctx.fillRect(this.width, this.height, this.positionX, this.positionY);
  }
  update() {
    this.positionX += this.speed.x;
    this.positionY += this.speed.y;
  }
}
