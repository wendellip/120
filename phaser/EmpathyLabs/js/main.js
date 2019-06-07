let style = { font: '24px Helvetica', fill: '#FFF' };
//define the game
var game = new Phaser.Game(1440, 900, Phaser.AUTO, 'phaser');
//define MainMenu state
var restart = function(statename)
{
	game.state.start(statename);
}

var checkoverlap = function(spriteA, spriteB)
{
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

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
		game.load.atlas('player', 'assets/img/player.png', 'assets/img/player.json');
		game.load.image('enemy', 'assets/img/enemy.png');
		game.load.image('Tbackground', 'assets/img/TutorialBackground.png');
		game.load.image('box', 'assets/img/Box.png');
		game.load.image('enplatform', 'assets/img/enplatform.png');
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
		game.load.spritesheet('joy', 'assets/map/joy.png', 32, 32);
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
			game.state.start('fear2', true, false, this.level);
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
		game.add.sprite(0, 0, 'Tbackground');
		
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
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
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
		game.add.sprite(0, 0, 'Tbackground');
		
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
		this.platform1 = new platform(game, 'platform', 0, 320, 528, 0);
		game.add.existing(this.platform1);
		
		this.platform2 = new platform(game, 'platform', 0, 1088, 528, 0);
		game.add.existing(this.platform2);
		
		this.player = new player(game, 'player', 0, 150, 450, 'jump');
		game.add.existing(this.player);
		
		this.door = new exitdoor(game, 'door', 0, 1248, 224);
		game.add.existing(this.door);
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		this.handstation = new handstation(game, 'hand', 0, 320, 440);
		game.add.existing(this.handstation);
		
		this.hand = undefined;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		
		this.switch1on = true;

	},

	update: function()
	{	
		//switch interacting with arm or player body
		//to move the platform
		if(this.switch1.onoff() && this.switch1on)
		{
			this.switch1on = false;
			this.platform1.moving(576, 528, 0);
			this.platform2.moving(832, 528, 0);		
		}
		this.player.update(this.control);
		if(checkoverlap(this.player.sprite(), this.handstation.sprite()))
		{
			if(this.hand == undefined)
			{
				this.hand = this.handstation.takearm();
				this.player.addChild(game.add.existing(this.hand));
			}
		}
		else if(game.input.activePointer.justReleased() && this.hand != undefined)
		{
			this.projected = this.hand.newhand(this.player);
			if(this.projected != undefined)
			{
				this.hand.destroy();
				game.add.existing(this.projected);
				this.hand = undefined;
				if(this.switch1.body != null)
					this.switch1.body.createBodyCallback(this.projected, this.switch1.hitted, this.switch1);
				
			}
		}
		if(this.hand != undefined)
			this.hand.update();
		//enable restarting stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('tutorial3');
		}
	},
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
		game.add.sprite(0, 0, 'Tbackground');
		
		game.physics.startSystem(Phaser.Physics.P2JS);

		this.map = game.add.tilemap('tutorial3');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 150, 650, 'jump');
		game.add.existing(this.player);

		//making boxes for pushing
		this.box1 = new box(game, 'box', 0, 250, 672);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 650, 416);
		game.add.existing(this.box2);
		
		this.door = new exitdoor(game, 'door', 0, 1184, 128);
		game.add.existing(this.door);
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		
	},

	update: function()
	{

		this.player.update(this.control);

		// player can interact with boxes
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}

		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('joy1');
		}

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
		game.add.sprite(0, 0, 'Tbackground');
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		this.map = game.add.tilemap('tutorial4');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 150, 650, 'jump');
		game.add.existing(this.player);

		this.platform1 = new platform(game, 'platform', 0, 672, 720, 0);
		game.add.existing(this.platform1);

		this.enwall1 = new platform(game, 'enplatform', 0, 304, 576, 0);
		game.add.existing(this.enwall1);
		
		this.enwall2 = new platform(game, 'enplatform', 0, 1136, 576, 0);
		game.add.existing(this.enwall2);
		
		this.enwall3 = new platform(game, 'enplatform', 0, 528, 864, 0);
		game.add.existing(this.enwall3);
		
		this.enwall4 = new platform(game, 'enplatform', 0, 816, 864, 0);
		game.add.existing(this.enwall4);

		this.enemy = new enemy(game, 'enemy', 0, 800, 640, true);
		game.add.existing(this.enemy);
		
		this.door = new exitdoor(game, 'door', 0, 1184, 420);
		game.add.existing(this.door);
		
		this.lever = new lever(game, 'rlever', 0, 272, 800);
		game.add.existing(this.lever);
		
		this.superenemy1 = new superenemy(game, 'enemy', 0, -100, 900);
		game.add.existing(this.superenemy1);
		
		this.superenemy2 = new superenemy(game, 'enemy', 0, 1440, 0);
		game.add.existing(this.superenemy2);
		
		this.superenemy3 = new superenemy(game, 'enemy', 0, -100, 0);
		game.add.existing(this.superenemy3);
		
		this.superenemy4 = new superenemy(game, 'enemy', 0, 1440, 900);
		game.add.existing(this.superenemy4);
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
	},

	update: function()
	{
		this.player.update(this.control);
		if(this.enemy.update(this.player, null))
		{
			this.superenemy1.foundplayer();
			this.superenemy2.foundplayer();
			this.superenemy3.foundplayer();
			this.superenemy4.foundplayer();
		}
		this.superenemy1.update(this.player);
		this.superenemy2.update(this.player);
		this.superenemy3.update(this.player);
		this.superenemy4.update(this.player);
		this.lever.playeroverlap(checkoverlap(this.player.sprite(), this.lever.sprite()))
		if(this.lever.update())
		{
			this.platform1.moving(928, 720, 0);
		}
		else
		{
			this.platform1.moving(672, 720, 0);
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		if(checkoverlap(this.enemy.sprite(), this.enwall1.sprite())
		|| checkoverlap(this.enemy.sprite(), this.enwall2.sprite())
		|| checkoverlap(this.enemy.sprite(), this.enwall3.sprite())
		|| checkoverlap(this.enemy.sprite(), this.enwall4.sprite()))
		{
			this.enemy.toggling();
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('fear1');
		}
		if(checkoverlap(this.player.sprite(), this.superenemy1.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy2.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy3.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy4.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.death()
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'tutorial4');
			}
		}
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
		game.add.sprite(0, 0, 'Tbackground');
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		this.platform1 = new platform(game, 'rplatform', 0, 960, 272, 0);
		game.add.existing(this.platform1);

		this.map = game.add.tilemap('joy1');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 150, 650, 'jump');
		game.add.existing(this.player);
		
		this.box1 = new box(game, 'box', 0, 512, 512);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 1152, 192);
		game.add.existing(this.box2);
		
		this.switch1 = new onswitch(game, 'switches', 0, 48, 96, Math.PI);
		game.add.existing(this.switch1);
		
		this.handstation = new handstation(game, 'hand', 0, 448, 768);
		game.add.existing(this.handstation);
		
		this.hand = undefined;
		
		this.door = new exitdoor(game, 'door', 0, 1280, 288);
		game.add.existing(this.door);
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		this.switch1on = true;
	},

	update: function()
	{
		this.player.update(this.control);
		
		if(this.switch1.onoff() && this.switch1on)
		{
			this.switch1on = false;
			this.platform1.destroy();
		}
		
		if(checkoverlap(this.player.sprite(), this.handstation.sprite()))
		{
			if(this.hand == undefined)
			{
				this.hand = this.handstation.takearm();
				this.player.addChild(game.add.existing(this.hand));
			}
		}
		else if(game.input.activePointer.justReleased() && this.hand != undefined)
		{
			this.projected = this.hand.newhand(this.player);
			if(this.projected != undefined)
			{
				this.hand.destroy();
				game.add.existing(this.projected);
				this.hand = undefined;
				if(this.switch1.body != null)
					this.switch1.body.createBodyCallback(this.projected, this.switch1.hitted, this.switch1);
				
			}
		}
		if(this.hand != undefined)
			this.hand.update();

		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		if(this.switch1on)
		{
			if(checkoverlap(this.box1.sprite(), this.platform1.sprite()))
			{
				this.box1.floating();
			}
			if(checkoverlap(this.box2.sprite(), this.platform1.sprite()))
			{
				this.box2.floating();
			}
		}

		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('joy2');
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

	},

	create: function()
	{
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		
		this.red1 = new platform(game, 'rvplatform', 0, 432, 736, 0);
		game.add.existing(this.red1);
		
		this.blue1 = new platform(game, 'bplatform', 0, 1120, 240, 0);
		game.add.existing(this.blue1);

		this.map = game.add.tilemap('joy2');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 120, 450, 'jump');
		game.add.existing(this.player);

		this.box1 = new box(game, 'box', 0, 640, 576);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 640, 256);
		game.add.existing(this.box2);
		
		this.box3 = new box(game, 'box', 0, 1184, 96);
		game.add.existing(this.box3);
		
		this.reds = new lever(game, 'rlever', 0, 64, 640);
		game.add.existing(this.reds);	

		this.blues = new lever(game, 'blever', 0, 1344, 192);
		game.add.existing(this.blues);	
		
		this.door = new exitdoor(game, 'door', 0, 1312, 256);
		game.add.existing(this.door);
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		
	},

	update: function()
	{
		this.player.update(this.control);
		this.blues.playeroverlap(checkoverlap(this.player.sprite(), this.blues.sprite()));
		if(this.blues.update())
		{
			this.blue1.moving(1280, 240, 0);
		}
		else
		{
			this.blue1.moving(1120, 240, 0);
		}
		this.reds.playeroverlap(checkoverlap(this.player.sprite(), this.reds.sprite()));
		if(this.reds.update())
		{
			this.red1.moving(432, 830, 0);
		}
		else
		{
			this.red1.moving(432, 736, 0);
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		if(checkoverlap(this.box1.sprite(), this.blue1.sprite()))
		{
			this.box1.floating();
		}
		if(checkoverlap(this.box2.sprite(), this.blue1.sprite()))
		{
			this.box2.floating();
		}
		if(checkoverlap(this.box3.sprite(), this.blue1.sprite()))
		{
			this.box3.floating();
		}

		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('joy3');
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
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		this.blue1 = new platform(game, 'btemp', 0, 784, 176, 0);
		game.add.existing(this.blue1);
		
		this.red1 = new platform(game, 'rtemp', 0, 976, 176, 0);
		game.add.existing(this.red1);
		
		this.yellow1 = new platform(game, 'ytemp', 0, 1168, 176, 0);
		game.add.existing(this.yellow1);
		
		this.red2 = new platform(game, 'rtemp', 0, 240, 192, 0);
		game.add.existing(this.red2);
		
		this.blue2 = new platform(game, 'bplatform', 0, 445, 560, 0);
		game.add.existing(this.blue2);

		this.map = game.add.tilemap('joy3');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 90, 420, 'jump');
		game.add.existing(this.player);

		this.box1 = new box(game, 'box', 0, 784, 96);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 976, 96);
		game.add.existing(this.box2);
		
		this.box3 = new box(game, 'box', 0, 1168, 96);
		game.add.existing(this.box3);
		
		this.box4 = new box(game, 'box', 0, 240, 96);
		game.add.existing(this.box4);
		
		this.yellows = new lever(game, 'ylever', 0, 64, 256);
		game.add.existing(this.yellows);
		
		this.blues = new lever(game, 'blever', 0, 1216, 704);
		game.add.existing(this.blues);
		
		this.reds = new lever(game, 'rlever', 0, 448, 448);
		game.add.existing(this.reds);
		
		this.door = new exitdoor(game, 'door', 0, 1312, 192);
		game.add.existing(this.door);
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		
		this.blueon = true;
		this.yellowon = true;
		this.redon = true;
	},

	update: function()
	{
		this.player.update(this.control);

		this.reds.playeroverlap(checkoverlap(this.player.sprite(), this.reds.sprite()));
		if(this.reds.update() && this.redon)
		{
			this.redon = false;
			this.red1.destroy();
			this.red2.destroy();
		}
		this.blues.playeroverlap(checkoverlap(this.player.sprite(), this.blues.sprite()));
		if(this.blues.update() && this.blueon)
		{
			this.blueon = false;
			this.blue1.destroy();
		}
		if(this.blues.update())
		{
			this.blue2.moving(256, 560, 0);
		}
		else
		{
			this.blue2.moving(445, 560, 0);
		}
		this.yellows.playeroverlap(checkoverlap(this.player.sprite(), this.yellows.sprite()));
		if(this.yellows.update() && this.yellowon)
		{
			this.yellowon = false;
			this.yellow1.destroy();
		}			

		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('tutorial4');
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
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		this.blue1 = new platform(game, 'btemp', 0, 1072, 336, 0);
		game.add.existing(this.blue1);

		this.map = game.add.tilemap('fear1');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 90, 672, 'jump');
		game.add.existing(this.player);
		
		this.enwall1 = new platform(game, 'enplatform', 0, 16, 768, 0);
		game.add.existing(this.enwall1);
		
		this.enwall2 = new platform(game, 'enplatform', 0, 720, 768, 0);
		game.add.existing(this.enwall2);
		
		this.enemy1 = new enemy(game, 'enemy', 0, 640, 800, false);
		game.add.existing(this.enemy1);
		
		this.enwall3 = new platform(game, 'enplatform', 0, 880, 448, 0);
		game.add.existing(this.enwall3);
		
		this.enwall4 = new platform(game, 'enplatform', 0, 1264, 448, 0);
		game.add.existing(this.enwall4);
		
		this.enemy2 = new enemy(game, 'enemy', 0, 992, 544, true);
		game.add.existing(this.enemy2);

		this.enwall5 = new platform(game, 'enplatform', 0, 368, 320, 0);
		game.add.existing(this.enwall5);
		
		this.enwall6 = new platform(game, 'enplatform', 0, 752, 320, 0);
		game.add.existing(this.enwall6);

		this.enemy3 = new enemy(game, 'enemy', 0, 480, 416, false);
		game.add.existing(this.enemy3);
		
		this.superenemy1 = new superenemy(game, 'enemy', 0, -100, 900);
		game.add.existing(this.superenemy1);
		
		this.superenemy2 = new superenemy(game, 'enemy', 0, 1440, 0);
		game.add.existing(this.superenemy2);
		
		this.superenemy3 = new superenemy(game, 'enemy', 0, -100, 0);
		game.add.existing(this.superenemy3);
		
		this.superenemy4 = new superenemy(game, 'enemy', 0, 1440, 900);
		game.add.existing(this.superenemy4);
		
		this.box1 = new box(game, 'box', 0, 1152, 256);
		game.add.existing(this.box1);
		
		this.boxes = [this.box1];
		
		this.switch1 = new onswitch(game, 'switches', 0, 48, 128, Math.PI);
		game.add.existing(this.switch1);
		
		this.door = new exitdoor(game, 'door', 0, 1328, 416);
		game.add.existing(this.door);
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		
		this.switch1on = true;

	},

	update: function()
	{
		this.player.update(this.control);

		if(checkoverlap(this.enemy1.sprite(), this.enwall1.sprite())
		|| checkoverlap(this.enemy1.sprite(), this.enwall2.sprite())
		|| checkoverlap(this.enemy1.sprite(), this.box1.sprite()))
		{
			this.enemy1.toggling();
		}
		if(checkoverlap(this.enemy2.sprite(), this.enwall3.sprite())
		|| checkoverlap(this.enemy2.sprite(), this.enwall4.sprite())
		|| checkoverlap(this.enemy2.sprite(), this.box1.sprite()))
		{
			this.enemy2.toggling();
		}
		if(checkoverlap(this.enemy3.sprite(), this.enwall5.sprite())
		|| checkoverlap(this.enemy3.sprite(), this.enwall6.sprite())
		|| checkoverlap(this.enemy3.sprite(), this.box1.sprite()))
		{
			this.enemy3.toggling();
		}
		
		if(this.switch1.onoff() && this.switch1on)
		{
			this.switch1on = false;
			this.blue1.destroy();		
		}

		if(this.enemy1.update(this.player, this.boxes) ||
		   this.enemy2.update(this.player, this.boxes) ||
		   this.enemy3.update(this.player, this.boxes))
		{
			this.superenemy1.foundplayer();
			this.superenemy2.foundplayer();
			this.superenemy3.foundplayer();
			this.superenemy4.foundplayer();
		}
		this.superenemy1.update(this.player);
		this.superenemy2.update(this.player);
		this.superenemy3.update(this.player);
		this.superenemy4.update(this.player);
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		if(checkoverlap(this.player.sprite(), this.superenemy1.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy2.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy3.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy4.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.death()
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'fear1');
			}
		}
		if(this.switch1on)
		{
			if(checkoverlap(this.box1.sprite(), this.blue1.sprite()))
			{
				this.box1.floating();
			}
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('fear2');
		}
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
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		this.map = game.add.tilemap('fear2');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 90, 672, 'jump');
		game.add.existing(this.player);
		
		this.door = new exitdoor(game, 'door', 0, 1328, 220);
		game.add.existing(this.door);
		
		this.enwall1 = new platform(game, 'vplatform', 0, 176, 896, 0);
		game.add.existing(this.enwall1);
		
		this.enwall2 = new platform(game, 'vplatform', 0, 720, 896, 0);
		game.add.existing(this.enwall2);
		
		this.enemy1 = new enemy(game, 'enemy', 0, 288, 832, true);
		game.add.existing(this.enemy1);
		
		this.enwall3 = new platform(game, 'vplatform', 0, 912, 896, 0);
		game.add.existing(this.enwall3);
		
		this.enwall4 = new platform(game, 'vplatform', 0, 1424, 896, 0);
		game.add.existing(this.enwall4);
		
		this.enemy2 = new enemy(game, 'enemy', 0, 1024, 832, true);
		game.add.existing(this.enemy2);
		
		this.enwall5 = new platform(game, 'vplatform', 0, 272, 544, 0);
		game.add.existing(this.enwall5);
		
		this.enwall6 = new platform(game, 'vplatform', 0, 1040, 544, 0);
		game.add.existing(this.enwall6);
		
		this.enemy3 = new enemy(game, 'enemy', 0, 448, 480, true);
		game.add.existing(this.enemy3);
		
		this.enwall7 = new platform(game, 'vplatform', 0, 16, 256, 0);
		game.add.existing(this.enwall7);
		
		this.enwall8 = new platform(game, 'vplatform', 0, 560, 256, 0);
		game.add.existing(this.enwall8);
		
		this.enemy4 = new enemy(game, 'enemy', 0, 160, 352, true);
		game.add.existing(this.enemy4);
		
		this.superenemy1 = new superenemy(game, 'enemy', 0, -100, 900);
		game.add.existing(this.superenemy1);
		
		this.superenemy2 = new superenemy(game, 'enemy', 0, 1440, 0);
		game.add.existing(this.superenemy2);
		
		this.superenemy3 = new superenemy(game, 'enemy', 0, -100, 0);
		game.add.existing(this.superenemy3);
		
		this.superenemy4 = new superenemy(game, 'enemy', 0, 1440, 900);
		game.add.existing(this.superenemy4);
		
		this.switch1 = new onswitch(game, 'switches', 0, 80, 560, Math.PI / 2);
		game.add.existing(this.switch1);

		this.blue1 = new platform(game, 'btemp', 0, 1168, 304, Math.PI / 2);
		game.add.existing(this.blue1);

		this.control = true;
		game.physics.p2.gravity.y = 300;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		
		this.switch1on = true;
		
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
	},

	update: function()
	{
		this.player.update(this.control);
		if(this.switch1.onoff() && this.switch1on)
		{
			this.switch1on = false;
			this.blue1.destroy();	
		}
		
		if(checkoverlap(this.enemy1.sprite(), this.enwall1.sprite())
		|| checkoverlap(this.enemy1.sprite(), this.enwall2.sprite()))
		{
			this.enemy1.toggling();
		}
		if(checkoverlap(this.enemy2.sprite(), this.enwall3.sprite())
		|| checkoverlap(this.enemy2.sprite(), this.enwall4.sprite()))
		{
			this.enemy2.toggling();
		}
		if(checkoverlap(this.enemy3.sprite(), this.enwall5.sprite())
		|| checkoverlap(this.enemy3.sprite(), this.enwall6.sprite()))
		{
			this.enemy3.toggling();
		}
		if(checkoverlap(this.enemy4.sprite(), this.enwall7.sprite())
		|| checkoverlap(this.enemy4.sprite(), this.enwall8.sprite()))
		{
			this.enemy4.toggling();
		}

		if(this.enemy1.update(this.player, null) ||
		   this.enemy2.update(this.player, null) ||
		   this.enemy3.update(this.player, null) ||
		   this.enemy4.update(this.player, null))
		{
			this.superenemy1.foundplayer();
			this.superenemy2.foundplayer();
			this.superenemy3.foundplayer();
			this.superenemy4.foundplayer();
		}
		this.superenemy1.update(this.player);
		this.superenemy2.update(this.player);
		this.superenemy3.update(this.player);
		this.superenemy4.update(this.player);
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		if(checkoverlap(this.player.sprite(), this.superenemy1.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy2.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy3.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy4.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.death()
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'fear2');
			}
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			this.control = false;
			game.state.start('fear2');
		}
	}
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
game.state.add('tutorial3', tutorial3);
game.state.add('tutorial4', tutorial4);
game.state.add('joy1', joy1);
game.state.add('joy2', joy2);
game.state.add('joy3', joy3);
game.state.add('fear1', fear1);
game.state.add('fear2', fear2);
//game.state.add('fear3', fear3);
//game.state.add('sad1', sad1);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');