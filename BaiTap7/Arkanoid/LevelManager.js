class LevelManager {
  constructor() {
    this.level = 1;
    this.brickRowCount = 7;
    this.brickColCount = 16;
    this.brickWidth = 103;
    this.brickHeight = 45;
    this.brickPadding = 11;
    this.brickOffsetTop = 50;
    this.brickOffsetLeft = 10;
    this.hideTheTime = 0;
    this.currentColorInLevel4 = 0;
  }

  getTotalBrickCount() {
    return this.brickRowCount * this.brickColCount;
  }

  levelUp() {
    this.level++;
    if (this.level >= 3) {
      this.hideTheTime += 5;
    }
  }

  getBallColor() {
    if (this.level > 3) {
      return this.colorPickerForLevel4();
    }
    return 'white';
  }

  colorPickerForLevel4() {
    const colors = ["white", "black"];
    this.currentColorInLevel4++;
    if (this.currentColorInLevel4 == (colors.length - 1) * this.hideTheTime) {
      this.currentColorInLevel4 = 0;
    }
    const index = Math.round(this.currentColorInLevel4 / this.hideTheTime);
    return colors[index];
  }

  isGameComplete() {
    return this.level >= 7;
  }
}

