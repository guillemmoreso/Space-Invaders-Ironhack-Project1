"use strict";
class Enemy {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.direction = true;

    this.xVelocidad = 2;
    this.yVelocidad = 2;
    this.image = new Image();
    this.image.src = "./img/enemies.png";
  }

  moveRight() {
    this.x += this.xVelocidad;
  }
  moveLeft() {
    this.x -= this.xVelocidad;
  }
}
