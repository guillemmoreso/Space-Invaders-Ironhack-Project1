"use strict";
class Mosquito {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.direction = true;

    this.xSpeed = 4;
    this.ySpeed = 4;
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
