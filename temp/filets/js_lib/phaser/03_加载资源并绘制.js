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

function create () {
  /*
   * 把sky渲染到场景中，phaser默认会给资源居中显示，因此这里显示到400,300的位置正好铺满整个背景
   */
  this.add.image(400, 300, 'sky');
}

function update () {
}


var config = {
  type: Phaser.AUTO, 
  width: 800,
  height: 600,
  scene: { 
    preload,
    create,
    update,
  }
};

new Phaser.Game(config);

