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
    this.ydir = 0;
  }
  draw() {}
  shiftDown() {
    console.log("hola");
    //this.xdir *= -1;
    this.y += 1;
  }

  update() {}
}
