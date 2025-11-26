const gun = {
  x: 420 / 2,
  y: 620 / 2,
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
const zombies = []
var zomCount = 300
canvas.addEventListener('mousemove', (e) => {
  if (screen.ScGame == "menu") { 
    return
  }

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  gun.angle = Math.atan2(mouseY - gun.y, mouseX - gun.x);
});

canvas.addEventListener('click', (e) => {
  if (screen.ScGame == "menu") { 
    return
  }
  if (mouse.x > btnZom.x && mouse.x < btnZom.x + btnZom.w && mouse.y > btnZom.y && mouse.y < btnZom.y + btnZom.h) {
    return
  }
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
  console.log(bullets)

});

function movebullet(bullet){
  bullet.x = bullet.x + bullet.sp_x
  bullet.y = bullet.y + bullet.sp_y
}
function drawBullet(bullet) {
  movebullet(bullet)
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(bullet.x, bullet.y, bullet.bS, 0, Math.PI * 2);
  ctx.fill();
  const dx = bullet.sp_x / bullet.speed
  const dy = bullet.sp_y / bullet.speed
  
  ctx.fillStyle = "orange"
  ctx.beginPath();  
  ctx.arc(bullet.x + dx * bullet.bS, bullet.y + dy * bullet.bS, bullet.bS, 0, Math.PI * 2 );
  ctx.fill();

  ctx.fillStyle = "red"
  ctx.beginPath();
  ctx.arc(bullet.x + dx * (bullet.bS + 10), bullet.y + dy * (bullet.bS + 10), bullet.bS, 0, Math.PI * 2 );
  ctx.fill();
  
}

function createProtectLine() {
  ctx.fillStyle = 'lime';
  ctx.fillRect(0, 413, 620, 10);
  ctx.fillRect(613, 0, 10, 420);
}
function generateZombies() {
  if (zombies.length < zomCount) {
    const colors = ["navy", "gold","green"]
    const index = Math.round(Math.random() * 2);
    const color = colors[index]
    const minZ = 25;
    const maxZ = 50;
    Zsize = Math.random() * (maxZ - minZ) + minZ;

    const zombie = {
      speed: 7,
      x: 1100,
      y: 800,
      bS: Zsize,
      color: color
    };

    zombies.push(zombie)

    ramdomZombiePosition(zombie)
  }
}

function ramdomZombiePosition(zombie) {
  const isFromBottom = Math.random() < 0.5;
  if (isFromBottom) {
    randomZombieFromBottom(zombie)
  } else {
    randomZombieFromRight(zombie)
  }
}

function randomZombieFromRight(zombie) {
  const dx = -0.1
  const dy = 0
  zombie.sp_x = dx * zombie.speed,
  zombie.sp_y = dy * zombie.speed
  
  const min = zombie.bS;
  const max = 420;
  zombie.y = Math.random() * (max - min) + min;
  zombie.x = canvas.width + 100
}

function randomZombieFromBottom(zombie) {
  const dx = 0
  const dy = -0.1
  zombie.sp_x = dx * zombie.speed,
  zombie.sp_y = dy * zombie.speed
  
  const min = zombie.bS;
  const max = 600;
  zombie.x = Math.random() * (max - min) + min;
  zombie.y = canvas.height + 100
}

function drawZombies() {
  for(i = 0; i < zombies.length; i++) {
    var zombie = zombies[i]
    drawZombie(zombie)
    moveZombie(zombie)
    checkZombiesTouchProtectLine(zombie)
  }
}  
function drawZombie(zombie) {
  ctx.beginPath();
  ctx.fillStyle = zombie.color
  ctx.arc(zombie.x,zombie.y,zombie.bS,0,Math.PI * 2)
  ctx.fill();
}
function moveZombie(zombie) {
  zombie.x = zombie.x + zombie.sp_x
  zombie.y = zombie.y + zombie.sp_y
}

function checkZombiesTouchProtectLine(zombie) {
  const min = 50;
  const max = 100;
  zb = Math.random() * (max - min) + min;
  if (zombie.sp_x == 0 && zombie.y <= 420 + zombie.bS){
    zombie.y = zombie.y + zb
  }

  if (zombie.sp_y == 0 && zombie.x <= 620 + zombie.bS){
    zombie.x = zombie.x + zb
  }
}

function checkZombiesTouchBullets() {
  for(z = 0; z < zombies.length; z++) {
    var zombie = zombies[z]
    for(b = 0; b < bullets.length; b++) {
      var bullet = bullets[b]
      handleZombieTouchBullet(zombie,bullet)
    }
  }
}
function handleZombieTouchBullet(zombie,bullet) {
  if(isZombieTouchBullet(zombie,bullet)) {
    ramdomZombiePosition(zombie)
  }
}

function isZombieTouchBullet(zombie,bullet) {
  if (bullet.y > zombie.y && bullet.y < zombie.y + zombie.bS && bullet.x > zombie.x && bullet.x < zombie.x + zombie.bS){
    return true
  }else {
    return false
  }
}


function drawTank() {
  // tank body
  ctx.fillStyle = 'skyblue';
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
  ctx.fillStyle = 'gold';
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
  ctx.fillStyle = 'gray';
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
function drawBullets() {
  for(i = 0; i < bullets.length; i++) {
    var bullet = bullets[i]
    drawBullet(bullet)
  }
  
}  
function drawGun() {
  ctx.strokeStyle = "silver";
  ctx.lineWidth = 6;
  ctx.fillStyle = 'navy'
  ctx.fillRect(gun.x - 13,gun.y - 13,26,26)
  ctx.beginPath();
  ctx.moveTo(gun.x, gun.y);
  ctx.lineTo(
    gun.x + Math.cos(gun.angle) * gun.length,
    gun.y + Math.sin(gun.angle) * gun.length
  );
  ctx.stroke();
  
}
document.addEventListener("keydown", function (event) {
  const step = 10;

  if (event.key === "ArrowDown") {
      gun.y += step;
      if (gun.y == 410) {
        gun.y -= step
      }
  } else if (event.key === "ArrowLeft") {
      gun.x -= step;
      if (gun.x == -10 ) {
        gun.x += step
      }
  } else if (event.key === "ArrowUp") {
      gun.y -= step;
      if (gun.y == -10) {
        gun.y += step
      }
      
  } else if (event.key === "ArrowRight") {
      gun.x += step;
      if (gun.x == 610) {
        gun.x -= step
      }
  }
});
function resetAllZomGame() {
  for(z = 0; z < zombies.length; z++) {
    var zombie = zombies[z]
    ramdomZombiePosition(zombie)
  }
  bullets.splice(0,bullets.length + 1)
}
function zombieLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.fillStyle = 'aliceblue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  generateZombies();



  createProtectLine()
  
  drawZombies()
  drawGun();
  drawBullets()

  drawTank();
  drawTank2();
  drawTank3();
  drawTank4();

  checkZombiesTouchBullets()

}
