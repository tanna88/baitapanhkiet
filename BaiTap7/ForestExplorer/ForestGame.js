class ForestGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.day = 1;
    this.minuteToNextDay = 0;
    this.helperY = -500;
    
    this.player = new Player(850, 450, 100);
    this.helicopter = null;
    
    this.firewoodImages = [];
    this.firewoodIndex = 0;
    
    this.mouse = { x: 0, y: 0 };
    this.swordImage = null;
    
    this.setupEventListeners();
  }

  setImages(swordImage, playerImages, firewoodImages, helicopterImage) {
    this.swordImage = swordImage;
    this.player.setImages(playerImages);
    this.firewoodImages = firewoodImages;
    this.helicopter = new Helicopter(
      helicopterImage,
      this.canvas.width / 2,
      this.helperY,
      300,
      300
    );
    this.helicopter.targetY = this.canvas.height / 2;
  }

  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    document.addEventListener('keydown', (e) => {
      if (e.key.startsWith('Arrow')) {
        this.player.move(e.key, this.canvas.width, this.canvas.height);
      } else if (e.key === ' ') {
        const direction = this.player.attack();
        setTimeout(() => {
          this.player.resetAttack(direction);
        }, 200);
      }
    });
  }

  updateFirewoodIndex() {
    const centerX = this.canvas.width / 2 - 250;
    const centerY = this.canvas.height / 2 - 250;
    
    if (this.mouse.x > centerX && 
        this.mouse.x < centerX + 500 && 
        this.mouse.y > centerY && 
        this.mouse.y < centerY + 500) {
      this.firewoodIndex = 1;
    } else {
      this.firewoodIndex = 0;
    }
  }

  update() {
    this.minuteToNextDay += 1;
    if (this.minuteToNextDay == 100 && this.day != 7) {
      this.day++;
      this.minuteToNextDay = 0;
    }
    
    if (this.helicopter) {
      this.helicopter.update(this.day, this.canvas.height);
    }
    
    this.updateFirewoodIndex();
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'lime';
    this.ctx.fillRect(0, 300, this.canvas.width, 350);
  }

  drawFirewood() {
    if (this.firewoodImages[this.firewoodIndex]) {
      if (this.firewoodIndex == 1) {
        this.ctx.drawImage(
          this.firewoodImages[this.firewoodIndex],
          this.canvas.width / 2 - 250,
          this.canvas.height / 2 - 250,
          500,
          500
        );
      } else {
        this.ctx.drawImage(
          this.firewoodImages[this.firewoodIndex],
          870,
          410,
          100,
          100
        );
      }
    }
  }

  drawMouse() {
    if (this.swordImage) {
      this.ctx.save();
      this.ctx.translate(this.mouse.x, this.mouse.y);
      this.ctx.rotate(45 * Math.PI / 180);
      this.ctx.drawImage(this.swordImage, -50, -50, 100, 100);
      this.ctx.restore();
    }
  }

  drawDebug() {
    this.ctx.fillStyle = 'navy';
    this.ctx.font = "15px Arial";
    this.ctx.fillText("day: " + this.day, 1535, 885);
    this.ctx.fillText("helperY: " + this.helperY, 1580, 885);
  }

  draw() {
    this.drawBackground();
    this.drawFirewood();
    this.drawMouse();
    this.player.draw(this.ctx);
    if (this.helicopter) {
      this.helicopter.draw(this.ctx);
    }
    this.drawDebug();
  }

  reset() {
    this.day = 1;
    this.minuteToNextDay = 0;
    this.player.x = 850;
    this.player.y = 450;
    if (this.helicopter) {
      this.helicopter.y = -500;
    }
  }

  loop() {
    this.update();
    this.draw();
  }
}

