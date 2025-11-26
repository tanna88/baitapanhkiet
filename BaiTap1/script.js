const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

var circle_x = 50;
  var circle_y = 100;
  const circleSize = 25;

  function drawcircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa khung vẽ
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(circle_x, circle_y, circleSize, 0, Math.PI * 2); // Vẽ hình tròn
    ctx.fill();
  }

  drawcircle();
document.addEventListener("keydown", function (event) {
    const step = 10;
  
    if (event.key === "ArrowRight") {
        circle_x += step;
        if (circle_x >= canvas.width + step - circleSize) {
            circle_x = canvas.width - circleSize
        }
    } else if (event.key === "ArrowLeft") {
        circle_x -= step;
        if (circle_x <= - step + circleSize ) {
            circle_x = circleSize
        }
    } else if (event.key === "ArrowUp") {
        circle_y -= step;
        if (circle_y <= circleSize - step) {
            circle_y = circleSize
        }
        
    } else if (event.key === "ArrowDown") {
        circle_y += step;
        if (circle_y >= canvas.height - circleSize) {
            circle_y = canvas.height - circleSize
        }
    }
  
    drawcircle(); // Vẽ lại hình mới
  });
