/*
 * phina.js sample #004 by T. Fujita on 2019/9/12
 */

phina.globalize();

var SCREEN_X = 800;
var SCREEN_Y = 600;
var scale = 1;
var P_size = 48 * scale;
var F_rate = 6;
var Step = 2;

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
    this.player = Sprite('Player', 48, 48).addChildTo(this)
	.setPosition(this.gridX.center(), this.gridY.center())
	.setScale(scale);
    this.player.frameIndex = 0;
  },
  
  update: function(app) {
    var keyboard = app.keyboard;
    var touch_p = app.pointer;
    
// 左右移動
    if (keyboard.getKey('left') || (touch_p.getPointing() && (Math.floor(this.player.x / Step) * Step) > (Math.floor(touch_p.x / Step) * Step))) {
      this.player.x -= Step;
      if(app.frame % F_rate === 0) {
	this.player.frameIndex = (this.player.frameIndex === 3) ? 5:3;
      }
    }
    else if (keyboard.getKey('right') || (touch_p.getPointing() && (Math.floor(this.player.x / Step) * Step) < (Math.floor(touch_p.x / Step) * Step))) {
      this.player.x += Step;
      if(app.frame % F_rate === 0) {
	this.player.frameIndex = (this.player.frameIndex === 6) ? 8:6;
      }
    }
// 上下移動
    else if (keyboard.getKey('up') || (touch_p.getPointing() && (Math.floor(this.player.y / Step) * Step) > (Math.floor(touch_p.y / Step) * Step))) {
      this.player.y -= Step;
      if(app.frame % F_rate === 0) {
	this.player.frameIndex = (this.player.frameIndex === 9) ? 11:9;
      }
    }
    else if (keyboard.getKey('down') || (touch_p.getPointing() && (Math.floor(this.player.y / Step) * Step) < (Math.floor(touch_p.y / Step) * Step))) {
      this.player.y += Step;
      if(app.frame % F_rate === 0) {
	this.player.frameIndex = (this.player.frameIndex === 0) ? 2:0;
      }
    }
    else {
//      this.player.frameIndex = 0;
    }
  }
});


phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    width: SCREEN_X,
    height: SCREEN_Y,
    assets: ASSETS,
  });
//  app.enableStats();
  app.run();
});
