//github
//https://github.com/wendellip/120/tree/first-prototype

//Group 23:
//Brenden Satake
//Wendell Ip
//Casey Moropoulos

let style = { font: '24px Helvetica', fill: '#FFF' };
//define the game
var game = new Phaser.Game(1440, 900, Phaser.AUTO, 'phaser');
var newhand;
var shotsfired;
//define MainMenu state
var MainMenu = function(game) {};
MainMenu.prototype = 
{
	init: function() 
	{
		this.state = 'Menu';
	},
	//load all the assets before gameplay
	preload: function()
	{
		game.load.tilemap('tutorial1', 'assets/map/tutorial1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('tutorial2', 'assets/map/tutorial2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('tutorial3', 'assets/map/tutorial3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('tutorial4', 'assets/map/tutorial4.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('joy1', 'assets/map/joy1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('joy2', 'assets/map/joy2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('joy3', 'assets/map/joy3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('fear1', 'assets/map/fear1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('fear2', 'assets/map/fear2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('player', 'assets/img/Snowball.png');
		game.load.image('box', 'assets/img/Box.png');
		game.load.image('platform', 'assets/img/platform.png');
		game.load.image('vplatform', 'assets/img/vplatform.png');
		game.load.image('bplatform', 'assets/img/bplatform.png');
		game.load.image('bvplatform', 'assets/img/bvplatform.png');
		game.load.image('rplatform', 'assets/img/rplatform.png');
		game.load.image('rvplatform', 'assets/img/rvplatform.png');
		game.load.image('yplatform', 'assets/img/yplatform.png');
		game.load.image('yvplatform', 'assets/img/yvplatform.png');
		game.load.image('temp', 'assets/img/temp.png');
		game.load.image('btemp', 'assets/img/btemp.png');
		game.load.image('rtemp', 'assets/img/rtemp.png');
		game.load.image('ytemp', 'assets/img/ytemp.png');
		game.load.image('door', 'assets/img/door.png');
		game.load.image('hand', 'assets/img/HandPlaceholder.jpg');
		game.load.spritesheet('test', 'assets/map/test.png', 32, 32);
		game.load.atlas('switches', 'assets/img/switches.png', 'assets/img/switches.json');
		game.load.atlas('lever', 'assets/img/lever.png', 'assets/img/lever.json');
		game.load.atlas('blever', 'assets/img/blever.png', 'assets/img/lever.json');
		game.load.atlas('rlever', 'assets/img/rlever.png', 'assets/img/lever.json');
		game.load.atlas('ylever', 'assets/img/ylever.png', 'assets/img/lever.json');
		game.load.audio('jump', 'assets/audio/jump.mp3');
	},
	create: function()
	{
		// for picking up arm.
		newhand=new hand2(game, 'hand', 0, -50, -50);
		//instructions
		game.add.text(20, 20, "Arrow key moving and Up arrow for jumping\n" + 
		"mouse for aiming and shooting arm\n" + "Press C to interact with lever\n" + "Press Spacebar to start", style);
	},
	update: function()
	{
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			game.state.start('tutorial2', true, false, this.level);
		}
	}
}

//define tutorial1 state
var tutorial1 = function(game) {};
tutorial1.prototype = 
{
	init: function()
	{
		this.state = 'tutorial1';
	},
	preload: function()
	{
		
	},

	create: function()
	{
		game.stage.setBackgroundColor('#9ebeff');

		game.physics.startSystem(Phaser.Physics.P2JS);

		//load tilemap
		this.map = game.add.tilemap('tutorial1');
		this.map.addTilesetImage('test', 'test');
		//all tiles have collation
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);

		//make a player character
		this.player = new player(game, 'player', 0, 100, 600, 'jump');
		game.add.existing(this.player);
		
		//add stage end point
		this.door = new exitdoor(game, 'door', 0, 1280, 64);
		game.add.existing(this.door);
		
		game.physics.p2.restitution = 0.5;
		game.physics.p2.gravity.y = 300;
	},

	update: function()
	{
		this.player.update(this.player);
		//enable restarting stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R))
		{
			game.state.restart(true, false);
		}
	},

}

var tutorial2 = function(game) {};
tutorial2.prototype = 
{
	init: function()
	{
		this.state = 'tutorial2';
	},
	preload: function()
	{
		console.log('tutorial2');
	},

	create: function()
	{
		game.stage.setBackgroundColor('#9ebeff');
		
		game.physics.startSystem(Phaser.Physics.P2JS);

		//load tilemap
		this.map = game.add.tilemap('tutorial2');
		this.map.addTilesetImage('test', 'test');
		//all tiles have collation
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 150, 450, 'jump');
		game.add.existing(this.player);
		
		this.switch1 = new onswitch(game, 'switches', 0, 1200, 464, 0);
		game.add.existing(this.switch1);
		
		//create moving platform
		this.platform1 = new platform(game, 'platform', 0, 192, 512);
		game.add.existing(this.platform1);
		
		this.platform2 = new platform(game, 'platform', 0, 960, 512);
		game.add.existing(this.platform2);
		
		this.hand = new hand(game, 'hand', 0, 50, 50);
		this.player.addChild(game.add.existing(this.hand));
		
		this.platforms = [this.platform1, this.platform2];
		
		this.door = new exitdoor(game, 'door', 0, 1248, 224);
		game.add.existing(this.door);
		
		game.physics.p2.restitution = 0.5;
		game.physics.p2.gravity.y = 300;
	},

	update: function()
	{
		this.player.update(this.player);
		var projected = this.hand.update(this.player);
		if(projected != undefined)
			game.add.existing(projected);

		
		//enable picking the arm back
		if(newhand.update(game.physics.arcade.overlap(this.player, newhand))){
		this.hand = new hand(game, 'hand', 0, 50,50);
		this.player.addChild(game.add.existing(this.hand));
		newhand.destroy();
		shotsfired-=1;
		}
		/*
		//switch interacting with arm or player body
		//to move the platform
		if(this.switch1.update(game.physics.arcade.overlap(this.player, this.switch1)))
		{
			this.platform1.update(true, 448, 512);
			this.platform2.update(true, 704, 512);		
		}
		if(this.switch1.update(game.physics.arcade.overlap(newhand, this.switch1)))
		{
			this.platform1.update(true, 448, 512);
			this.platform2.update(true, 704, 512);		
		}*/
		if(game.input.keyboard.isDown(Phaser.Keyboard.R))
		{
			game.state.restart(true, false);
		}
	}
}

var tutorial3 = function(game) {};
tutorial3.prototype = 
{
	init: function()
	{
		this.state = 'tutorial3';
	},
	preload: function()
	{
		console.log('tutorial3');
	},

	create: function()
	{

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('tutorial3');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 150, 650, 'jump');
		game.add.existing(this.player);

		//making boxes for pushing
		this.box1 = new box(game, 'box', 0, 250, 672);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 650, 416);
		game.add.existing(this.box2);
		
		this.boxes = [this.box1, this.box2];
		
		this.door = new exitdoor(game, 'door', 0, 1184, 128);
		game.add.existing(this.door);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.boxes, this.mapLayer);
		game.physics.arcade.collide(this.boxes, this.boxes);
		this.box1.update(game.physics.arcade.collide(this.player, this.box1));
		this.box2.update(game.physics.arcade.collide(this.player, this.box2));

		// player can interact with boxes
		if(game.input.keyboard.isDown(Phaser.Keyboard.R))
		{
			game.state.restart(true, false);
		}
		if(game.physics.arcade.overlap(this.player, this.door))
		{
			game.state.start('joy1');
		}
	}
}

