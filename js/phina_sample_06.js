/*
 * phina.js sample #006 by T. Fujita on 2019/9/24
 */

phina.globalize();

var SCREEN_X = 800;
var SCREEN_Y = 600;
var scale = 1;
var P_size = 48 * scale;
var F_rate = 6;
var Step = 2;
var max_rooms = room.length;
var counter = 0;
var BL_counter = 0;
var BL_x = 0;
var BL_y = 0;
var score = " ";
var scoreLabel;
var flag = "stay";
var END_flag;
var pos = [];
var temp = [];
var BLOCK = [];
var ROOM = room[0];


var ASSETS = {
  image: {
    'bg': './images/bg.jpg',
    'Player': './images/ETNR_TOMITA_01.png',
    'again': './images/A_48.png',
    'block': './images/Box_06.png',
    'goal': './images/Goal_00.png',
    'wall_0': './images/Block_05.png',
    'wall_1': './images/Block_04.png',
  },
};


phina.define('TitleScene',{
  superClass: 'DisplayScene',
  init: function(option) {
    this.superInit(option);
//    this.backgroundColor = '#ffaaaa';
    this.bg = Sprite("bg").addChildTo(this);
    this.bg.origin.set(0, 0);
    this.bg.width = SCREEN_X;
    this.bg.height = SCREEN_Y;
    var score_02 = 'ここで使用しているグラフィックの一部に「どらぴか」様\n URL: https://dorapika.wixsite.com/pikasgame \n作成の素材を使用しております。';
    if(END_flag == "Again !") {
	counter = counter - 1;
        var score_01 = 'Again !';
	var score_03 = 'Again the Room No. ' + counter + '\n\n by T. Fujita';
    } else if(END_flag == 'Goal !' && counter >= max_rooms) {
	counter = 0;
        var score_01 = 'Goal !';
	var score_03 = 'Return to the Room No. ' + counter + '\n\n by T. Fujita';
    } else {
	if(counter >= max_rooms) {
	    counter = 0;
	}
        var score_01 = 'Goal !';
	var score_03 = 'Next Room is No. ' + counter + '\n\n by T. Fujita';
    }

    Label({
      text: score_01,
      fontSize: 42,
      fill: 'crimson',
    }).addChildTo(this).setPosition(SCREEN_X/2, 100);
    Label({
      text: score_02,
      fontSize: 20,
      fill: 'darkslategray',
    }).addChildTo(this).setPosition(SCREEN_X/2, 200);
    Label({
      text: score_03,
      fontSize: 36,
      fill: 'white',
    }).addChildTo(this).setPosition(SCREEN_X/2, 350);

    Label({
      text: "TOUCH CONTINUE !",
      fontSize: 42,
      fill: 'crimson'
    }).addChildTo(this)
      .setPosition(SCREEN_X/2, 500)
      .tweener.fadeOut(1000).fadeIn(500).setLoop(true).play();
    this.on('pointend', function() {
      this.exit();
    });
  },
});


