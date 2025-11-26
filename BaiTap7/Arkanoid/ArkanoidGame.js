class ArkanoidGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.levelManager = new LevelManager();
    this.paddle = new Paddle(500, canvas.height - 20, 100, 10);
    this.ball = new Ball(550, this.paddle.y - 10, 10);
    this.brickManager = new BrickManager(this.levelManager);
    
    this.brightness = 1;
    this.isRenderWave = false;
    this.currentGameOverColorIndex = 0;
    this.noPlus = true;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.canvas.addEventListener('click', (e) => {
      if (this.ball.isShoot) return;
      
      const angle = this.randomAngle();
      this.ball.shoot(angle);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      this.paddle.update(mouseX, this.canvas.width);
      
      if (!this.ball.isShoot) {
        this.ball.x = mouseX;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === "Space") {
        this.reset();
        const aliveCount = this.brickManager.getAliveBrickCount();
        if (aliveCount == 0) {
          this.levelManager.levelUp();
          this.isRenderWave = true;
          this.brightness = 1;
        }
      }
    });
  }

  randomAngle() {
    const minB = 215;
    const maxB = 305;
    return Math.random() * (maxB - minB) + minB;
  }

  reset() {
    this.noPlus = true;
    this.ball.reset(this.paddle.getCenterX(), this.paddle.y - 10);
    this.paddle.x = 500;
  }

  resetAll() {
    this.levelManager.level = 1;
    this.brickManager.buildBricks();
    this.reset();
  }

  pickGameOverColor() {
    const colors = ["red", "orange", "gold", "green", "blue", "navy", "purple", "pink"];
    const index = Math.round(this.currentGameOverColorIndex / 25);
    const color = colors[index];
    this.currentGameOverColorIndex++;
    if (this.currentGameOverColorIndex == (colors.length - 1) * 25) {
      this.currentGameOverColorIndex = 0;
    }
    return color;
  }

  renderWave() {
    this.ctx.font = "200px Arial";
    this.ctx.fillStyle = `rgba(10,75,100,${this.brightness})`;
    this.ctx.fillText("Wave " + this.levelManager.level, 150, 390);

    if (this.brightness > 0) {
      this.brightness -= 0.01;
    }

    if (this.brightness <= 0) {
      this.isRenderWave = false;
    }
  }

  handleWinGame() {
    const aliveCount = this.brickManager.getAliveBrickCount();
    if (aliveCount != 0) return;

    this.ctx.fillStyle = "gold";
    this.ctx.font = "175px Arial";
    this.ctx.fillText("Level Up!!!", 50, 400);
    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("space to go to the next level", 250, 470);
    
    const nextLevel = this.levelManager.level + 1;
    this.ctx.fillText("Your next Level is: " + nextLevel, 10, 650);
    
    // Dừng ball
    this.ball.speedX = 0;
    this.ball.speedY = 0;
  }

  gameOver() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.pickGameOverColor();
    this.ctx.font = "175px Arial";
    this.ctx.fillText("Bro Cook", 100, 400);
    this.ctx.font = "50px Arial";
    this.ctx.fillText("thank for playing", 300, 465);
    this.ctx.fillText("click space to reset", 265, 505);
  }

  winGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "100px Arial";
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Game complete", 100, 300);
    this.ctx.fillText("thank for playing", 50, 465);
  }

  update() {
    if (this.ball.isShoot) {
      this.ball.move();
      this.ball.checkWallCollision(this.canvas.width, this.canvas.height);
      this.ball.checkPaddleCollision(this.paddle);
      this.brickManager.checkCollisions(this.ball);
    }
  }

  draw(drawExitButton) {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = 'skyblue';
    this.ctx.font = "25px Arial";
    this.ctx.fillText("Your Level is: " + this.levelManager.level, 10, 680);
    
    if (drawExitButton) {
      drawExitButton();
    }
    
    this.paddle.draw(this.ctx);
    this.ball.draw(this.ctx, this.levelManager.getBallColor());
    this.brickManager.draw(this.ctx);
  }

  loop(drawExitButton) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.levelManager.isGameComplete()) {
      this.winGame();
    } else if (this.isRenderWave) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.renderWave();
      this.brickManager.draw(this.ctx);
    } else if (this.ball.isOutOfBounds(this.paddle.y)) {
      this.gameOver();
    } else {
      this.update();
      this.draw(drawExitButton);
      this.handleWinGame();
    }
  }
}