//not included in first prototype
var tutorial4 = function(game) {};
tutorial4.prototype = 
{
	init: function()
	{
		this.state = 'tutorial4';
	},
	preload: function()
	{
		console.log('tutorial4');
	},

	create: function()
	{
		game.stage.setBackgroundColor('#FFFF00');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('tutorial4');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		

	},

	update: function()
	{

	
	}
}

//code same as tutorial
var joy1 = function(game) {};
joy1.prototype = 
{
	init: function()
	{
		this.state = 'joy1';
	},
	preload: function()
	{
		console.log('joy1');
	},

	create: function()
	{

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('joy1');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 150, 650, 'jump');
		game.add.existing(this.player);
		
		this.box1 = new box(game, 'box', 0, 512, 448);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 1152, 128);
		game.add.existing(this.box2);
		
		this.boxes = [this.box1, this.box2];
		
		this.lever = new lever(game, 'rlever', 0, 1344, 224);
		game.add.existing(this.lever);
		
		this.platform = new platform(game, 'rplatform', 0, 896, 256);
		game.add.existing(this.platform);
		
		this.door = new exitdoor(game, 'door', 0, 1280, 288);
		game.add.existing(this.door);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.boxes, this.mapLayer);
		game.physics.arcade.collide(this.boxes, this.boxes);
		game.physics.arcade.collide(this.player, this.platform);
		game.physics.arcade.collide(this.boxes, this.platform);
		
		this.box1.update(game.physics.arcade.collide(this.player, this.box1));
		this.box2.update(game.physics.arcade.collide(this.player, this.box2));
		
		if(this.lever.update(game.physics.arcade.overlap(this.player, this.lever)) == true)
		{
			this.platform.update(true, 1088, 256);	
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.R))
		{
			game.state.restart(true, false);
		}
		if(game.physics.arcade.overlap(this.player, this.door))
		{
			game.state.start('joy2');
		}
	}
}

