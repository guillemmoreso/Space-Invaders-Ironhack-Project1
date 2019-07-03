"use strict";
class Bullet {
  constructor(x, y, dir, color) {
    this.width = 3;
    this.height = 15;
    this.x = x - this.width / 2;
    this.y = y;
    this.direction = dir;
    this.bulletColor = color;

    this.speed = 5;
  }
  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.bulletColor;
  }
  update() {
    this.y = this.y - this.speed * this.direction;
  }
}
