
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const numRow = 14
const numCol = 20
const size = 50
const board = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
  [1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

//==================== GLOBAL variable above ===================

function drawBoard() {
  for (r = 0; r < board.length; r++){
    cols = board[r]
    for (c = 0;c < cols.length; c++){
      const value = board[r][c]
      drawCell(c * size, r * size, value)
    }
  }
}

function drawCell(x, y, value) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, size, size)
    ctx.strokeStyle = "red";   // màu viền
    ctx.lineWidth = 1;         // độ dày viền
    ctx.strokeRect(x, y, size, size);

    ctx.fillStyle = "white";
    ctx.fillText(value, x + size/2, y + size/2);
}

//==================== background above ===================



document.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
   
  }  
});

canvas.addEventListener('mousemove', (e) => {
  
});

canvas.addEventListener('click', (e) => {
  
});

//==================== EVENTS above ===================


function tròchơiLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawBoard()
  
  requestAnimationFrame(tròchơiLoop);
}

// buildBoard()
tròchơiLoop();