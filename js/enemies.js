"use strict";
class Enemy {
  constructor(x, y, width, height, ctx) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    this.xdir = 1;
  }
  draw() {}
  shiftDown() {
    this.y += 1;
    if (this.y === this.y) {
      this.x = 30;
      this.y = 30;
    }
  }
  move() {
    console.log(this.x);
    if (this.x > 500) {
      this.shiftDown();
    } else {
      this.x = this.x + this.xdir;
    }
  }

  update() {}
}
