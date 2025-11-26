class Zombie {
  constructor(x, y, radius, speed, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.speedX = 0;
    this.speedY = 0;
    this.color = color;
  }

  static randomColor() {
    const colors = ["navy", "gold", "green"];
    const index = Math.round(Math.random() * 2);
    return colors[index];
  }

  static randomSize() {
    const minZ = 25;
    const maxZ = 50;
    return Math.random() * (maxZ - minZ) + minZ;
  }

  setPositionFromRight(canvasWidth, canvasHeight) {
    const dx = -0.1;
    const dy = 0;
    this.speedX = dx * this.speed;
    this.speedY = dy * this.speed;
    
    const min = this.radius;
    const max = 420;
    this.y = Math.random() * (max - min) + min;
    this.x = canvasWidth + 100;
  }

  setPositionFromBottom(canvasWidth, canvasHeight) {
    const dx = 0;
    const dy = -0.1;
    this.speedX = dx * this.speed;
    this.speedY = dy * this.speed;
    
    const min = this.radius;
    const max = 600;
    this.x = Math.random() * (max - min) + min;
    this.y = canvasHeight + 100;
  }

  randomizePosition(canvasWidth, canvasHeight) {
    const isFromBottom = Math.random() < 0.5;
    if (isFromBottom) {
      this.setPositionFromBottom(canvasWidth, canvasHeight);
    } else {
      this.setPositionFromRight(canvasWidth, canvasHeight);
    }
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  checkProtectLineCollision(protectLineX, protectLineY) {
    const min = 50;
    const max = 100;
    const zb = Math.random() * (max - min) + min;
    
    if (this.speedX == 0 && this.y <= protectLineY + this.radius) {
      this.y += zb;
    }
    
    if (this.speedY == 0 && this.x <= protectLineX + this.radius) {
      this.x += zb;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

