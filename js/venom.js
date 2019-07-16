"use strict";
class Venom {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 3;
  }

  draw(ctx) {
    this.image = new Image();
    this.image.src = "./img/mosquito (1).png";
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  venomTrajectory() {
    this.y = this.y + 3;
  }
}
