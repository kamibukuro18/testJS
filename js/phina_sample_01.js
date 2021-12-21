/*
 * phina.js sample #001 by T. Fujita on 2019/9/12
 */

phina.globalize();

var SCREEN_X = 800;
var SCREEN_Y = 600;
var scale = 1;
var P_size = 48 * scale;

var ASSETS = {
  image: {
    'Player': './images/ETNR_TOMITA_01.png',
    'bg': './images/bg.jpg',
  },
};

phina.define('MainScene', {
  superClass: 'DisplayScene',
  
  init: function(option) {
    this.superInit(option);
    this.bg = Sprite("bg").addChildTo(this);
    this.bg.origin.set(0, 0);
    this.bg.width = SCREEN_X;
    this.bg.height = SCREEN_Y;
//    this.backgroundColor = '#ffaaaa';
    var player = Sprite('Player', 48, 48)
	.addChildTo(this)
	.setPosition(this.gridX.center(), this.gridY.center())
	.setScale(scale);
    player.frameIndex = 0;
  },
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    width: SCREEN_X,
    height: SCREEN_Y,
    assets: ASSETS,
  });
  
  app.run();
});

