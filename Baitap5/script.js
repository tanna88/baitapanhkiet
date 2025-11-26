
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const waytogo = {
  y:650,
  x:0,
  bw:100,
  bh:10
};
var level = 1
const forwardTheBall = {
  y: 640,
  x: 50,
  bw: 0,
  bh: 10,
  sp_x: 0,
  sp_y: 0,
  isShoot: false,
  angle: 0,
}
const brickRowCount = 5;
const brickColCount = 9;
const brickWidth = 100;
const brickHeight = 30;
const brickPadding = 10;
const brickOffsetTop = 50;
const brickOffsetLeft = 10;

var brightness =1
var hideTheTime = 0
var currentGameOverColorIndex = 0
var currentColorInLevel4 = 0
var isRenderWave = false
var allBrickCount = brickColCount * brickRowCount
// allBrickCount = 0
let bricks = [];

function buildBricks() {
  for (r = 0;r < brickRowCount; r++){
    bricks[r] = [];
    for (c = 0;c < brickColCount; c++){
      bricks[r][c] = {
        y: brickOffsetTop + r * (brickHeight + brickPadding),
        x: brickOffsetLeft + c * (brickWidth + brickPadding),
        w:  brickWidth,
        h: brickHeight,
        color: randomColor(),
        isDead: false,
      };

    }
  }
}

// ========== handle events from here ========

canvas.addEventListener('click', (e) => {
  if (forwardTheBall.isShoot){
    return
  }
  bAngle = randomAngle(); 
  forwardTheBall.angle = bAngle
  forwardTheBall.isShoot = true;
  assignAngleToBallSpeed()
});


canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  waytogo.x = mouseX - waytogo.bw / 2;
  if (!forwardTheBall.isShoot == true) {
    forwardTheBall.x = mouseX;
  }
});


document.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
    noPlus = true
    forwardTheBall.y = 640;
    forwardTheBall.x = 550;
    waytogo.x = 500
    forwardTheBall.sp_x = 0
    forwardTheBall.sp_y = 0
    forwardTheBall.isShoot = false
    if (allBrickCount == 0){
      LevelUp()
      isRenderWave = true
      brightness = 1
    }
  }  
});

// ========== END handle events ========

// ========== draws from here ========

function drawBar() {
  ctx.fillStyle = 'navy'
  ctx.fillRect(waytogo.x, waytogo.y, waytogo.bw, waytogo.bh)
}

function drawBall() {
  if(level > 3){
    ctx.fillStyle = colorPickerForLevel4()
  }else {
    ctx.fillStyle = 'white'
  }
  ctx.beginPath();
  ctx.arc(forwardTheBall.x, forwardTheBall.y, forwardTheBall.bh, 0, Math.PI * 2);
  ctx.fill();
 
}

function drawBricks() {
  for (r = 0;r < brickRowCount; r++){
    for (c = 0;c < brickColCount; c++){
      var brick = bricks[r][c];
      if (brick.isDead != true){
        ctx.fillStyle = brick.color
        ctx.fillRect(brick.x, brick.y, brick.w, brick.h)
      }
    }
  }
}

// ========== END draw ========

// ========== pick color from here ========

function colorPickerForLevel4() {
  const colors = ["white", "black"]
  
  currentColorInLevel4++
  if (currentColorInLevel4 == (colors.length - 1) * hideTheTime){
    currentColorInLevel4 = 0
  }
  const index = Math.round(currentColorInLevel4 / hideTheTime)
  const color = colors[index]
  return color
}


function randomColor() {
  const colors = ["red", "gold","green","navy","purple","orange"]
  const index = Math.round(Math.random() * 5);
  const color = colors[index]
  return color
}
function pickGameOverColor() {
  const colors = ["red","orange","gold","green","blue","navy","purple","pink"]
  const index = Math.round(currentGameOverColorIndex / 25)
  const color = colors[index]
  currentGameOverColorIndex++
  if (currentGameOverColorIndex == (colors.length - 1) * 25){
    currentGameOverColorIndex = 0
  }
  return color
}
// ========== END pick color from here ========

function LevelUp(){
  for (r = 0;r < brickRowCount; r++){

    for (c = 0;c < brickColCount; c++){
      var brick = bricks[r][c];
      brick.isDead = false
    }
  }
  allBrickCount = brickColCount * brickRowCount
  level++
}

