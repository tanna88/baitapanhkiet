
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener('mousemove', (e) => {
  
});

canvas.addEventListener('click', (e) => {
  
});


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.fillStyle = 'aliceblue';
  ctx.fillRect(0, 0, 1000, 700);
  
}

gameLoop();