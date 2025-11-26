# Mini Game Collection

Đây là bộ sưu tập các mini games được refactor theo hướng đối tượng (OOP) để dễ maintain và mở rộng.

## Cấu trúc thư mục

```
BaiTap7/
├── index.html              # Menu chính để chọn game
├── Arkanoid/               # Game Arkanoid (Breakout)
│   ├── index.html
│   ├── main.js
│   ├── ArkanoidGame.js     # Class chính quản lý game
│   ├── Ball.js             # Class quả bóng
│   ├── Paddle.js           # Class thanh đỡ
│   ├── Brick.js            # Class gạch
│   ├── BrickManager.js     # Class quản lý gạch
│   ├── LevelManager.js     # Class quản lý level
│   └── assets/             # Hình ảnh và icon
├── Zombie/                 # Game Zombie Defense
│   ├── index.html
│   ├── main.js
│   ├── ZombieGame.js       # Class chính quản lý game
│   ├── Gun.js              # Class súng
│   ├── Bullet.js           # Class đạn
│   ├── Zombie.js           # Class zombie
│   ├── Tank.js             # Class xe tăng
│   └── assets/             # Hình ảnh và icon
├── ForestExplorer/          # Game Forest Explorer
│   ├── index.html
│   ├── main.js
│   ├── ForestGame.js       # Class chính quản lý game
│   ├── Player.js           # Class người chơi
│   ├── Helicopter.js       # Class trực thăng
│   └── assets/             # Hình ảnh và icon
└── Menu/                   # Menu system (có thể dùng chung)
    ├── Button.js           # Class nút bấm
    └── Menu.js             # Class menu
```

## Cách chơi

### Arkanoid
- Click chuột để bắn bóng
- Di chuyển chuột để di chuyển thanh đỡ
- Nhấn Space để reset hoặc chuyển level
- Phá hết gạch để lên level

### Zombie
- Di chuyển súng bằng phím mũi tên
- Click chuột để bắn
- Tiêu diệt zombie để bảo vệ căn cứ

### Forest Explorer
- Di chuyển bằng phím mũi tên
- Nhấn Space để tấn công
- Khám phá rừng và chờ trực thăng cứu hộ

## Cấu trúc OOP

Mỗi game được chia thành các class riêng biệt:
- **Game Class**: Quản lý logic chính, vòng lặp game, events
- **Entity Classes**: Các đối tượng trong game (Ball, Zombie, Player, etc.)
- **Manager Classes**: Quản lý nhóm đối tượng (BrickManager, LevelManager)

## Cách mở game

Mở file `index.html` trong trình duyệt để xem menu và chọn game muốn chơi.

