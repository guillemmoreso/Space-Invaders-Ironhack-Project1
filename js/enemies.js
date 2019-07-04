"use strict";
class Enemy {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = {
      x: game.gameWidth / 2 - 15,
      y: 150
    };
    this.size = 50;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update() {}
}
