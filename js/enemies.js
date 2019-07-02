"use strict";
class Enemies {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = { x: 50, y: 50 };
    this.size = 50;
  }
  draw(ctx) {
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
  update() {}
}
