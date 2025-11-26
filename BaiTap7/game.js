//image
const img1 = new Image();
img1.src = 'zombie.png';
const img2 = new Image();
img2.src = 'Arkanroid.png';
const img3 = new Image();
img3.src = 'kiem.png';
const img4 = new Image();
img4.src = 'stand.png';
const img5 = new Image();
img5.src = 'stand2.png';
const img6 = new Image();
img6.src = 'attack.png';
const img7 = new Image();
img7.src = 'Attack2.png';
const img8 = new Image();
img8.src = 'helicopter.png';
const img9 = new Image();
img9.src = 'firewood2.png';
const img10 = new Image();
img10.src = 'firewood1.png';































































const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
var brightness = 1

const btnArkan = { x: 280, y: 50, w: 115, h: 50, co: "navy", text: "Arkanroid" };
const btnForest = { x: 460, y: 50, w: 170, h: 50, co: "navy", text: "ForestExplorer" };
const btnZom = { x: 100, y: 50, w: 100, h: 50, co: "navy", text: "Zombie" };
const exitBtn = { x: 1705, y: 850, w: 150, h: 50, co: "aliceblue", text: "Exit game" };
const screen = {
  // page:1,
  ScGame:"menu",
  gameMode:"off",
}
const mouse = {
  x:0,
  y:0
}
function drawButton() {
  ctx.fillRect(btnZom.x, btnZom.y, btnZom.w, btnZom.h);
  ctx.fillRect(btnArkan.x, btnArkan.y, btnArkan.w, btnArkan.h);
  ctx.fillRect(btnForest.x, btnForest.y, btnForest.w, btnForest.h);
}
function gameText() {
  ctx.fillText(btnZom.text,btnZom.x + 10,btnZom.y + 33);
  ctx.fillText(btnArkan.text,btnArkan.x + 5,btnArkan.y + 33);
  ctx.fillText(btnForest.text,btnForest.x + 3,btnForest.y + 33);
}
function GenerateButton() {
  ctx.fillStyle = btnZom.co;
  drawButton()
  ctx.font="25px Arial";
  ctx.fillStyle = "white";
  gameText()
}
function drawExitButton() {
  ctx.fillStyle = exitBtn.co;
  ctx.fillRect(exitBtn.x, exitBtn.y, exitBtn.w, exitBtn.h);
  ctx.font="25px Arial";
  ctx.fillStyle = "navy";
  ctx.fillText(exitBtn.text,1710,885);
}
function drawGameMode(){
  ctx.font = "10px Arial";

  ctx.fillStyle = `rgba(10,75,100,${brightness})`;
  ctx.fillText("Game mode " + screen.gameMode, 150, 390);

  if (brightness > 0) {
    brightness -= 0.01; // tốc độ mờ
  }

  if (brightness <= 0){
    isRenderWave = false
  }
}
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  mouse.x = mouseX;
  mouse.y = mouseY;
});

canvas.addEventListener('click', (e) => {
    if (screen.gameMode == "off" && mouse.x > btnArkan.x && mouse.x < btnArkan.x + btnArkan.w && mouse.y > btnArkan.y && mouse.y < btnArkan.y + btnArkan.h) {
      screen.ScGame = "arkanoid"
      level = 1
      drawGameMode()
      resetAllAnkanGame()
      screen.gameMode = "on"
    }
    if (screen.gameMode == "off" && mouse.x > btnZom.x && mouse.x < btnZom.x + btnZom.w && mouse.y > btnZom.y && mouse.y < btnZom.y + btnZom.h) {
      screen.ScGame = "zombie"
      drawGameMode()
      resetAllZomGame()
      screen.gameMode = "on"
    }
    if (screen.gameMode == "off" && mouse.x > btnForest.x && mouse.x < btnForest.x + btnForest.w && mouse.y > btnForest.y && mouse.y < btnForest.y + btnForest.h) {
      screen.ScGame = "explore forest"
      day =  1
      drawGameMode()
      WhereAndLook.x=850
      WhereAndLook.y=450
      screen.gameMode = "on"
    }
    if (screen.gameMode == "on" && mouse.x > exitBtn.x && mouse.x < exitBtn.x + exitBtn.w && mouse.y > exitBtn.y && mouse.y < exitBtn.y + exitBtn.h) {
      screen.ScGame = "menu"
      screen.gameMode = "off"

    }
});
function XYpositioning() {
  ctx.fillStyle = 'navy';
  ctx.font="15px Arial";
  ctx.fillText("x:" + mouse.x,1735,885);
  ctx.fillText(" y:" + mouse.y,1780,885);
}
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.fillStyle = 'aliceblue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  XYpositioning()
  GenerateButton()
  if (screen.ScGame == "arkanoid"){
    arkanLoop();
  }
  if (screen.ScGame == "zombie") {
    zombieLoop()
  }
  if (screen.ScGame == "explore forest") {
    forestLoop()
  }
  if (screen.gameMode == "on"){
    drawExitButton()
  }else {
    ctx.drawImage(img1, 72, 105, 150, 150);
    ctx.drawImage(img2, 265, 105, 150, 150);

  }
  if (screen.gameMode == "off"){
    ctx.fillStyle = 'gray';
    ctx.beginPath();  
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();