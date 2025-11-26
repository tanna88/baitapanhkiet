class Button {
  constructor(x, y, width, height, color, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.text = text;
  }

  isClicked(mouseX, mouseY) {
    return mouseX > this.x && 
           mouseX < this.x + this.width && 
           mouseY > this.y && 
           mouseY < this.y + this.height;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.text, this.x + 10, this.y + 33);
  }
}

