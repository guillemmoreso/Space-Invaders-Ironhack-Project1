"use strict";
class Enemy {
  constructor(x, y, size, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;

    //this.bombs = [];

    this.direction = true;

    this.xVelocidad = 2;
    this.yVelocidad = 2;
  }
  draw(ctx) {
    this.image = new Image();
    this.image.src = "./img/enemies.png";
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    // this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  clear(ctx) {
    ctx.clearRect(this.x, this.y, this.size, this.size);
  }

  moveRight() {
    this.x += this.xVelocidad;
  }
  moveLeft() {
    this.x -= this.xVelocidad;
  }

  update() {}
}
