class ZombieGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.gun = new Gun(420 / 2, 620 / 2, 50);
    this.bullets = [];
    this.zombies = [];
    this.zombieCount = 300;
    
    this.tanks = [
      new Tank(50, 12, 25, 25, 'skyblue', 'down', 'vertical'),
      new Tank(500, 309, 25, 25, 'gold', 'down', 'vertical'),
      new Tank(19, 50, 25, 25, 'gray', 'down', 'horizontal'),
      new Tank(475, 300, 25, 25, 'green', 'down', 'horizontal')
    ];
    
    this.tanks[0].setBounds(0, 375);
    this.tanks[1].setBounds(0, 375);
    this.tanks[2].setBounds(0, 575);
    this.tanks[3].setBounds(0, 575);
    
    this.protectLineX = 620;
    this.protectLineY = 413;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      this.gun.updateAngle(mouseX, mouseY);
    });

    this.canvas.addEventListener('click', (e) => {
      const bulletData = this.gun.shoot();
      const bullet = new Bullet(
        bulletData.x,
        bulletData.y,
        bulletData.speedX,
        bulletData.speedY,
        bulletData.speed,
        bulletData.radius
      );
      this.bullets.push(bullet);
    });

    document.addEventListener('keydown', (e) => {
      this.gun.move(e.key, 10, this.canvas.width, this.canvas.height);
    });
  }

  generateZombies() {
    if (this.zombies.length < this.zombieCount) {
      const zombie = new Zombie(
        1100,
        800,
        Zombie.randomSize(),
        7,
        Zombie.randomColor()
      );
      zombie.randomizePosition(this.canvas.width, this.canvas.height);
      this.zombies.push(zombie);
    }
  }

  update() {
    // Update bullets
    this.bullets = this.bullets.filter(bullet => {
      bullet.move();
      return !bullet.isOutOfBounds(this.canvas.width, this.canvas.height);
    });

    // Update zombies
    this.zombies.forEach(zombie => {
      zombie.move();
      zombie.checkProtectLineCollision(this.protectLineX, this.protectLineY);
    });

    // Update tanks
    this.tanks.forEach(tank => tank.update());

    // Check collisions
    this.checkZombieBulletCollisions();
  }

  checkZombieBulletCollisions() {
    for (let z = 0; z < this.zombies.length; z++) {
      const zombie = this.zombies[z];
      for (let b = 0; b < this.bullets.length; b++) {
        const bullet = this.bullets[b];
        if (bullet.checkCollision(zombie)) {
          zombie.randomizePosition(this.canvas.width, this.canvas.height);
          this.bullets.splice(b, 1);
          break;
        }
      }
    }
  }

  drawProtectLine() {
    this.ctx.fillStyle = 'lime';
    this.ctx.fillRect(0, this.protectLineY, 620, 10);
    this.ctx.fillRect(613, 0, 10, 420);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'aliceblue';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawProtectLine();
    
    this.zombies.forEach(zombie => zombie.draw(this.ctx));
    this.bullets.forEach(bullet => bullet.draw(this.ctx));
    this.gun.draw(this.ctx);
    this.tanks.forEach(tank => tank.draw(this.ctx));
  }

  reset() {
    this.zombies.forEach(zombie => {
      zombie.randomizePosition(this.canvas.width, this.canvas.height);
    });
    this.bullets = [];
  }

  loop() {
    this.generateZombies();
    this.update();
    this.draw();
  }
}

