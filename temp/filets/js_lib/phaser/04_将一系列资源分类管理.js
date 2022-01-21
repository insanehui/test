import Phaser from 'phaser'

// 加载资源
function preload () {
  this.load.image('sky', 'phaserAssets/sky.png');
  this.load.image('ground', 'phaserAssets/platform.png');
  this.load.image('star', 'phaserAssets/star.png');
  this.load.image('bomb', 'phaserAssets/bomb.png');

  // 雪碧图，通常用来实现角色的一系列动作
  this.load.spritesheet('dude', 
    'phaserAssets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );
}

var platforms;

function create () {
  // 背景布
  this.add.image(400, 300, 'sky');

  // 平台板子，角色可以站在上面
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
}

function update () {
}


var config = {
  type: Phaser.AUTO, 
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: { 
    preload,
    create,
    update,
  }
};

new Phaser.Game(config);

