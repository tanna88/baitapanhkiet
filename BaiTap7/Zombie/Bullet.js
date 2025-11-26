class Bullet {
  constructor(x, y, speedX, speedY, speed, radius) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.speed = speed;
    this.radius = radius;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  isOutOfBounds(canvasWidth, canvasHeight) {
    return this.x < 0 || this.x > canvasWidth || 
           this.y < 0 || this.y > canvasHeight;
  }

  checkCollision(zombie) {
    const dx = this.speedX / this.speed;
    const dy = this.speedY / this.speed;
    
    // Kiểm tra va chạm với zombie (hình tròn)
    const distance = Math.sqrt(
      Math.pow(this.x - zombie.x, 2) + 
      Math.pow(this.y - zombie.y, 2)
    );
    
    return distance < (this.radius + zombie.radius);
  }

  draw(ctx) {
    this.move();
    
    const dx = this.speedX / this.speed;
    const dy = this.speedY / this.speed;
    
    // Vẽ bullet với 3 lớp màu
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(this.x + dx * this.radius, this.y + dy * this.radius, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x + dx * (this.radius + 10), this.y + dy * (this.radius + 10), this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

