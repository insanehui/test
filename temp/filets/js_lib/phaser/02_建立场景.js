import Phaser from 'phaser'

function preload ()
{
}

function create ()
{
}

function update ()
{
}


var config = {
  /*
   * 可以指定Phaser.CANVAS或者Phaser.WEBGL，但建议设成AUTO
   * Phaser默认把场景追加到document，也可以显式指定渲染的位置
   */
  type: Phaser.AUTO, 
  width: 800,
  height: 600,
  scene: { // 这几个方法先留空
    preload,
    create,
    update,
  }
};

new Phaser.Game(config);

