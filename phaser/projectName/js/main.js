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
		game.stage.setBackgroundColor('#9ebeff');
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
		
		//add stage end point
		this.control = true;
		game.physics.p2.gravity.y = 300;
	},

	update: function()
	{
		this.player.update(this.control);
			//enable restarting stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		if(this.door.checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('tutorial2');
		}
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
		
	},

	create: function()
	{
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		
		//load tilemap
		this.map = game.add.tilemap('tutorial2');
		this.map.addTilesetImage('test', 'test');
		//all tiles have collation
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.switch1 = new onswitch(game, 'switches', 0, 1200, 464, 0);
		game.add.existing(this.switch1);
		
		//create moving platform
		this.platform1 = new platform(game, 'platform', 0, 192, 512);
		game.add.existing(this.platform1);
		
		this.platform2 = new platform(game, 'platform', 0, 960, 512);
		game.add.existing(this.platform2);
		
		this.player = new player(game, 'player', 0, 150, 450, 'jump');
		game.add.existing(this.player);
		
		this.hand = new hand(game, 'hand', 0, 0, 0);
		this.player.addChild(game.add.existing(this.hand));
		
		this.platforms = [this.platform1, this.platform2];
		
		this.door = new exitdoor(game, 'door', 0, 1248, 224);
		game.add.existing(this.door);
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		this.projected = undefined;
		
		var playerCollisionGroup = game.physics.p2.createCollisionGroup();
		var handCollisionGroup = game.physics.p2.createCollisionGroup();
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);

	},

	update: function()
	{

		
		//enable picking the arm back
		/*if(newhand.update(game.physics.arcade.overlap(this.player, newhand)))
		{
		this.hand = new hand(game, 'hand', 0, 50,50);
		this.player.addChild(game.add.existing(this.hand));
		newhand.destroy();
		shotsfired-=1;
		}*/
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
		this.player.update(this.control);
		this.projected = this.hand.update(this.player);
		if(this.projected != undefined)
		{
			game.add.existing(this.projected);
		}
			//enable restarting stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		if(this.door.checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('tutorial2');
		}
	},
}

//define GameOver state
var GameOver = function(game) {};
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
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');