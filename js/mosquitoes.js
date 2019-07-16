"use strict";
class Mosquito {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.direction = true;
    this.xSpeed = 2;
    this.ySpeed = 2;

    this.image = new Image();
    this.image.src = "./img/mosquito-enemy.png";
  }

  moveRight() {
    this.x += this.xSpeed;
  }
  moveLeft() {
    this.x -= this.xSpeed;
  }
}
