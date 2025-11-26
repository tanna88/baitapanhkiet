const canvas = document.getElementById("gameCanvas");
const game = new ArkanoidGame(canvas);

const exitButton = new ExitButton(game.ctx);
exitButton.handleClick(canvas);

function drawExitButton() {
  exitButton.draw();
}

function gameLoop() {
  game.loop(drawExitButton);
  requestAnimationFrame(gameLoop);
}

gameLoop();

