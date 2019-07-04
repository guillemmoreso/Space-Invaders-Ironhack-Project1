"use strict";
class Enemy {
  constructor(x, y, width, height, ctx) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {}
}
/*class Enemy {
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
}*/
