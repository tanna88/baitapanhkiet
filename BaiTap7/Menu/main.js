// Get canvas - works from both root index.html and Menu/index.html
const canvas = document.getElementById("gameCanvas");
const menu = new Menu(canvas);

// Determine base path based on current location
const isInMenuFolder = window.location.pathname.includes('/Menu/');
const assetsPath = isInMenuFolder ? 'assets/' : 'Menu/assets/';

// Load images
const zombieImage = new Image();
zombieImage.src = assetsPath + 'zombie.png';

const arkanoidImage = new Image();
arkanoidImage.src = assetsPath + 'Arkanroid.png';

Promise.all([
  new Promise(resolve => { zombieImage.onload = resolve; }),
  new Promise(resolve => { arkanoidImage.onload = resolve; })
]).then(() => {
  menu.setImages(zombieImage, arkanoidImage);
});

const screen = {
  currentGame: "menu",
  gameMode: "off"
};

canvas.addEventListener('click', menu.handleClick((mouseX, mouseY) => {
  if (screen.gameMode === "off") {
    // Determine game paths based on current location
    const zombiePath = isInMenuFolder ? '../Zombie/index.html' : 'Zombie/index.html';
    const arkanoidPath = isInMenuFolder ? '../Arkanoid/index.html' : 'Arkanoid/index.html';
    const forestPath = isInMenuFolder ? '../ForestExplorer/index.html' : 'ForestExplorer/index.html';
    
    // Check button clicks
    if (menu.buttons[0].isClicked(mouseX, mouseY)) {
      window.location.href = zombiePath;
    } else if (menu.buttons[1].isClicked(mouseX, mouseY)) {
      window.location.href = arkanoidPath;
    } else if (menu.buttons[2].isClicked(mouseX, mouseY)) {
      window.location.href = forestPath;
    }
  }
}));

function gameLoop() {
  menu.draw(screen.gameMode);
  requestAnimationFrame(gameLoop);
}

gameLoop();

