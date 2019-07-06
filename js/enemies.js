"use strict";
class Enemy {
  constructor(x, y, width, height, ctx) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    this.xVelocidad = 3;
    this.yVelocidad = 3;
  }
  draw() {
    // this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
  shiftDown() {
    this.y += this.yVelocidad;
    if (this.y === 500) {
      this.yVelocidad = 0;
      this.moveLeft();
    }
  }
  moveRight() {
    this.x += this.xVelocidad;
    console.log(game.gameWidth);
    // if (this.x === 500) {
    //   this.xVelocidad = 0;
    //   this.shiftDown();
    // }
  }
  moveLeft() {
    this.x -= this.xVelocidad;
    console.log(this.xVelocidad);
    if (this.x === 100) {
      this.xVelocidad = 0;
      this.shiftDown();
    }
  }

  update() {}
}