//code same as tutorial
var joy2 = function(game) {};
joy2.prototype = 
{
	init: function()
	{
		this.state = 'joy2';
	},
	preload: function()
	{
		console.log('joy2');
	},

	create: function()
	{

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('joy2');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 120, 450, 'jump');
		game.add.existing(this.player);

		this.box1 = new box(game, 'box', 0, 640, 576);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 640, 256);
		game.add.existing(this.box2);
		
		this.box3 = new box(game, 'box', 0, 1184, 96);
		game.add.existing(this.box3);
		
		this.boxes = [this.box1, this.box2, this.box3];
		
		this.reds = new lever(game, 'rlever', 0, 64, 640);
		game.add.existing(this.reds);
		
		this.blues = new lever(game, 'blever', 0, 1344, 192);
		game.add.existing(this.blues);
		
		this.red1 = new platform(game, 'rvplatform', 0, 416, 608);
		game.add.existing(this.red1);
		
		this.blue1 = new platform(game, 'bplatform', 0, 992, 224);
		game.add.existing(this.blue1);
		
		this.platforms = [this.red1, this.blue1];
		
		this.door = new exitdoor(game, 'door', 0, 1312, 224);
		game.add.existing(this.door);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);

		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.boxes, this.mapLayer);
		game.physics.arcade.collide(this.boxes, this.boxes);
		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.boxes, this.platforms);

		this.box1.update(game.physics.arcade.collide(this.player, this.box1));
		this.box2.update(game.physics.arcade.collide(this.player, this.box2));
		this.box2.update(game.physics.arcade.collide(this.player, this.box3));
		
		if(this.reds.update(game.physics.arcade.overlap(this.player, this.reds)) == true)
		{
			this.red1.update(true, 416, 704);	
		}
		
		if(this.blues.update(game.physics.arcade.overlap(this.player, this.blues)) == true)
		{
			this.blue1.update(true, 1152, 224);	
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.R))
		{
			game.state.restart(true, false);
		}
		if(game.physics.arcade.overlap(this.player, this.door))
		{
			game.state.start('joy3');
		}
	}
}

