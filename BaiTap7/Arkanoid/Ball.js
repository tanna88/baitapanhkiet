class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = 0;
    this.speedY = 0;
    this.isShoot = false;
    this.angle = 0;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.isShoot = false;
  }

  shoot(angle) {
    this.angle = angle;
    this.isShoot = true;
    this.assignAngleToSpeed();
  }

  assignAngleToSpeed() {
    const rad = (this.angle * Math.PI) / 180;
    const speed = 10;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    this.speedY = dy * speed;
    this.speedX = dx * speed;
  }

  move() {
    this.y += this.speedY;
    this.x += this.speedX;
  }

  checkWallCollision(canvasWidth, canvasHeight) {
    if (this.y <= this.radius) {
      this.speedY = -this.speedY;
    } else if (this.x <= this.radius) {
      this.speedX = -this.speedX;
    } else if (this.x >= canvasWidth - this.radius) {
      this.speedX = -this.speedX;
    }
  }

  checkPaddleCollision(paddle) {
    if (this.x > paddle.x && 
        this.x < paddle.x + paddle.width && 
        this.y > paddle.y && 
        this.y < paddle.y + paddle.height + this.radius) {
      this.speedY = -this.speedY;
      return true;
    }
    return false;
  }

  checkBrickCollision(brick) {
    if (this.y > brick.y && 
        this.y < brick.y + brick.height && 
        this.x > brick.x && 
        this.x < brick.x + brick.width) {
      return true;
    }
    return false;
  }

  increaseSpeed(level) {
    if (level == 1) {
      this.speedY += 0.1;
      this.speedX += 0.1;
    } else if (level == 2) {
      this.speedY += 0.5;
      this.speedX += 0.5;
    } else if (level == 3) {
      this.speedY += 1;
      this.speedX += 1;
    } else {
      this.speedY += 0.01;
      this.speedX += 0.01;
    }
  }

  draw(ctx, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  isOutOfBounds(paddleY) {
    return this.y >= paddleY + 10;
  }
}

