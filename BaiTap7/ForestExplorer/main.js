// Load images
const swordImage = new Image();
swordImage.src = 'assets/kiem.png';

const standImage = new Image();
standImage.src = 'assets/stand.png';

const stand2Image = new Image();
stand2Image.src = 'assets/stand2.png';

const attackImage = new Image();
attackImage.src = 'assets/attack.png';

const attack2Image = new Image();
attack2Image.src = 'assets/Attack2.png';

const firewood1Image = new Image();
firewood1Image.src = 'assets/firewood1.png';

const firewood2Image = new Image();
firewood2Image.src = 'assets/firewood2.png';

const helicopterImage = new Image();
helicopterImage.src = 'assets/helicopter.png';

const canvas = document.getElementById("gameCanvas");
const game = new ForestGame(canvas);

// Set images when loaded
const playerImages = [standImage, stand2Image, attackImage, attack2Image];
const firewoodImages = [firewood1Image, firewood2Image];

// Wait for images to load
Promise.all([
  new Promise(resolve => { swordImage.onload = resolve; }),
  new Promise(resolve => { standImage.onload = resolve; }),
  new Promise(resolve => { stand2Image.onload = resolve; }),
  new Promise(resolve => { attackImage.onload = resolve; }),
  new Promise(resolve => { attack2Image.onload = resolve; }),
  new Promise(resolve => { firewood1Image.onload = resolve; }),
  new Promise(resolve => { firewood2Image.onload = resolve; }),
  new Promise(resolve => { helicopterImage.onload = resolve; })
]).then(() => {
  game.setImages(swordImage, playerImages, firewoodImages, helicopterImage);
});

const exitButton = new ExitButton(game.ctx);
exitButton.handleClick(canvas);

function gameLoop() {
  game.loop();
  exitButton.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

