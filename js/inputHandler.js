"use strict";
class InputHandler {
  constructor(spaceship) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          spaceship.moveLeft();
          break;

        case 39:
          spaceship.moveRight();
          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (spaceship.speed < 0) {
            spaceship.stop();
          }
          break;

        case 39:
          if (spaceship.speed > 0) {
            spaceship.stop();
          }
          break;
      }
    });
  }
}
