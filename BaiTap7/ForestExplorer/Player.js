class Player {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.lastDirection = 0; // 0 = right, 1 = left
    this.currentImageIndex = 0;
    this.images = [];
  }

  setImages(images) {
    this.images = images;
  }

  move(direction, canvasWidth, canvasHeight) {
    const step = 10;
    
    switch(direction) {
      case 'ArrowLeft':
        this.currentImageIndex = 1;
        this.lastDirection = 1;
        this.x -= step;
        if (this.x <= -45) {
          this.x = canvasWidth + 50;
        }
        break;
      case 'ArrowRight':
        this.currentImageIndex = 0;
        this.lastDirection = 0;
        this.x += step;
        if (this.x >= canvasWidth + 50) {
          this.x = -45;
        }
        break;
      case 'ArrowUp':
        this.y -= step;
        if (this.y <= -45) {
          this.y = canvasHeight + 50;
        }
        break;
      case 'ArrowDown':
        this.y += step;
        if (this.y >= canvasHeight + 50) {
          this.y = -45;
        }
        break;
    }
  }

  attack() {
    if (this.lastDirection === 1) {
      this.currentImageIndex = 3;
      this.size += 75;
      this.x -= 75;
      this.y -= 75;
    } else {
      this.currentImageIndex = 2;
      this.size += 50;
      this.y -= 50;
    }
    
    return this.lastDirection;
  }

  resetAttack(direction) {
    if (direction === 1) {
      this.size -= 75;
      this.x += 75;
      this.y += 75;
    } else {
      this.size -= 50;
      this.y += 50;
    }
    this.currentImageIndex = this.lastDirection;
  }

  draw(ctx) {
    if (this.images[this.currentImageIndex]) {
      ctx.drawImage(
        this.images[this.currentImageIndex],
        this.x,
        this.y,
        this.size,
        this.size
      );
    }
  }
}

