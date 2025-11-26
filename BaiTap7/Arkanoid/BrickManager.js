class BrickManager {
  constructor(levelManager) {
    this.levelManager = levelManager;
    this.bricks = [];
    this.buildBricks();
  }

  buildBricks() {
    const { brickRowCount, brickColCount, brickWidth, brickHeight, 
            brickPadding, brickOffsetTop, brickOffsetLeft } = this.levelManager;
    
    this.bricks = [];
    for (let r = 0; r < brickRowCount; r++) {
      this.bricks[r] = [];
      for (let c = 0; c < brickColCount; c++) {
        this.bricks[r][c] = new Brick(
          brickOffsetLeft + c * (brickWidth + brickPadding),
          brickOffsetTop + r * (brickHeight + brickPadding),
          brickWidth,
          brickHeight,
          Brick.randomColor()
        );
      }
    }
  }

  reset() {
    for (let r = 0; r < this.bricks.length; r++) {
      for (let c = 0; c < this.bricks[r].length; c++) {
        this.bricks[r][c].reset();
      }
    }
  }

  getAliveBrickCount() {
    let count = 0;
    for (let r = 0; r < this.bricks.length; r++) {
      for (let c = 0; c < this.bricks[r].length; c++) {
        if (!this.bricks[r][c].isDead) {
          count++;
        }
      }
    }
    return count;
  }

  checkCollisions(ball) {
    for (let r = 0; r < this.bricks.length; r++) {
      for (let c = 0; c < this.bricks[r].length; c++) {
        const brick = this.bricks[r][c];
        if (!brick.isDead && ball.checkBrickCollision(brick)) {
          ball.speedY = -ball.speedY;
          brick.isDead = true;
          ball.increaseSpeed(this.levelManager.level);
          return true;
        }
      }
    }
    return false;
  }

  draw(ctx) {
    for (let r = 0; r < this.bricks.length; r++) {
      for (let c = 0; c < this.bricks[r].length; c++) {
        this.bricks[r][c].draw(ctx);
      }
    }
  }
}