function handleWinGame(){

  if (allBrickCount != 0){
    return
  }
  if (level >= 3) {
    hideTheTime = hideTheTime + 5
  }
  ctx.fillStyle = "gold";
  ctx.font="175px Arial";
  ctx.fillText("Level Up!!!",50,400);
  ctx.font="50px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("space to go to the next level",250,470);
  level++
  ctx.fillText("Your next Level is: " + level,10, 650);
  level--
}
function checkBallTouchBricks() {
  for (r = 0;r < brickRowCount; r++){

    for (c = 0;c < brickColCount; c++){
      var brick = bricks[r][c];
    
        handleBallTouchBricks(brick)
    }
  }
}
function handleBallTouchBricks(brick) {
  if(isBallTouchBricks(brick) && !brick.isDead) {
    forwardTheBall.sp_y = -1 * forwardTheBall.sp_y
    brick.isDead = true
    allBrickCount--
    if (level == 1) {
      forwardTheBall.sp_y = forwardTheBall.sp_y + 0.1
      forwardTheBall.sp_x = forwardTheBall.sp_x + 0.1
    } else if (level == 2) {
      forwardTheBall.sp_y = forwardTheBall.sp_y + 0.5
      forwardTheBall.sp_x = forwardTheBall.sp_x + 0.5
    } else if (level == 3) {
      forwardTheBall.sp_y = forwardTheBall.sp_y + 1
      forwardTheBall.sp_x = forwardTheBall.sp_x + 1
    } else {
      forwardTheBall.sp_y = forwardTheBall.sp_y + 0.01
      forwardTheBall.sp_x = forwardTheBall.sp_x + 0.01
    }
    if (allBrickCount == 0){
      forwardTheBall.sp_x = 0
      forwardTheBall.sp_y = 0
    }

  }
}

function isBallTouchBricks(brick) {
  if (forwardTheBall.y > brick.y && forwardTheBall.y < brick.y + brick.h && forwardTheBall.x > brick.x && forwardTheBall.x < brick.x + brick.w) {
    return true
  }else {
    return false
  }
}
function randomAngle() {
  const minB = 215;
  const maxB = 305;
  const angle =  Math.random() * (maxB - minB) + minB;
  return angle
}

function assignAngleToBallSpeed() {
  const rad = (forwardTheBall.angle * Math.PI) / 180;
  const speed = 10
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  forwardTheBall.sp_y = dy * speed;
  forwardTheBall.sp_x = dx * speed;
}

function handleTouchedRoof(){
  forwardTheBall.sp_y = -1 * forwardTheBall.sp_y
}
function handleTouchedWallLeft(){
  forwardTheBall.sp_x = -1 * forwardTheBall.sp_x
}
function handleTouchedWallRight(){
  forwardTheBall.sp_x = -1 * forwardTheBall.sp_x
}
function handleTouchedBar(){
  forwardTheBall.sp_y = -1 * forwardTheBall.sp_y
}
function moveBall() {
  forwardTheBall.y = forwardTheBall.y + forwardTheBall.sp_y
  forwardTheBall.x = forwardTheBall.x + forwardTheBall.sp_x
  if (forwardTheBall.y <= 0){
    handleTouchedRoof()
  }else if (forwardTheBall.x <= 0){
    handleTouchedWallRight()
  }else if (forwardTheBall.x >= 1000){
    handleTouchedWallLeft()
  }else if (forwardTheBall.x > waytogo.x && forwardTheBall.x < waytogo.x + waytogo.bw && forwardTheBall.y > waytogo.y){
    handleTouchedBar()
  }
}
function GameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = pickGameOverColor();
  ctx.font="175px Arial";
  ctx.fillText("Bro Cook",100,400);
  ctx.font="50px Arial";
  ctx.fillText("thank for playing",300,465);
  ctx.fillText("click space to reset",265,505);
}

function renderWave() {
  ctx.font = "200px Arial";

  ctx.fillStyle = `rgba(10,75,100,${brightness})`;
  ctx.fillText("Wave " + level, 150, 390);

  if (brightness > 0) {
    brightness -= 0.01; // tốc độ mờ
  }

  if (brightness <= 0){
    isRenderWave = false
  }
}
function WinGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "100px Arial";
  ctx.fillStyle = 'black';
  ctx.fillText("Game complete",100,300);
  ctx.fillText("thank for playing",50,465);
}
function tròchơiLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (level == 7){
    WinGame()
  }else if (isRenderWave) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1000, 700);
    renderWave()
    drawBricks()
  } else if (forwardTheBall.y >= 700){
    GameOver()
  }else{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1000, 700);
    ctx.fillStyle = 'skyblue';
    ctx.font="25px Arial";
    ctx.fillText("Your Level is: " + level,10, 680);
    drawBar()
    drawBall()
    drawBricks()

    moveBall()

    checkBallTouchBricks()

    handleWinGame()
  }
  requestAnimationFrame(tròchơiLoop);

}

buildBricks();
tròchơiLoop();