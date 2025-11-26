class Tank {
  constructor(x, y, width, height, color, direction, axis) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.direction = direction; // "up" or "down" for vertical, "left" or "right" for horizontal
    this.axis = axis; // "vertical" or "horizontal"
    this.minBound = 0;
    this.maxBound = 0;
  }

  setBounds(min, max) {
    this.minBound = min;
    this.maxBound = max;
  }

  update() {
    if (this.axis === "vertical") {
      if (this.y >= this.maxBound) {
        this.direction = "up";
      } else if (this.y <= this.minBound) {
        this.direction = "down";
      }
      
      if (this.direction === "down") {
        this.y++;
      } else {
        this.y--;
      }
    } else {
      if (this.x >= this.maxBound) {
        this.direction = "left";
      } else if (this.x <= this.minBound) {
        this.direction = "right";
      }
      
      if (this.direction === "right") {
        this.x++;
      } else {
        this.x--;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

