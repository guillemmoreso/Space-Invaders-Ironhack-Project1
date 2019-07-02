"use strict";
class Bullet {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = { x: 10, y: 10 };
    this.speed = { x: 2, y: 2 };
    this.size = 16;
  }
  draw(ctx) {
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
