class Menu {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.buttons = [
      new Button(100, 50, 100, 50, "navy", "Zombie"),
      new Button(280, 50, 115, 50, "navy", "Arkanroid"),
      new Button(460, 50, 170, 50, "navy", "ForestExplorer")
    ];
    
    this.exitButton = new Button(1705, 850, 150, 50, "aliceblue", "Exit game");
    this.mouse = { x: 0, y: 0 };
    this.brightness = 1;
    this.isRenderWave = false;
    
    this.gameImages = {
      zombie: null,
      arkanoid: null
    };
    
    this.setupEventListeners();
  }

  setImages(zombieImage, arkanoidImage) {
    this.gameImages.zombie = zombieImage;
    this.gameImages.arkanoid = arkanoidImage;
  }

  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }

  drawGameMode(gameMode) {
    this.ctx.font = "10px Arial";
    this.ctx.fillStyle = `rgba(10,75,100,${this.brightness})`;
    this.ctx.fillText("Game mode " + gameMode, 150, 390);

    if (this.brightness > 0) {
      this.brightness -= 0.01;
    }

    if (this.brightness <= 0) {
      this.isRenderWave = false;
    }
  }

  drawXYPosition() {
    this.ctx.fillStyle = 'navy';
    this.ctx.font = "15px Arial";
    this.ctx.fillText("x:" + this.mouse.x, 1735, 885);
    this.ctx.fillText(" y:" + this.mouse.y, 1780, 885);
  }

  drawMouseCursor() {
    this.ctx.fillStyle = 'gray';
    this.ctx.beginPath();
    this.ctx.arc(this.mouse.x, this.mouse.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawGamePreviews() {
    if (this.gameImages.zombie) {
      this.ctx.drawImage(this.gameImages.zombie, 72, 105, 150, 150);
    }
    if (this.gameImages.arkanoid) {
      this.ctx.drawImage(this.gameImages.arkanoid, 265, 105, 150, 150);
    }
  }

  draw(gameMode) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'aliceblue';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawXYPosition();
    
    if (gameMode === "off") {
      this.buttons.forEach(button => button.draw(this.ctx));
      this.drawGamePreviews();
      this.drawMouseCursor();
    }
  }

  handleClick(callback) {
    return (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      this.mouse.x = mouseX;
      this.mouse.y = mouseY;
      
      if (callback) {
        callback(mouseX, mouseY);
      }
    };
  }
}