//code same as tutorial
var joy3 = function(game) {};
joy3.prototype = 
{
	init: function()
	{
		this.state = 'joy3';
	},
	preload: function()
	{
		console.log('joy3');
	},

	create: function()
	{
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('joy3');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 90, 420, 'jump');
		game.add.existing(this.player);

		this.box1 = new box(game, 'box', 0, 704, 32);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 896, 32);
		game.add.existing(this.box2);
		
		this.box3 = new box(game, 'box', 0, 1088, 32);
		game.add.existing(this.box3);
		
		this.box4 = new box(game, 'box', 0, 160, 32);
		game.add.existing(this.box4);
		
		this.boxes = [this.box1, this.box2, this.box3, this.box4];
		
		this.yellows = new lever(game, 'ylever', 0, 64, 256);
		game.add.existing(this.yellows);
		
		this.blues = new lever(game, 'blever', 0, 1216, 704);
		game.add.existing(this.blues);
		
		this.reds = new lever(game, 'rlever', 0, 448, 448);
		game.add.existing(this.reds);
		
		this.blue1 = new platform(game, 'btemp', 0, 704, 160);
		game.add.existing(this.blue1);
		
		this.red1 = new platform(game, 'rtemp', 0, 896, 160);
		game.add.existing(this.red1);
		
		this.yellow1 = new platform(game, 'ytemp', 0, 1088, 160);
		game.add.existing(this.yellow1);
		
		this.red2 = new platform(game, 'rtemp', 0, 160, 160);
		game.add.existing(this.red2);
		
		this.blue2 = new platform(game, 'bplatform', 0, 320, 544);
		game.add.existing(this.blue2);

		this.platforms = [this.blue1, this.red1, this.yellow1, this.red2, this.blue2];
		
		this.door = new exitdoor(game, 'door', 0, 1312, 192);
		game.add.existing(this.door);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);

		game.physics.arcade.collide(this.boxes, this.mapLayer);
		game.physics.arcade.collide(this.boxes, this.boxes);
		
		game.physics.arcade.collide(this.boxes, this.platforms);		
		game.physics.arcade.collide(this.player, this.platforms);
		

		this.box1.update(game.physics.arcade.collide(this.player, this.box1));
		this.box2.update(game.physics.arcade.collide(this.player, this.box2));
		this.box2.update(game.physics.arcade.collide(this.player, this.box3));
		this.box2.update(game.physics.arcade.collide(this.player, this.box4));
		
		if(this.yellows.update(game.physics.arcade.overlap(this.player, this.yellows)) == true)
		{
			this.yellow1.kill();
		}
		
		if(this.blues.update(game.physics.arcade.overlap(this.player, this.blues)) == true)
		{
			this.blue1.kill();
			this.blue2.update(true, 128, 544);
		}
		
		if(this.reds.update(game.physics.arcade.overlap(this.player, this.reds)) == true)
		{
			this.red1.kill();
			this.red2.kill();
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.R))
		{
			game.state.restart(true, false);
		}
		if(game.physics.arcade.overlap(this.player, this.door))
		{
			game.state.start('GameOver');
		}
	}
}

//not included in first prototype
var fear1 = function(game) {};
fear1.prototype = 
{
	init: function()
	{
		this.state = 'fear1';
	},
	preload: function()
	{
		console.log('fear1');
	},

	create: function()
	{
		game.stage.setBackgroundColor('#FFFF00');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('fear1');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		

	},

	update: function()
	{

	
	}
}

//not included in first prototype
var fear2 = function(game) {};
fear2.prototype = 
{
	init: function()
	{
		this.state = 'fear2';
	},
	preload: function()
	{
		console.log('fear2');
	},

	create: function()
	{
		game.stage.setBackgroundColor('#FFFF00');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('fear2');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		

	},

	update: function()
	{

	
	}
}

//define GameOver state
var GameOver = function(game,) {};
GameOver.prototype = 
{
	init: function() 
	{
		game.stage.setBackgroundColor('#000000');
		this.state = 'GameOver';
	},
	preload: function()
	{

	},
	create: function() 
	{
		game.add.text(20, 20, "Prototype ended\n" + 
		"Press Spacebar to restart\n", style);
	},
	update: function()
	{
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			//restart the game
			game.state.start('tutorial1', true, false, this.level);
		}
	}
}


game.state.add('MainMenu', MainMenu);
game.state.add('tutorial1', tutorial1);
game.state.add('tutorial2', tutorial2);
game.state.add('tutorial3', tutorial3);
game.state.add('tutorial4', tutorial4);
game.state.add('joy1', joy1);
game.state.add('joy2', joy2);
game.state.add('joy3', joy3);
game.state.add('fear1', fear1);
game.state.add('fear2', fear2);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');

function changepickup(){
	newhand.setHealth(2);
}