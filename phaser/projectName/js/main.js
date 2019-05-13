let style = { font: '24px Helvetica', fill: '#FFF' };
//define the game
var game = new Phaser.Game(1440, 900, Phaser.AUTO, 'phaser');

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
		game.load.image('player', 'assets/img/Player_A.png');
		game.load.image('box', 'assets/img/Box.png');
		game.load.image('platform', 'assets/img/platform.png');
		game.load.image('vplatform', 'assets/img/vplatform.png');
		game.load.image('temp', 'assets/img/temp.png');
		game.load.spritesheet('test', 'assets/map/test.png', 32, 32);
		game.load.atlas('switches', 'assets/img/switches.png', 'assets/img/switches.json');
		game.load.atlas('lever', 'assets/img/lever.png', 'assets/img/lever.json');
	},
	create: function()
	{

	},
	update: function()
	{
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			game.state.start('joy3', true, false, this.level);
		}
	}
}

//define GamePlay state
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
		game.stage.setBackgroundColor('#FFFF00');


		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.map = game.add.tilemap('tutorial1');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		this.mapLayer.resizeWorld();

		game.physics.p2.convertTilemap(this.map, this.maplayer);
		game.physics.p2.setBoundsToWorld(true, true, true, true, false);

		this.player = new player(game, 'player', 0, 50, 650);
		game.add.existing(this.player);
		

		
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);
	},
	render: function()
	{
		game.debug.body(this.player);
	}
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
		game.stage.setBackgroundColor('#FFFF00');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('tutorial2');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 150, 450);
		game.add.existing(this.player);
		
		this.lever = new lever(game, 'lever', 0, 48, 480);
		game.add.existing(this.lever);
		
		this.platform1 = new platform(game, 'platform', 0, 192, 512);
		game.add.existing(this.platform1);
		
		this.platform2 = new platform(game, 'platform', 0, 960, 512);
		game.add.existing(this.platform2);
		
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.player, this.platform1);
		game.physics.arcade.collide(this.player, this.platform2); 
		if(this.lever.update(game.physics.arcade.overlap(this.player, this.lever)) == true)
		{
			this.platform1.update(true, 448, 512);
			this.platform2.update(true, 704, 512);		
		}
	},
	
	render: function()
	{
		game.debug.body(this.player);
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
		game.stage.setBackgroundColor('#FFFF00');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('tutorial3');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 150, 650);
		game.add.existing(this.player);

		
		this.box1 = new box(game, 'box', 0, 250, 672);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 650, 416);
		game.add.existing(this.box2);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.mapLayer);
		game.physics.arcade.collide(this.box2, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.box2);
		this.box1.update(game.physics.arcade.collide(this.player, this.box1));
		this.box2.update(game.physics.arcade.collide(this.player, this.box2));

		
	}
}

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
		game.stage.setBackgroundColor('#FFFF00');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('joy1');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 150, 650);
		game.add.existing(this.player);

		
		this.box1 = new box(game, 'box', 0, 512, 448);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 1152, 128);
		game.add.existing(this.box2);
		
		this.lever = new lever(game, 'lever', 0, 1344, 224);
		game.add.existing(this.lever);
		
		this.platform = new platform(game, 'platform', 0, 896, 256);
		game.add.existing(this.platform);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.mapLayer);
		game.physics.arcade.collide(this.box2, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.box2);
		game.physics.arcade.collide(this.player, this.platform);
		game.physics.arcade.collide(this.box1, this.platform);
		game.physics.arcade.collide(this.box2, this.platform);
		this.box1.update(game.physics.arcade.collide(this.player, this.box1));
		this.box2.update(game.physics.arcade.collide(this.player, this.box2));
		
		if(this.lever.update(game.physics.arcade.overlap(this.player, this.lever)) == true)
		{
			this.platform.update(true, 1088, 256);	
		}

		
	}
}

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
		game.stage.setBackgroundColor('#FFFF00');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('joy2');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 120, 450);
		game.add.existing(this.player);

		this.box1 = new box(game, 'box', 0, 640, 576);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 640, 256);
		game.add.existing(this.box2);
		
		this.box3 = new box(game, 'box', 0, 1184, 96);
		game.add.existing(this.box3);
		
		this.lever1 = new lever(game, 'lever', 0, 64, 640);
		game.add.existing(this.lever1);
		
		this.lever2 = new lever(game, 'lever', 0, 1344, 192);
		game.add.existing(this.lever2);
		
		this.platform1 = new platform(game, 'vplatform', 0, 416, 576);
		game.add.existing(this.platform1);
		
		this.platform2 = new platform(game, 'platform', 0, 992, 224);
		game.add.existing(this.platform2);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);

		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.mapLayer);
		game.physics.arcade.collide(this.box2, this.mapLayer);
		game.physics.arcade.collide(this.box3, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.box2);
		game.physics.arcade.collide(this.box1, this.box3);
		game.physics.arcade.collide(this.box2, this.box3);
		game.physics.arcade.collide(this.player, this.platform1);
		game.physics.arcade.collide(this.player, this.platform2);
		game.physics.arcade.collide(this.box1, this.platform1);
		game.physics.arcade.collide(this.box2, this.platform1);
		game.physics.arcade.collide(this.box3, this.platform1);
		game.physics.arcade.collide(this.box1, this.platform2);
		game.physics.arcade.collide(this.box2, this.platform2);
		game.physics.arcade.collide(this.box3, this.platform2);
		this.box1.update(game.physics.arcade.collide(this.player, this.box1));
		this.box2.update(game.physics.arcade.collide(this.player, this.box2));
		this.box2.update(game.physics.arcade.collide(this.player, this.box3));
		
		if(this.lever1.update(game.physics.arcade.overlap(this.player, this.lever1)) == true)
		{
			this.platform1.update(true, 416, 704);	
		}
		
		if(this.lever2.update(game.physics.arcade.overlap(this.player, this.lever2)) == true)
		{
			this.platform2.update(true, 1152, 224);	
		}
	}
}

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
		game.stage.setBackgroundColor('#FFFF00');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('joy3');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 120, 450);
		game.add.existing(this.player);

		this.box1 = new box(game, 'box', 0, 704, 32);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 896, 32);
		game.add.existing(this.box2);
		
		this.box3 = new box(game, 'box', 0, 1088, 32);
		game.add.existing(this.box3);
		
		this.box4 = new box(game, 'box', 0, 160, 32);
		game.add.existing(this.box4);
		
		this.greens = new lever(game, 'lever', 0, 64, 256);
		game.add.existing(this.greens);
		
		this.blues = new lever(game, 'lever', 0, 1216, 704);
		game.add.existing(this.blues);
		
		this.reds = new lever(game, 'lever', 0, 448, 448);
		game.add.existing(this.reds);
		
		this.blue1 = new platform(game, 'temp', 0, 704, 160);
		game.add.existing(this.blue1);
		
		this.red1 = new platform(game, 'temp', 0, 896, 160);
		game.add.existing(this.red1);
		
		this.green1 = new platform(game, 'temp', 0, 1088, 160);
		game.add.existing(this.green1);
		
		this.red2 = new platform(game, 'temp', 0, 160, 160);
		game.add.existing(this.red2);
		
		this.blue2 = new platform(game, 'platform', 0, 320, 544);
		game.add.existing(this.blue2);

	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);

		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.mapLayer);
		game.physics.arcade.collide(this.box2, this.mapLayer);
		game.physics.arcade.collide(this.box3, this.mapLayer);
		game.physics.arcade.collide(this.box4, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.box2);
		game.physics.arcade.collide(this.box1, this.box3);
		game.physics.arcade.collide(this.box1, this.box4);
		game.physics.arcade.collide(this.box2, this.box3);
		game.physics.arcade.collide(this.box2, this.box4);
		game.physics.arcade.collide(this.box3, this.box4);
		
		game.physics.arcade.collide(this.box4, this.red2);
		game.physics.arcade.collide(this.box1, this.blue1);
		game.physics.arcade.collide(this.box2, this.red1);
		game.physics.arcade.collide(this.box3, this.green1);
		game.physics.arcade.collide(this.box4, this.blue2);
		
		game.physics.arcade.collide(this.player, this.blue2);
		

		this.box1.update(game.physics.arcade.collide(this.player, this.box1));
		this.box2.update(game.physics.arcade.collide(this.player, this.box2));
		this.box2.update(game.physics.arcade.collide(this.player, this.box3));
		this.box2.update(game.physics.arcade.collide(this.player, this.box4));
		
		if(this.greens.update(game.physics.arcade.overlap(this.player, this.greens)) == true)
		{
			this.green1.kill();
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
	}
}

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
//accepting a score argument for showing the result to player
var GameOver = function(game, gamescore) {};
GameOver.prototype = 
{
	init: function(gamescore) 
	{
		this.state = 'GameOver';
	},
	preload: function()
	{

	},
	create: function() 
	{

	},
	update: function()
	{
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			//restart the game
			game.state.start('GamePlay', true, false, this.level);
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