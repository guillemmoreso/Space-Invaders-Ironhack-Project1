"use strict";
class Bullet {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = {
      x: game.gameWidth / 2,
      y: game.gameHeight
    };
    this.speed = { x: 0, y: -4 };
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
