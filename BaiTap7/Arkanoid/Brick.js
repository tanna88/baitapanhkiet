class Brick {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isDead = false;
  }

  static randomColor() {
    const colors = ["red", "gold", "green", "navy", "purple", "orange"];
    const index = Math.round(Math.random() * 5);
    return colors[index];
  }

  draw(ctx) {
    if (!this.isDead) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  reset() {
    this.isDead = false;
  }
}

