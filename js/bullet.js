"use strict";
class Bullet {
  constructor(x, y, width, height, timelife) {
    this.width = width;
    this.height = height;
    this.x = x - this.width / 2;
    this.y = y;
    this.speed = 5;

    /*this.timelife = timelife;
    this.movementId = setInterval(() => {
      this.y = this.y - 1;
    }, 100);
    this.timeId = setTimeout(() => {
      clearInterval(this.movementId);
      game.bullets.shift();
    }, this.timelife);*/
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  update() {
    this.y = this.y - 1;
    console.log(this.y);
  }
}
