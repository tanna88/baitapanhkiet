class ExitButton {
  constructor(ctx, x = 1705, y = 850, width = 150, height = 50) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.ctx.fillStyle = "aliceblue";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "navy";
    this.ctx.fillText("Exit game", this.x + 5, this.y + 35);
  }

  isClicked(mouseX, mouseY) {
    return mouseX > this.x && 
           mouseX < this.x + this.width && 
           mouseY > this.y && 
           mouseY < this.y + this.height;
  }

  handleClick(canvas, callback) {
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      if (this.isClicked(mouseX, mouseY)) {
        if (callback) {
          callback();
        } else {
          window.location.href = '../index.html';
        }
      }
    });
  }
}

