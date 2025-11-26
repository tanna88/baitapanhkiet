class Helicopter {
  constructor(image, x, y, width, height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.targetY = y;
    this.speed = 10;
  }

  update(day, canvasHeight) {
    if (day == 7 && this.y != this.targetY) {
      this.y += this.speed;
      if (this.y > this.targetY) {
        this.y = this.targetY;
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

