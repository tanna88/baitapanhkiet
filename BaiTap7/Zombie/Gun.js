class Gun {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = 0;
  }

  updateAngle(mouseX, mouseY) {
    this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);
  }

  move(direction, step, canvasWidth, canvasHeight) {
    const minX = 0;
    const maxX = canvasWidth - 20;
    const minY = 0;
    const maxY = canvasHeight - 20;

    switch(direction) {
      case 'ArrowUp':
        this.y = Math.max(minY, this.y - step);
        break;
      case 'ArrowDown':
        this.y = Math.min(maxY, this.y + step);
        break;
      case 'ArrowLeft':
        this.x = Math.max(minX, this.x - step);
        break;
      case 'ArrowRight':
        this.x = Math.min(maxX, this.x + step);
        break;
    }
  }

  shoot() {
    const speed = 5;
    const dx = Math.cos(this.angle);
    const dy = Math.sin(this.angle);
    
    return {
      speed: speed,
      x: this.x + dx * this.length,
      y: this.y + dy * this.length,
      radius: 10,
      speedX: dx * speed,
      speedY: dy * speed
    };
  }

  draw(ctx) {
    ctx.strokeStyle = "silver";
    ctx.lineWidth = 6;
    ctx.fillStyle = 'navy';
    ctx.fillRect(this.x - 13, this.y - 13, 26, 26);
    
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x + Math.cos(this.angle) * this.length,
      this.y + Math.sin(this.angle) * this.length
    );
    ctx.stroke();
  }
}

