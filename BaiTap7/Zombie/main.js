const canvas = document.getElementById("gameCanvas");
const game = new ZombieGame(canvas);

const exitButton = new ExitButton(game.ctx);
exitButton.handleClick(canvas);

function gameLoop() {
  game.loop();
  exitButton.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