phina.define('MainScene', {
  superClass: 'DisplayScene',
  
  init: function(option) {
    this.superInit(option);
    this.bg = Sprite("bg").addChildTo(this);
    this.bg.origin.set(0, 0);
    this.bg.width = SCREEN_X;
    this.bg.height = SCREEN_Y;
//    this.backgroundColor = '#ffaaaa';
    END_flag = " ";

    ROOM = room[counter];
    if(counter >= max_rooms) {
	counter = 0;
	this.exit();
    }
    counter = counter + 1;
    BL_counter = 0;
    this.wall_0Group = DisplayElement().addChildTo(this);
    this.wall_1Group = DisplayElement().addChildTo(this);

    for (i=0; i<ROOM.length; i++) {
	temp[i] = [];
	for (j=0; j<ROOM[i].length; j++) {
	    temp[i][j] = ROOM[i].substr(j,1);
	    if(ROOM[i].substr(j,1) == "P") { 
		var ii = i;
		var jj = j;
	    }
	    else if(ROOM[i].substr(j,1) == "A") { 
		this.again = Again().addChildTo(this).setScale(scale);
		this.again.setPosition( j * P_size + P_size/2, i * P_size + P_size/2); 
	    }
	    else if(ROOM[i].substr(j,1) == "G") { 
		var goal = Goal().addChildTo(this).setOrigin(0.0, 0.0).setScale(scale);
		goal.setPosition( j * P_size, i * P_size); 
	    }
	    else if(ROOM[i].substr(j,1) == "B") { 
		BLOCK[BL_counter] = Block().addChildTo(this).setOrigin(0.0, 0.0).setScale(scale);
		BLOCK[BL_counter].setPosition( j * P_size, i * P_size); 
		BL_counter = BL_counter + 1;
	    }
	    else if(ROOM[i].substr(j,1) == "w") { 
		var wall_0 = Wall_0().addChildTo(this.wall_0Group).setOrigin(0.0, 0.0).setScale(scale); 
		wall_0.setPosition( j * P_size, i * P_size); 
	    }
	    else if(ROOM[i].substr(j,1) == "W") { 
		var wall_1 = Wall_1().addChildTo(this.wall_1Group).setOrigin(0.0, 0.0).setScale(scale); 
		wall_1.setPosition( j * P_size, i * P_size); 
	    }
	}
    }
// playerを最前面に表示させるため、記述位置変更
    this.player = Sprite('Player', 48, 48).addChildTo(this).setOrigin(0.0, 0.0).setScale(scale);
    this.player.frameIndex = 0;
    this.player.setPosition( jj * P_size, ii * P_size); 

    for (i=0; i<temp[0].length; i++) {
	pos[i] = [];
	for (j=0; j<temp.length; j++) {
		pos[i][j] = temp[j][i];
	}
    }
  },
  
  update: function(app) {
    var keyboard = app.keyboard;
    var touch_p = app.pointer;
    var anim_p = FrameAnimation('Player_ss').attachTo(this.player);
    var player = this.player;
    var again = this.again;
    var BL_temp = 0;
    var p_x = Math.floor(player.x / P_size);
    var p_y = Math.floor(player.y / P_size);
    var px = Math.round(player.x / P_size);
    var py = Math.round(player.y / P_size);
    var tx = Math.floor(touch_p.x / P_size);
    var ty = Math.floor(touch_p.y / P_size);
    if (p_x < 0) { p_x = 0; }
    if (p_y < 0) { p_y = 0; }
    if(pos[p_x][p_y] == "G") {
	END_falg = "Goal !";
	this.nextLabel ="title";
	this.exit();
    }
    again.setInteractive(true);
    again.onpointstart = function () {
	END_flag = "Again !";
    }
    if(END_flag == "Again !") {
	this.nextLabel ="title";
	this.exit();
    }

	if (keyboard.getKey('left') || (touch_p.getPointing() && (p_x > tx))) {
	    flag = "left";
	} else if (keyboard.getKey('right') || (touch_p.getPointing() && (p_x < tx))) {
	    flag = "right";
	} else if (keyboard.getKey('up') || (touch_p.getPointing() && (p_y > ty))) {
	    flag = "up";
	} else if (keyboard.getKey('down') || (touch_p.getPointing() && (p_y < ty))) {
	    flag = "down";
	} else {
	    if(touch_p.getPointing() && (player.x > touch_p.x - P_size/2)) {
		flag = "left";
	    } else if(touch_p.getPointing() && (player.y > touch_p.y - P_size/2)) {
		flag = "up";
	    } else {
		flag = "stay";
	    }
	}

	if (flag == "left") {
	    player.x -= Step;
	    if(app.frame % F_rate === 0) {
		player.frameIndex = (player.frameIndex === 3) ? 5:3;
	    }
	    if((pos[px - 1][py] == "W") || pos[px - 1][py] == "w") {
		if(player.x < px * P_size + Step) {
		    player.x = px * P_size;
		}
	    } else if(pos[px - 1][py] == "B") {
		for(i=0; i<BL_counter; i++) {
		    if((Math.round(BLOCK[i].x / P_size) == (px - 1)) && (Math.round(BLOCK[i].y / P_size) == py)) {
			BL_temp = i;
			BL_x = BLOCK[i].x;
			BL_y = BLOCK[i].y;
		    }
		}
		if(pos[px - 2][py] == "F") {
		    if(player.x < BL_x + P_size + Step) {
			BLOCK[BL_temp].x = (px - 2) * P_size;
			if(pos[px][py] == "P") {pos[px][py] = "F";}
			if(pos[px - 1][py] == "B") {pos[px - 1][py] = "P";}
			if(pos[px - 2][py] == "F") {pos[px - 2][py] = "B";}
		    }
		} else {
		    if(player.x <= BL_x + P_size - Step) {
			player.x = px * P_size;
			if(pos[px][py] == "F") {pos[px][py] = "P";}
		    }
		}
	    } else if(pos[px - 1][py] != "G") {
		if(pos[px][py] == "F") {pos[px][py] = "P";}
	    }
	    if(pos[px + 1][py - 1] == "P") {pos[px + 1][py - 1] = "F";}
	    if(pos[px + 1][py] == "P") {pos[px + 1][py] ="F";}
	    if(pos[px + 1][py + 1] == "P") {pos[px + 1][py + 1] = "F";}
	} else if (flag == "right") {
	    player.x += Step;
	    if(app.frame % F_rate === 0) {
		player.frameIndex = (player.frameIndex === 6) ? 8:6;
	    }
	    if((pos[px + 1][py] == "W") || pos[px + 1][py] == "w") {
		if(player.x > px * P_size - Step) {
		    player.x = px * P_size;
		}
	    } else if(pos[px + 1][py] == "B") {
		for(i=0; i<BL_counter; i++) {
		    if((Math.round(BLOCK[i].x / P_size) == (px + 1)) && (Math.round(BLOCK[i].y / P_size) == py)) {
			BL_temp = i;
			BL_x = BLOCK[i].x;
			BL_y = BLOCK[i].y;
		    }
		}
		if(pos[px + 2][py] == "F") {
		    if(player.x > BL_x - P_size - Step) {
			BLOCK[BL_temp].x = (px + 2) * P_size;
			if(pos[px][py] == "P") {pos[px][py] = "F";}
			if(pos[px + 1][py] == "B") {pos[px + 1][py] = "P";}
			if(pos[px + 2][py] == "F") {pos[px + 2][py] = "B";}
		    }
		} else {
		    if(player.x >= BL_x - P_size + Step) {
			player.x = px * P_size;
			if(pos[px][py] == "F") {pos[px][py] = "P";}
		    }
		}
	    } else if(pos[px + 1][py] != "G") {
		if(pos[px][py] == "F") {pos[px][py] = "P";}
	    }
	    if(pos[px - 1][py - 1] == "P") {pos[px - 1][py - 1] = "F";}
	    if(pos[px - 1][py] == "P") {pos[px - 1][py] = "F";}
	    if(pos[px - 1][py + 1] == "P") {pos[px - 1][py + 1] = "F";}
	} else if (flag == "up") {
	    player.y -= Step;
	    if(app.frame % F_rate === 0) {
		player.frameIndex = (player.frameIndex === 9) ? 11:9;
	    }
	    if((pos[px][py - 1] == "W") || pos[px][py - 1] == "w") {
		if(player.y < py * P_size + Step) {
		    player.y = py * P_size;
		}
	    } else if(pos[px][py - 1] == "B") {
		for(i=0; i<BL_counter; i++) {
		    if((Math.round(BLOCK[i].x / P_size) == px) && (Math.round(BLOCK[i].y / P_size) == (py - 1))) {
			BL_temp = i;
			BL_x = BLOCK[i].x;
			BL_y = BLOCK[i].y;
		    }
		}
		if(pos[px][py - 2] == "F") {
		    if(player.y < BL_y + P_size + Step) {
			BLOCK[BL_temp].y = (py - 2) * P_size;
			if(pos[px][py] = "P") {pos[px][py] = "F";}
			if(pos[px][py - 1] = "B") {pos[px][py - 1] = "P";}
			if(pos[px][py - 2] = "F") {pos[px][py - 2] = "B";}
		    }
		} else {
		    if(player.y <= BL_y + P_size - Step) {
			player.y = py * P_size;
			if(pos[px][py] == "F") {pos[px][py] = "P";}
		    }
		}
	    } else if(pos[px][py - 1] != "G") {
		if(pos[px][py] == "F") {pos[px][py] = "P";}
	    }
	    if(pos[px - 1][py + 1] == "P") {pos[px - 1][py + 1] = "F";}
	    if(pos[px][py + 1] == "P") {pos[px][py + 1] = "F";}
	    if(pos[px + 1][py + 1] == "P") {pos[px + 1][py + 1] = "F";}
	} else if (flag == "down") {
	    player.y += Step;
	    if(app.frame % F_rate === 0) {
		player.frameIndex = (player.frameIndex === 0) ? 2:0;
	    }
	    if((pos[px][py + 1] == "W") || pos[px][py + 1] == "w") {
		if(player.y > py * P_size - Step) {
		    player.y = py * P_size;
		}
	    } else if(pos[px][py + 1] == "B") {
		for(i=0; i<BL_counter; i++) {
		    if((Math.round(BLOCK[i].x / P_size) == px) && (Math.round(BLOCK[i].y / P_size) == (py + 1))) {
			BL_temp = i;
			BL_x = BLOCK[i].x;
			BL_y = BLOCK[i].y;
		    }
		}
		if(pos[px][py + 2] == "F") {
		    if(player.y > BL_y - P_size - Step) {
			BLOCK[BL_temp].y = (py + 2) * P_size;
			if(pos[px][py] == "P") {pos[px][py] = "F";}
			if(pos[px][py + 1] == "B") {pos[px][py + 1] = "P";}
			if(pos[px][py + 2] == "F") {pos[px][py + 2] = "B";}
		    }
		} else {
		    if(player.y >= BL_y - P_size + Step) {
			player.y = py * P_size;
			if(pos[px][py] == "F") {pos[px][py] = "P";}
		    }
		}
	    } else if(pos[px][py + 1] != "G") {
		if(pos[px][py] == "F") {pos[px][py] = "P";}
	    }
	    if(pos[px - 1][py - 1] == "P") {pos[px - 1][py - 1] = "F";}
	    if(pos[px][py - 1] == "P") {pos[px][py - 1] = "F";}
	    if(pos[px + 1][py - 1] == "P") {pos[px + 1][py - 1] = "F";}
	}
	else {
//	    this.player.frameIndex = 0;
	}

  }
});


phina.define('Again', {
  superClass: 'Sprite',

  init: function(index) {
    this.superInit('again');
  },
});

phina.define('Goal', {
  superClass: 'Sprite',

  init: function(index) {
    this.superInit('goal');
  },
});

phina.define('Block', {
  superClass: 'Sprite',

  init: function(index) {
    this.superInit('block');
  },
});

phina.define('Wall_0', {
  superClass: 'Sprite',

  init: function(index) {
    this.superInit('wall_0');
  },
});

phina.define('Wall_1', {
  superClass: 'Sprite',

  init: function(index) {
    this.superInit('wall_1');
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
