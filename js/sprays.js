"use strict";
class Spray {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 20;
  }

  draw(ctx) {
    this.image = new Image();
    this.image.src = "./img/spray-gas.png";
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  sprayTrajectory() {
    this.y = this.y - 8;
  }
}
