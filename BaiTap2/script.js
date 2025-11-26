const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gun = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  length: 50,
  angle: 0,
}; 
const bullets = []                    
var tank_y = 12
var dir = "down"
var tank_y2 = 309
var dir2 = "down"
var tank_x3 = 19
var dir3 = "down"
var tank_x4 = 475
var dir4 = "down"
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  gun.angle = Math.atan2(mouseY - gun.y, mouseX - gun.x);
});

canvas.addEventListener('click', (e) => {
  const speed = 5
  const dx = Math.cos(gun.angle);
  const dy = Math.sin(gun.angle);
  const bullet = {
    speed: speed,
    x: 100,
    y: 100,
    bS: 10,
    sp_x: dx * speed,
    sp_y: dy * speed
  };
  
  bullet.x = gun.x + dx * gun.length
  bullet.y = gun.y + dy * gun.length

  bullets.push(bullet)
});
function movebullet(bullet){
  bullet.x = bullet.x + bullet.sp_x
  bullet.y = bullet.y + bullet.sp_y
}
function drawBullet(bullet) {
  movebullet(bullet)
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(bullet.x, bullet.y, bullet.bS, 0, Math.PI * 2);
  const dx = bullet.sp_x / bullet.speed
  const dy = bullet.sp_y / bullet.speed
  ctx.fill();
  ctx.fillStyle = "red"
  ctx.beginPath();
  ctx.arc(bullet.x + dx * bullet.bS, bullet.y + dy * bullet.bS, bullet.bS, 0, Math.PI * 2 );
  ctx.fill();
}
function drawTank() {
  // tank body
  ctx.fillStyle = 'cyan';
  ctx.beginPath();
  ctx.fillRect(50,tank_y,25,25);
  if (tank_y >= 375) {
    dir = "up"
  } else if (tank_y <= 0){
    dir = "down"
  }
  if (dir == "down") {
    tank_y ++
  } else {
    tank_y --
  }
  ctx.fill();
}  
function drawTank2() {
  // tank body
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.fillRect(500,tank_y2,25,25);
  if (tank_y2 >= 375) {
    dir2 = "up"
  } else if (tank_y2 <= 0){
    dir2 = "down"
  }
  if (dir2 == "down") {
    tank_y2 ++
  } else {
    tank_y2 --
  }
  ctx.fill();
}  
function drawTank3() {
  // tank body
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.fillRect(tank_x3,50,25,25);
  if (tank_x3 >= 575) {
    dir3 = "left"
  } else if (tank_x3 <= 0){
    dir3 = "right"
  }
  if (dir3 == "right") {
    tank_x3 ++
  } else {
    tank_x3 --
  }
  ctx.fill();
}  
function drawTank4() {
  // tank body
  ctx.fillStyle = 'green';
  ctx.beginPath();
  ctx.fillRect(tank_x4,300,25,25);
  if (tank_x4 >= 575) {
    dir4 = "left"
  } else if (tank_x4 <= 0){
    dir4 = "right"
  }
  if (dir4 == "right") {
    tank_x4 ++
  } else {
    tank_x4 --
  }
  ctx.fill();
}  
function MutiBullets() {
  for(i =0; i < bullets.length; i++) {
    bullet = bullets[i]
    drawBullet(bullet)
  }
  
}  
function drawGun() {
  ctx.strokeStyle = "silver";
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(gun.x, gun.y);
  ctx.lineTo(
    gun.x + Math.cos(gun.angle) * gun.length,
    gun.y + Math.sin(gun.angle) * gun.length                                                                                                                                                                                                                                                                                                     
  );
  ctx.stroke();
}

function gameLoop() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   MutiBullets()
   drawGun();
   drawTank();
   drawTank2();
   drawTank3();
   drawTank4();
   requestAnimationFrame(gameLoop);
}

gameLoop();