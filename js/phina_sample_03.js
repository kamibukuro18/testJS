/*
 * phina.js sample #003 by T. Fujita on 2019/9/12
 */

phina.globalize();

var SCREEN_X = 800;
var SCREEN_Y = 600;
var scale = 1;
var P_size = 48 * scale;
var F_rate = 6;

var ASSETS = {
  image: {
    'Player': './images/ETNR_TOMITA_01.png',
    'bg': './images/bg.jpg',
  },
  spritesheet: {
    'Player_ss':
    {
      'frame': {
	'width': 48,
	'height': 48,
	'cols': 12,
	'rows': 1,
      },
      'animations': {
	'down': {
	  'frames': [0, 1, 2],
	  'next': 'down',
	  'frequency': F_rate,
	},
      }
    },
  }
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
    var player = Sprite('Player', P_size, P_size).addChildTo(this)
	.setPosition(this.gridX.center(), this.gridY.center())
	.setScale(scale);
    var anim_p = FrameAnimation('Player_ss').attachTo(player);
    anim_p.gotoAndPlay('down');
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

