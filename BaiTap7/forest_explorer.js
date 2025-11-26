var WhereAndLook = {
  h:100,
  x:850,
  y:450
}
var helperY = -500
var day =  1
const firewood =[img10,img9]
var firewoodIndex = 0
const personImages =[img4,img5,img6,img7]
var lastPersonImages;
var personIndex = 0
var minuteToTheNextDay=0
function debug(){
  ctx.fillStyle = 'navy';
  ctx.font="15px Arial";
  ctx.fillText("day: " + day,1535,885);
  ctx.fillText("helperY: " + helperY,1580,885);
}
function firewoods(){
  if (mouse.x > canvas.width/2 - 250 && mouse.x < canvas.width/2 - 250 + 500 && mouse.y > canvas.height/2 - 250 && mouse.y < canvas.height/2 - 250 + 500){
    firewoodIndex = 1
  }else{
    firewoodIndex = 0 
  }
  if (firewoodIndex == 1){
    ctx.drawImage( firewood[firewoodIndex], canvas.width/2 - 250, canvas.height/2 - 250, 500, 500);
    return
  }
  ctx.drawImage( firewood[firewoodIndex], 870, 410, 100, 100);
}
function drawperson(){
  ctx.drawImage(personImages[personIndex], WhereAndLook.x, WhereAndLook.y, WhereAndLook.h, WhereAndLook.h);
}
function helicopter() {
  ctx.drawImage(img8, canvas.width / 2, helperY, 300, 300);
  if (day == 7 && helperY != canvas.height / 2){
    helperY += 10
  }
}
function drawBackround() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'lime';
  ctx.fillRect(0, 300, canvas.width, 350);
}
function drawMouse() {
  ctx.save();
  ctx.translate(mouse.x, mouse.y);
  ctx.rotate(45 * Math.PI / 180);
  ctx.drawImage(img3, -50, -50, 100, 100);
  ctx.restore();
}
function forestLoop() {
  drawBackround()
  firewoods()
  drawMouse()
  drawperson()
  helicopter()
  minuteToTheNextDay += 1
  if (minuteToTheNextDay == 100 && day != 7){
    day ++
    minuteToTheNextDay = 0
  }
  debug()
}
canvas.addEventListener('click', (e) => {

});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  mouse.x = mouseX;
  mouse.y = mouseY;
});

document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowLeft")  {
    personIndex = 1
    lastPersonImages = 1
    WhereAndLook.x -= 10
    if (WhereAndLook.x <= -45){
      WhereAndLook.x = 2000
    }
  }
  if (e.key === "ArrowRight") {
    personIndex = 0
    lastPersonImages = 0
    WhereAndLook.x += 10
    if (WhereAndLook.x >= 2000){
      WhereAndLook.x = -45
    }
  }
  if (e.key === "ArrowUp"){
  
    WhereAndLook.y -= 10
    if (WhereAndLook.y <= -45){
      WhereAndLook.y = 1000
    }
  }
  if (e.key === "ArrowDown"){
    WhereAndLook.y += 10
    if (WhereAndLook.y >= 1000){
      WhereAndLook.y = -45
    }
  }
  if (e.key === " ") {
    if (lastPersonImages == 1) {
      personIndex = 3
      WhereAndLook.h += 75
      WhereAndLook.x -= 75
      WhereAndLook.y -= 75
      setTimeout(() => {
          personIndex = lastPersonImages
          WhereAndLook.h -= 75
          WhereAndLook.x += 75
          WhereAndLook.y += 75
      }, 200);
    }else if (lastPersonImages == 0){
      personIndex = 2
      WhereAndLook.h += 50
      WhereAndLook.y -= 50
      setTimeout(() => {
          personIndex = lastPersonImages
          WhereAndLook.h -= 50
          WhereAndLook.y += 50
      }, 200);  
    }
  }
});