class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update(mouseX, canvasWidth) {
    this.x = mouseX - this.width / 2;
    // Giữ paddle trong canvas
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'navy';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  getCenterX() {
    return this.x + this.width / 2;
  }
}

