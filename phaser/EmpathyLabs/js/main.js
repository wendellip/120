let style = { font: '24px Helvetica', fill: '#FFF' };
//define the game
var game = new Phaser.Game(1440, 900, Phaser.AUTO, 'phaser');
// a function restarting the stage
var restart = function(statename)
{
	game.state.start(statename);
}

var music;
var mutemusic= function(){
		game.sound.mute=true;
		}
var unmutemusic = function(){
	game.sound.mute=false;
}
var decidetomute = function(){
	if(game.sound.mute==true){
	unmutemusic();}
	else if (game.sound.mute!==true){
		mutemusic();
	}
}			
// a function for checking sprite overlapping
var checkoverlap = function(spriteA, spriteB)
{
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
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
		//tilemaps
		game.load.tilemap('tutorial1', 'assets/map/tutorial1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('tutorial2', 'assets/map/tutorial2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('tutorial3', 'assets/map/tutorial3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('tutorial4', 'assets/map/tutorial4.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('joy1', 'assets/map/joy1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('joy2', 'assets/map/joy2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('joy3', 'assets/map/joy3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('fear1', 'assets/map/fear1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('fear2', 'assets/map/fear2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('fear3', 'assets/map/fear3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('sad1', 'assets/map/sad1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('sad2', 'assets/map/sad2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('sad3', 'assets/map/sad3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('angerboss', 'assets/map/angerboss.json', null, Phaser.Tilemap.TILED_JSON);
		//character
		game.load.atlas('player', 'assets/img/player.png', 'assets/img/player.json');
		game.load.atlas('enemy', 'assets/img/enemy.png', 'assets/img/enemy.json');
		game.load.image('enemy', 'assets/img/enemy.png');
		game.load.atlas('boss', 'assets/img/enemy.png', 'assets/img/enemy.json');
		game.load.image('boss', 'assets/img/enemy.png');
		
		//background
		game.load.image('Tbackground', 'assets/img/TutorialBackground.png');
		
		//items
		game.load.image('box', 'assets/img/Box.png');
		game.load.image('missile', 'assets/img/missile.png');
		game.load.physics("missilephy", "assets/img/missile.json");
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
		game.load.atlas('door', 'assets/img/door.png', 'assets/img/door.json');
		game.load.image('door', 'assets/img/door.png');
		game.load.image('mutebutton', 'assets/img/mutebutton.png');
		game.load.image('hand', 'assets/img/hand.png');
		game.load.spritesheet('test', 'assets/map/test.png', 32, 32);
		game.load.spritesheet('joy', 'assets/map/joy.png', 32, 32);
		game.load.atlas('switches', 'assets/img/switches.png', 'assets/img/switches.json');
		game.load.atlas('lever', 'assets/img/lever.png', 'assets/img/lever.json');
		game.load.atlas('blever', 'assets/img/blever.png', 'assets/img/lever.json');
		game.load.atlas('rlever', 'assets/img/rlever.png', 'assets/img/lever.json');
		game.load.atlas('ylever', 'assets/img/ylever.png', 'assets/img/lever.json');
		game.load.audio('jump', 'assets/audio/jump.mp3');
		game.load.audio('joymusic', 'assets/Sound/Almost New.mp3');
		game.load.audio('LeverSound', 'assets/Sound/Button_Press_5-Marianne_Gagnon-1212299245.wav');
		game.load.audio('sadnessMusic', 'assets/Sound/LostTime.mp3');
		game.load.audio('enemyAlarm', 'assets/Sound/Fire_pager.mp3');
		game.load.audio('JumpThrusters', 'assets/Sound/JumpThrusters.wav');
		game.load.audio('FearAnger', 'assets/Sound/Obliteration.wav');
		game.load.audio('tutorialMusic', 'assets/Sound/Improbable.mp3');
		game.load.audio('thump', 'assets/Sound/WoodThump.wav');
		game.load.audio('whoosh', 'assets/Sound/Woosh.wav');
		game.load.audio('explosion', 'assets/Sound/explosion.wav');
		game.load.audio('staticSound', 'assets/Sound/static.wav');
		game.load.audio('buttonSound', 'assets/Sound/A-Tone.mp3');
		game.load.audio('enemydisablesound', 'assets/Sound/Dying Light Bulb.wav'); ////Sound effect used under creative commons Attribution: recored by Mike Koenig and altered for better use in game.
		game.load.audio('jumpSound', 'assets/Sound/JumpSound.wav'); //Sound effect used under creative commons Attribution: https://freesound.org/people/PDKK/sounds/242978/, and was modified to be more applicable to the game scenario.

	},
	create: function()
	{
		music=game.add.audio('tutorialMusic');
		music.loop=true;
		music.play();
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

//tutorial 1 state
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
		//start P2 physics
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
		this.player = new player(game, 'player', 0, 100, 600, 'jumpSound');
		game.add.existing(this.player);
		
		//add stage end point
		this.door = new exitdoor(game, 'door', 1, 1312, 96);
		game.add.existing(this.door);
		
		//enable controlling and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);
	},

	update: function()
	{
		this.player.update(this.control);
		
		//enable restarting stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		//reach end point and change state to next stage
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'tutorial2');
			}
		}
	}
}

//tutorial 2 state
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
		//enable P2 physics
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
		
		this.switch1 = new onswitch(game, 'switches', 0, 1184, 448, 0, false, 'buttonSound');
		game.add.existing(this.switch1);
		
		//create moving platform
		this.platform1 = new platform(game, 'platform', 0, 320, 528, 0);
		game.add.existing(this.platform1);
		
		this.platform2 = new platform(game, 'platform', 0, 1088, 528, 0);
		game.add.existing(this.platform2);
		
		this.player = new player(game, 'player', 0, 150, 450, 'jumpSound');
		//create player character
		game.add.existing(this.player);
		
		//create end point
		this.door = new exitdoor(game, 'door', 0, 1280, 256);
		game.add.existing(this.door);
		
		//enable end point and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		//create projectile arm station for player
		this.handstation = new handstation(game, 'hand', 0, 320, 440,'whoosh', 'staticSound');
		game.add.existing(this.handstation);
		
		//a variable storing projectile arm
		this.hand = undefined;
		
		//allow collision exception which player doesn't interact with projectile arm
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		
		//function call when switch gets hit
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		
		//preventing infinity calls
		this.switch1on = true;
		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);

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
		
		//player pick up arm
		if(checkoverlap(this.player.sprite(), this.handstation.sprite()))
		{
			if(this.hand == undefined)
			{
				this.hand =
				this.handstation.takearm();
				this.player.addChild(game.add.existing(this.hand));
			}
		}
		// if player has arm, he can shoot
		else if(game.input.activePointer.justReleased() && this.hand != undefined)
		{
			//create a projectile arm shoot from player's position
			this.projected = this.hand.newhand(this.player);
			if(this.projected != undefined)
			{
				//define a projectile arm and enable it interacting with switch
				this.hand.destroy();
				game.add.existing(this.projected);
				this.hand = undefined;
				if(this.switch1.body != null)
					this.switch1.body.createBodyCallback(this.projected, this.switch1.hitted, this.switch1);
				
			}
		}
		//if player has arm, it keeps rotating
		if(this.hand != undefined)
			this.hand.update();
		//enable restarting stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'tutorial3');
			}
		}
	},
}

//tutorial 3 state
var tutorial3 = function(game) {};
tutorial3.prototype = 
{
	init: function()
	{
		this.state = 'tutorial3';
	},
	preload: function()
	{

	},

	create: function()
	{
		// enable P2 physics and load tilemap
		game.add.sprite(0, 0, 'Tbackground');
		
		game.physics.startSystem(Phaser.Physics.P2JS);

		this.map = game.add.tilemap('tutorial3');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		

		this.player = new player(game, 'player', 0, 150, 650, 'jumpSound');
		game.add.existing(this.player);

		//making boxes for pushing
		this.box1 = new box(game, 'box', 0, 250, 672);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 650, 416);
		game.add.existing(this.box2);
		
		//making end point
		this.door = new exitdoor(game, 'door', 0, 1248, 160);
		game.add.existing(this.door);
		
		//enable player control and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);
	},

	update: function()
	{

		this.player.update(this.control);

		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'joy1');
			}
		}
	}
}

//tutorial 4 state
var tutorial4 = function(game) {};
tutorial4.prototype = 
{
	init: function()
	{
		this.state = 'tutorial4';
	},
	preload: function()
	{

	},

	create: function()
	{
		//ebable P2 physics and load tilemap
		game.add.sprite(0, 0, 'Tbackground');
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		
		this.map = game.add.tilemap('tutorial4');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 150, 650, 'jumpSound');
		game.add.existing(this.player);
		//create a player character

		this.enwall1 = new platform(game, 'enplatform', 0, 304, 576, 0);
		game.add.existing(this.enwall1);
		
		this.enwall2 = new platform(game, 'enplatform', 0, 1152, 576, 0);
		game.add.existing(this.enwall2);
		
		//create enemy for stealth gameplay
		this.enemy = new enemy(game, 'enemy', 0, 800, 672, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy);
		
		this.door = new exitdoor(game, 'door', 0, 1248, 448);
		game.add.existing(this.door);
		
		this.superenemy1 = new superenemy(game, 'enemy', 0, -100, 900,'explosion');

		game.add.existing(this.superenemy1);
		
		this.superenemy2 = new superenemy(game, 'missile', 0, 1440, 0,'explosion');
		game.add.existing(this.superenemy2);
		
		this.superenemy3 = new superenemy(game, 'missile', 0, -100, 0,'explosion');
		game.add.existing(this.superenemy3);
		
		this.superenemy4 = new superenemy(game, 'missile', 0, 1440, 900,'explosion');
		game.add.existing(this.superenemy4);
		
		//enable projectile arm
		this.handstation = new handstation(game, 'hand', 0, 96, 800,'whoosh', 'staticSound');
		game.add.existing(this.handstation);
		
		this.hand = undefined;		

		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		// collision exception player and arm, player and invisible wall
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);	
		//now allow player to touch the watcher
		this.enemy.body.createBodyCallback(this.player, this.enemy.collide, this.enemy);

	},

	update: function()
	{
		this.player.update(this.control);
		
		//enable player picking up arm from arm station
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
				this.enemy.body.createBodyCallback(this.projected, this.enemy.disable, this.enemy);
				
			}
		}
		if(this.hand != undefined)
			this.hand.update();

		//if player is spot, the missiles will chase the player
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


		//enable restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		//enemy changes its direction when it hits the invisible wall
		if(checkoverlap(this.enemy.sprite(), this.enwall1.sprite())
		|| checkoverlap(this.enemy.sprite(), this.enwall2.sprite()))
		{
			this.enemy.toggling();
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'fear1');
			}
		}
		
		//if player gets hit, game over and restart the stage
		if(checkoverlap(this.player.sprite(), this.superenemy1.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy2.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy3.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy4.sprite()))
		{
			this.superenemy1.invisible();
			this.superenemy2.invisible();
			this.superenemy3.invisible();
			this.superenemy4.invisible();
			if(this.control)
			{
				this.control = false;
				this.player.death()
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'tutorial4');
			}
		}
	}
}

//joy 1 state
var joy1 = function(game) {};
joy1.prototype = 
{
	init: function()
	{
		this.state = 'joy1';
	},
	preload: function()
	{

		music.destroy();
		music=game.add.audio('joymusic');
		music.loop=true;
		music.play();
		console.log('joy1');
	},

	create: function()
	{

		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);

		//enable P2 physics and tilemap

		game.add.sprite(0, 0, 'Tbackground');
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		// create a moving platform
		this.platform1 = new platform(game, 'rplatform', 0, 960, 272, 0);
		game.add.existing(this.platform1);

		this.map = game.add.tilemap('joy1');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 150, 650, 'jumpSound');
		//create a player character
		game.add.existing(this.player);
		//create boxes for player to push
		this.box1 = new box(game, 'box', 0, 512, 512);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 1152, 192);
		game.add.existing(this.box2);
		
		this.switch1 = new onswitch(game, 'switches', 0, 64, 80, Math.PI, false, 'buttonSound');
		//create a switch to interact with the platform
		game.add.existing(this.switch1);
		
		//create a projectile arm station for player to pick up and shoot
		this.handstation = new handstation(game, 'hand', 0, 448, 768,'whoosh', 'staticSound');
		game.add.existing(this.handstation);
		
		this.hand = undefined;
		
		this.door = new exitdoor(game, 'door', 0, 1280, 320);
		game.add.existing(this.door);
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		//collision exception, player and hands
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		//player can interact with the switch, although it's impossible
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		//boolean preventing repeating calls
		this.switch1on = true;
	},

	update: function()
	{
		this.player.update(this.control);
		
		//activate the switch and destroy the platform
		if(this.switch1.onoff() && this.switch1on)
		{
			this.switch1on = false;
			this.platform1.destroy();
		}
		
		//allow player to pick up a projectile arm
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
			//if a projectile arm is created, it can interact with the switch
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

		//allow player to restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		//box on static platform can't be pushed, disable the boxes' gravity for a while
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
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'joy2');
			}
		}

	}
}

//joy 2 state
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
		//enable P2 physics and tilemap
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		
		//creates two moving platforms
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
		
		this.player = new player(game, 'player', 0, 120, 450, 'jumpSound');
		//create a player character
		game.add.existing(this.player);

		//create boxes for player to push
		this.box1 = new box(game, 'box', 0, 640, 576);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 640, 256);
		game.add.existing(this.box2);
		
		this.box3 = new box(game, 'box', 0, 1184, 96);
		game.add.existing(this.box3);
		
		this.reds = new lever(game, 'rlever', 0, 64, 640, 'LeverSound');

		//create two levers interacting with the platforms
		game.add.existing(this.reds);	

		this.blues = new lever(game, 'blever', 0, 1344, 192, 'LeverSound');
		game.add.existing(this.blues);	
		
		this.door = new exitdoor(game, 'door', 0, 1312, 256);
		game.add.existing(this.door);
		
		//allow player control and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		//collision exception
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);
	},

	update: function()
	{
		this.player.update(this.control);
		
		//allow player to interact with the lever and its interaction with the platform
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

		//allow player to restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		//disable gravity for certain time when it's on a static platform
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
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'joy3');
			}
		}
	}
}

//joy 3 state
var joy3 = function(game) {};
joy3.prototype = 
{
	init: function()
	{
		this.state = 'joy3';
	},
	preload: function()
	{

	},

	create: function()
	{
		//enable P2 physics and tilemap
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		//create platforms and moving platforms
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
		
		this.player = new player(game, 'player', 0, 90, 420, 'jumpSound');
		game.add.existing(this.player);

		//create boxes for player to push
		this.box1 = new box(game, 'box', 0, 784, 96);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 976, 96);
		game.add.existing(this.box2);
		
		this.box3 = new box(game, 'box', 0, 1168, 96);
		game.add.existing(this.box3);
		
		this.box4 = new box(game, 'box', 0, 240, 96);
		game.add.existing(this.box4);
		

		this.yellows = new lever(game, 'ylever', 0, 64, 256, 'LeverSound');
		//create three levers interacting with the platforms

		game.add.existing(this.yellows);
		
		this.blues = new lever(game, 'blever', 0, 1216, 704, 'LeverSound');
		game.add.existing(this.blues);
		
		this.reds = new lever(game, 'rlever', 0, 448, 448, 'LeverSound');
		game.add.existing(this.reds);
		
		this.door = new exitdoor(game, 'door', 0, 1312, 224);
		game.add.existing(this.door);
		
		//enable player control and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		
		//boolean preventing repeating destroy call
		this.blueon = true;
		this.yellowon = true;
		this.redon = true;
		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);
	},

	update: function()
	{
		this.player.update(this.control);

		//allow player interact with the lever and it interaction with the platforms
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

		//allow player to restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'tutorial4');
			}
		}
	}
}

//fear 1 state
var fear1 = function(game) {};
fear1.prototype = 
{
	init: function()
	{
		this.state = 'fear1';
	},
	preload: function()
	{
		
	},

	create: function()
	{

		music.destroy();
		music=game.add.audio('FearAnger');
		music.loop=true;
		music.play();
		

		//enable P2 physics and tilemap

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		//create a moving platform
		this.blue1 = new platform(game, 'btemp', 0, 1072, 336, 0);
		game.add.existing(this.blue1);

		this.map = game.add.tilemap('fear1');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 90, 672, 'jumpSound');
		//create player character

		game.add.existing(this.player);
		
		//create invisible walls and enemies
		this.enwall1 = new platform(game, 'enplatform', 0, 16, 768, 0);
		game.add.existing(this.enwall1);
		
		this.enwall2 = new platform(game, 'enplatform', 0, 720, 768, 0);
		game.add.existing(this.enwall2);
		
		this.enemy1 = new enemy(game, 'enemy', 0, 640, 800, false, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy1);
		
		this.enwall3 = new platform(game, 'enplatform', 0, 880, 448, 0);
		game.add.existing(this.enwall3);
		
		this.enwall4 = new platform(game, 'enplatform', 0, 1264, 448, 0);
		game.add.existing(this.enwall4);
		
		this.enemy2 = new enemy(game, 'enemy', 0, 992, 544, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy2);

		this.enwall5 = new platform(game, 'enplatform', 0, 368, 320, 0);
		game.add.existing(this.enwall5);
		
		this.enwall6 = new platform(game, 'enplatform', 0, 752, 320, 0);
		game.add.existing(this.enwall6);

		this.enemy3 = new enemy(game, 'enemy', 0, 480, 416, false, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy3);
		
		//create missiles to destroy player
		this.superenemy1 = new superenemy(game, 'missile', 0, -100, 900,'explosion');
		game.add.existing(this.superenemy1);
		
		this.superenemy2 = new superenemy(game, 'missile', 0, 1440, 0,'explosion');
		game.add.existing(this.superenemy2);
		
		this.superenemy3 = new superenemy(game, 'missile', 0, -100, 0,'explosion');
		game.add.existing(this.superenemy3);
		
		this.superenemy4 = new superenemy(game, 'missile', 0, 1440, 900,'explosion');
		game.add.existing(this.superenemy4);
		
		//create box for player to push
		this.box1 = new box(game, 'box', 0, 1152, 256);
		game.add.existing(this.box1);
		
		this.boxes = [this.box1];
		
		this.switch1 = new onswitch(game, 'switches', 0, 64, 128, Math.PI, false, 'buttonSound');

		//create a switch interacting with the platform

		game.add.existing(this.switch1);
		
		this.door = new exitdoor(game, 'door', 0, 1312, 448);
		game.add.existing(this.door);
		
		//enable player control and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		
		//allow player to interact with the switch
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		
		//not allow player to interact with the watchers
		this.enemy1.body.createBodyCallback(this.player, this.enemy1.collide, this.enemy1);
		this.enemy2.body.createBodyCallback(this.player, this.enemy2.collide, this.enemy2);
		this.enemy3.body.createBodyCallback(this.player, this.enemy3.collide, this.enemy3);
		
		//boolean preventing the repeating destroy call
		this.switch1on = true;
		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);

	},

	update: function()
	{
		this.player.update(this.control);

		//allow watcher change its direction when it hits the wall
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
		
		//allow interaction with the switch and the platform
		if(this.switch1.onoff() && this.switch1on)
		{
			this.switch1on = false;
			this.blue1.destroy();		
		}

		//allow watcher scan the distance between player and the watcher
		if(this.enemy1.update(this.player, this.boxes) ||
		   this.enemy2.update(this.player, this.boxes) ||
		   this.enemy3.update(this.player, this.boxes))
		{
			this.superenemy1.foundplayer();
			this.superenemy2.foundplayer();
			this.superenemy3.foundplayer();
			this.superenemy4.foundplayer();
		}
		//if player is found, the missiles will chase the player
		this.superenemy1.update(this.player);
		this.superenemy2.update(this.player);
		this.superenemy3.update(this.player);
		this.superenemy4.update(this.player);
		
		//allow player to restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		if(checkoverlap(this.player.sprite(), this.superenemy1.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy2.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy3.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy4.sprite()))
		{
			this.superenemy1.invisible();
			this.superenemy2.invisible();
			this.superenemy3.invisible();
			this.superenemy4.invisible();
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
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'fear2');
			}
		}
	}
	
}

//fear 2 state
var fear2 = function(game) {};
fear2.prototype = 
{
	init: function()
	{
		this.state = 'fear2';
	},
	preload: function()
	{
		
	},

	create: function()
	{
		//enable P2 physics and tilemap
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		this.map = game.add.tilemap('fear2');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		this.player = new player(game, 'player', 0, 90, 672, 'jumpSound');
		//create player character

		game.add.existing(this.player);
		
		this.door = new exitdoor(game, 'door', 0, 1280, 256);
		game.add.existing(this.door);
		
		//create invisible walls and enemies
		this.enwall1 = new platform(game, 'enplatform', 0, 176, 896, 0);
		game.add.existing(this.enwall1);
		
		this.enwall2 = new platform(game, 'enplatform', 0, 720, 896, 0);
		game.add.existing(this.enwall2);
		
		this.enemy1 = new enemy(game, 'enemy', 0, 288, 832, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy1);
		
		this.enwall3 = new platform(game, 'enplatform', 0, 912, 896, 0);
		game.add.existing(this.enwall3);
		
		this.enwall4 = new platform(game, 'enplatform', 0, 1424, 896, 0);
		game.add.existing(this.enwall4);
		
		this.enemy2 = new enemy(game, 'enemy', 0, 1024, 832, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy2);
		
		this.enwall5 = new platform(game, 'enplatform', 0, 272, 544, 0);
		game.add.existing(this.enwall5);
		
		this.enwall6 = new platform(game, 'enplatform', 0, 1040, 544, 0);
		game.add.existing(this.enwall6);
		
		this.enemy3 = new enemy(game, 'enemy', 0, 448, 480, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy3);
		
		this.enwall7 = new platform(game, 'enplatform', 0, 16, 256, 0);
		game.add.existing(this.enwall7);
		
		this.enwall8 = new platform(game, 'enplatform', 0, 560, 256, 0);
		game.add.existing(this.enwall8);
		
		this.enemy4 = new enemy(game, 'enemy', 0, 160, 352, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy4);
		
		//create missiles 
		this.superenemy1 = new superenemy(game, 'missile', 0, -100, 900,'explosion');
		game.add.existing(this.superenemy1);
		
		this.superenemy2 = new superenemy(game, 'missile', 0, 1440, 0,'explosion');
		game.add.existing(this.superenemy2);
		
		this.superenemy3 = new superenemy(game, 'missile', 0, -100, 0,'explosion');
		game.add.existing(this.superenemy3);
		
		this.superenemy4 = new superenemy(game, 'missile', 0, 1440, 900,'explosion');
		game.add.existing(this.superenemy4);
		

		this.switch1 = new onswitch(game, 'switches', 0, 64, 544, Math.PI / 2, false, 'buttonSound');

		//create switch and lever for interacting with the platforms

		game.add.existing(this.switch1);

		this.blue1 = new platform(game, 'btemp', 0, 1168, 304, Math.PI / 2);
		game.add.existing(this.blue1);

		//allow player control and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		
		this.switch1on = true;
		
		//allow player interact with the switch
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);

		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);
		
		//not allow player to touch the watchers
		this.enemy1.body.createBodyCallback(this.player, this.enemy1.collide, this.enemy1);
		this.enemy2.body.createBodyCallback(this.player, this.enemy2.collide, this.enemy2);
		this.enemy3.body.createBodyCallback(this.player, this.enemy3.collide, this.enemy3);
		this.enemy4.body.createBodyCallback(this.player, this.enemy4.collide, this.enemy4);
	},

	update: function()
	{
		this.player.update(this.control);
		
		//enable switch interaction with the platforms
		if(this.switch1.onoff() && this.switch1on)
		{
			this.switch1on = false;
			this.blue1.destroy();	
		}
		
		//allow watchers change their walking direction
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

		//allow watchers to scan for player
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
		
		//allow player to restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		//missiles chase and destroy player
		if(checkoverlap(this.player.sprite(), this.superenemy1.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy2.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy3.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy4.sprite()))
		{
			this.superenemy1.invisible();
			this.superenemy2.invisible();
			this.superenemy3.invisible();
			this.superenemy4.invisible();
			if(this.control)
			{
				this.control = false;
				this.player.death()
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'fear2');
			}
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'fear3');
			}
		}
	}
}

//fear 3 state
var fear3 = function(game) {};
fear3.prototype = 
{
	init: function()
	{
		this.state = 'fear3';
	},
	preload: function()
	{
		
	},

	create: function()
	{
		//enable P2 physics and tilemap
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		this.map = game.add.tilemap('fear3');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		

		this.player = new player(game, 'player', 0, 90, 832, 'jumpSound');

		//create player characher

		game.add.existing(this.player);
		
		//create platforms and switches
		this.blue1 = new platform(game, 'btemp', 0, 1328, 550, 0);
		game.add.existing(this.blue1);

		this.switch1 = new onswitch(game, 'switches', 0, 64, 320, Math.PI / 2, false, 'buttonSound');
		game.add.existing(this.switch1);
		
		this.red1 = new platform(game, 'rtemp', 0, 1328, 368, 0);
		game.add.existing(this.red1);
		
		this.switch2 = new onswitch(game, 'switches', 0, 1376, 112, 0, false, 'buttonSound');
		game.add.existing(this.switch2);
		
		this.door = new exitdoor(game, 'door', 0, 1312, 736);
		game.add.existing(this.door);

		//allow player to use projectile arm
		this.handstation = new handstation(game, 'hand', 0, 544, 800,'whoosh', 'staticSound');
		game.add.existing(this.handstation);
		
		//create watchers and invisible walls
		this.enwall1 = new platform(game, 'enplatform', 0, 464, 896, 0);
		game.add.existing(this.enwall1);
		
		this.enwall2 = new platform(game, 'enplatform', 0, 1232, 896, 0);
		game.add.existing(this.enwall2);
		
		this.enemy1 = new enemy(game, 'enemy', 0, 704, 832, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy1);
		
		this.enwall3 = new platform(game, 'enplatform', 0, 224, 768, 0);
		game.add.existing(this.enwall3);
		
		this.enwall4 = new platform(game, 'enplatform', 0, 976, 608, 0);
		game.add.existing(this.enwall4);
		
		this.enemy2 = new enemy(game, 'enemy', 0, 384, 704, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy2);
		
		this.enwall5 = new platform(game, 'enplatform', 0, 16, 480, 0);
		game.add.existing(this.enwall5);
		
		this.enwall6 = new platform(game, 'enplatform', 0, 672, 480, 0);
		game.add.existing(this.enwall6);
		
		this.enemy3 = new enemy(game, 'enemy', 0, 384, 576, false, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy3);
		
		//create missiles
		this.superenemy1 = new superenemy(game, 'missile', 0, -100, 900,'explosion');
		game.add.existing(this.superenemy1);
		
		this.superenemy2 = new superenemy(game, 'missile', 0, 1440, 0,'explosion');
		game.add.existing(this.superenemy2);
		
		this.superenemy3 = new superenemy(game, 'missile', 0, -100, 0,'explosion');
		game.add.existing(this.superenemy3);
		
		this.superenemy4 = new superenemy(game, 'missile', 0, 1440, 900,'explosion');
		game.add.existing(this.superenemy4);
		
		this.hand = undefined;

		//sllow player control and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		this.switch1on = true;
		this.switch2on = true;
		
		//allow player to interact with the switch
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		this.switch2.body.createBodyCallback(this.player, this.switch2.hitted, this.switch2);

		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);

		
		//not allow player touch the watchers
		this.enemy1.body.createBodyCallback(this.player, this.enemy1.collide, this.enemy1);
		this.enemy2.body.createBodyCallback(this.player, this.enemy2.collide, this.enemy2);
		this.enemy3.body.createBodyCallback(this.player, this.enemy3.collide, this.enemy3);
	},

	update: function()
	{
		this.player.update(this.control);
		
		//allow watcher to change its direction
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

		//switches interaction with the platforms
		if(this.switch1.onoff() && this.switch1on)
		{
			this.switch1on = false;
			this.blue1.destroy();	
		}
		if(this.switch2.onoff() && this.switch2on)
		{
			this.switch2on = false;
			this.red1.destroy();	
		}

		//allow watchers scan for player
		if(this.enemy1.update(this.player, null) ||
		   this.enemy2.update(this.player, null) ||
		   this.enemy3.update(this.player, null))
		{
			this.superenemy1.foundplayer();
			this.superenemy2.foundplayer();
			this.superenemy3.foundplayer();
			this.superenemy4.foundplayer();
		}
		//if player is found, the missiles will chase the player
		this.superenemy1.update(this.player);
		this.superenemy2.update(this.player);
		this.superenemy3.update(this.player);
		this.superenemy4.update(this.player);

		//allow projectile arm
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
				if(this.switch2.body != null)
					this.switch2.body.createBodyCallback(this.projected, this.switch2.hitted, this.switch2);
				this.enemy1.body.createBodyCallback(this.projected, this.enemy1.disable, this.enemy1);
				this.enemy2.body.createBodyCallback(this.projected, this.enemy2.disable, this.enemy2);
				this.enemy3.body.createBodyCallback(this.projected, this.enemy3.disable, this.enemy3);
				
			}
		}
		if(this.hand != undefined)
			this.hand.update();
		
		//allow player restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		if(checkoverlap(this.player.sprite(), this.superenemy1.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy2.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy3.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy4.sprite()))
		{
			this.superenemy1.invisible();
			this.superenemy2.invisible();
			this.superenemy3.invisible();
			this.superenemy4.invisible();
			if(this.control)
			{
				this.control = false;
				this.player.death()
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'fear3');
			}
		}
		
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'sad1');
			}
		}
	}
}

//sad 1 state
var sad1 = function(game) {};
sad1.prototype = 
{
	init: function()
	{
		this.state = 'sad1';
	},
	preload: function()
	{
		music.destroy();
		music=game.add.audio('sadnessMusic');
		music.loop=true;
		music.play();
		console.log('sad1');

	},

	create: function()
	{
		//enable P2 physics and tilemap
		game.add.sprite(0, 0, 'Tbackground');
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		this.platform1 = new platform(game, 'rplatform', 0, 960, 272, 0);
		game.add.existing(this.platform1);

		this.map = game.add.tilemap('sad1');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		

		this.player = new player(game, 'player', 0, 150, 650, 'jumpSound');

		//create player character

		game.add.existing(this.player);
		
		//create boxes for player to push
		this.box1 = new box(game, 'box', 0, 512, 512);
		game.add.existing(this.box1);
		
		this.box2 = new box(game, 'box', 0, 992, 192);
		game.add.existing(this.box2);
		

		this.switch1 = new onswitch(game, 'switches', 0, 64, 208, Math.PI, false, 'buttonSound');

		//create switch and platform for interaction

		game.add.existing(this.switch1);
		
		//enable projectile arm
		this.handstation = new handstation(game, 'hand', 0, 448, 768,'whoosh', 'staticSound');
		game.add.existing(this.handstation);
		
		this.hand = undefined;
		
		this.door = new exitdoor(game, 'door', 0, 1280, 352);
		game.add.existing(this.door);
		
		//enable player control and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		this.switch1on = true;
		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);
	},

	update: function()
	{
		this.player.update(this.control);
		
		//switch and platform interaction
		if(this.switch1.onoff() && this.switch1on)
		{
			this.switch1on = false;
			this.platform1.destroy();
		}
		
		//allow player to use projectile arm
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

		//allow player to restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}

		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'sad2');
			}
		}

	}
}

//sad 2 state
var sad2 = function(game) {};
sad2.prototype = 
{
	init: function()
	{
		this.state = 'sad2';
	},
	preload: function()
	{

	},

	create: function()
	{
		//enable P2 physics and tilemap
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		this.blue1 = new platform(game, 'btemp', 0, 1072, 336, 0);
		game.add.existing(this.blue1);

		this.map = game.add.tilemap('sad2');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		//create player character
		this.player = new player(game, 'player', 0, 90, 672, 'jumpSound');
		game.add.existing(this.player);
		
		//create watchers and invisible walls
		this.enwall1 = new platform(game, 'enplatform', 0, 16, 768, 0);
		game.add.existing(this.enwall1);
		
		this.enwall2 = new platform(game, 'enplatform', 0, 752, 768, 0);
		game.add.existing(this.enwall2);
		
		this.enemy1 = new enemy(game, 'enemy', 0, 640, 800, false, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy1);
		
		this.enwall3 = new platform(game, 'enplatform', 0, 880, 448, 0);
		game.add.existing(this.enwall3);
		
		this.enwall4 = new platform(game, 'enplatform', 0, 1264, 448, 0);
		game.add.existing(this.enwall4);
		
		this.enemy2 = new enemy(game, 'enemy', 0, 992, 544, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy2);

		this.enwall5 = new platform(game, 'enplatform', 0, 368, 320, 0);
		game.add.existing(this.enwall5);
		
		this.enwall6 = new platform(game, 'enplatform', 0, 752, 320, 0);
		game.add.existing(this.enwall6);

		this.enemy3 = new enemy(game, 'enemy', 0, 480, 416, false, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy3);
		
		//create missiles
		this.superenemy1 = new superenemy(game, 'missile', 0, -100, 900,'explosion');
		game.add.existing(this.superenemy1);
		
		this.superenemy2 = new superenemy(game, 'missile', 0, 1440, 0,'explosion');
		game.add.existing(this.superenemy2);
		
		this.superenemy3 = new superenemy(game, 'missile', 0, -100, 0,'explosion');
		game.add.existing(this.superenemy3);
		
		this.superenemy4 = new superenemy(game, 'missile', 0, 1440, 900,'explosion');
		game.add.existing(this.superenemy4);
		
		//create switches and their interaction with the platforms
		this.switch1 = new onswitch(game, 'switches', 0, 64, 160, Math.PI, false, 'buttonSound');
		game.add.existing(this.switch1);
		
		this.switch2 = new onswitch(game, 'switches', 0, 1376, 160, 0, false, 'buttonSound');
		game.add.existing(this.switch2);
		
		this.switch3 = new onswitch(game, 'switches', 0, 416, 64, 3 * Math.PI / 2, false, 'buttonSound');
		game.add.existing(this.switch3);
		
		this.switch4 = new onswitch(game, 'switches', 0, 1024, 64, 3 * Math.PI / 2, false, 'buttonSound');
		game.add.existing(this.switch4);
		
		this.door = new exitdoor(game, 'door', 0, 1312, 448);
		game.add.existing(this.door);
		
		//allow projectile arm
		this.handstation = new handstation(game, 'hand', 0, 112, 784,'whoosh', 'staticSound');
		game.add.existing(this.handstation);
		
		this.hand = undefined;
		
		//allow player control and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		
		//allow player interacting with the switches
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		this.switch2.body.createBodyCallback(this.player, this.switch2.hitted, this.switch2);
		this.switch3.body.createBodyCallback(this.player, this.switch3.hitted, this.switch3);
		this.switch4.body.createBodyCallback(this.player, this.switch4.hitted, this.switch4);
		
		//not allow player to touch the watchers
		this.enemy1.body.createBodyCallback(this.player, this.enemy1.collide, this.enemy1);
		this.enemy2.body.createBodyCallback(this.player, this.enemy2.collide, this.enemy2);
		this.enemy3.body.createBodyCallback(this.player, this.enemy3.collide, this.enemy3);
		this.switch1on = true;
		this.switch2on = true;
		this.switch3on = true;
		this.switch4on = true;

	},

	update: function()
	{
		this.player.update(this.control);

		//allow watchers to change its direction
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
		
		if(this.switch1.onoff() && this.switch1on
		&& this.switch2.onoff() && this.switch2on
		&& this.switch3.onoff() && this.switch3on
		&& this.switch4.onoff() && this.switch4on)
		{
			this.switch1on = false;
			this.switch2on = false;
			this.switch3on = false;
			this.switch4on = false;
			this.blue1.destroy();		
		}

		//allow player use projectile arm
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
				if(this.switch2.body != null)
					this.switch2.body.createBodyCallback(this.projected, this.switch2.hitted, this.switch2);
				if(this.switch3.body != null)
					this.switch3.body.createBodyCallback(this.projected, this.switch3.hitted, this.switch3);
				if(this.switch4.body != null)
					this.switch4.body.createBodyCallback(this.projected, this.switch4.hitted, this.switch4);
				this.enemy1.body.createBodyCallback(this.projected, this.enemy1.disable, this.enemy1);
				this.enemy2.body.createBodyCallback(this.projected, this.enemy2.disable, this.enemy2);
				this.enemy3.body.createBodyCallback(this.projected, this.enemy3.disable, this.enemy3);
			}
		}
		if(this.hand != undefined)
			this.hand.update();
		
		//allow watchers scan for player
		if(this.enemy1.update(this.player, null) ||
		   this.enemy2.update(this.player, null) ||
		   this.enemy3.update(this.player, null))
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
		
		//allow player to restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		//allow missiles destroy the player
		if(checkoverlap(this.player.sprite(), this.superenemy1.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy2.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy3.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy4.sprite()))
		{
			this.superenemy1.invisible();
			this.superenemy2.invisible();
			this.superenemy3.invisible();
			this.superenemy4.invisible();
			if(this.control)
			{
				this.control = false;
				this.player.death()
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'sad2');
			}
		}
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'sad3');
			}
		}
	}
}

//sad 3 state
var sad3 = function(game) {};
sad3.prototype = 
{
	init: function()
	{
		this.state = 'sad3';
	},
	preload: function()
	{
		
	},

	create: function()
	{
		//enable P2 physics and tilemap
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		// create platforms
		this.blue1 = new platform(game, 'btemp', 0, 1328, 550, 0);
		game.add.existing(this.blue1);

		this.red1 = new platform(game, 'rtemp', 0, 1328, 368, 0);
		game.add.existing(this.red1);

		this.map = game.add.tilemap('sad3');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		//create player character
		this.player = new player(game, 'player', 0, 90, 832, 'jumpSound');
		game.add.existing(this.player);
		
		//creates switches and interaction with the platforms
		this.switch1 = new onswitch(game, 'switches', 0, 64, 320, Math.PI / 2, true, 'buttonSound');
		game.add.existing(this.switch1);
		
		this.switch2 = new onswitch(game, 'switches', 0, 1376, 112, 0, false, 'buttonSound');
		game.add.existing(this.switch2);
		
		this.door = new exitdoor(game, 'door', 0, 1312, 736);
		game.add.existing(this.door);

		//allow projectile arm
		this.handstation = new handstation(game, 'hand', 0, 544, 800,'whoosh', 'staticSound');
		game.add.existing(this.handstation);
		
		//create watches and invisible walls
		this.enwall1 = new platform(game, 'enplatform', 0, 464, 896, 0);
		game.add.existing(this.enwall1);
		
		this.enwall2 = new platform(game, 'enplatform', 0, 1232, 896, 0);
		game.add.existing(this.enwall2);
		
		this.enemy1 = new enemy(game, 'enemy', 0, 704, 832, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy1);
		
		this.enwall3 = new platform(game, 'enplatform', 0, 224, 768, 0);
		game.add.existing(this.enwall3);
		
		this.enwall4 = new platform(game, 'enplatform', 0, 976, 608, 0);
		game.add.existing(this.enwall4);
		
		this.enemy2 = new enemy(game, 'enemy', 0, 384, 704, true, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy2);
		
		this.enwall5 = new platform(game, 'enplatform', 0, 16, 480, 0);
		game.add.existing(this.enwall5);
		
		this.enwall6 = new platform(game, 'enplatform', 0, 672, 480, 0);
		game.add.existing(this.enwall6);
		
		this.enemy3 = new enemy(game, 'enemy', 0, 384, 576, false, 'enemydisablesound', 'enemyAlarm');
		game.add.existing(this.enemy3);
		
		//create missiles
		this.superenemy1 = new superenemy(game, 'missile', 0, -100, 900,'explosion');
		game.add.existing(this.superenemy1);
		
		this.superenemy2 = new superenemy(game, 'missile', 0, 1440, 0,'explosion');
		game.add.existing(this.superenemy2);
		
		this.superenemy3 = new superenemy(game, 'missile', 0, -100, 0,'explosion');
		game.add.existing(this.superenemy3);
		
		this.superenemy4 = new superenemy(game, 'missile', 0, 1440, 900,'explosion');
		game.add.existing(this.superenemy4);
		
		this.hand = undefined;

		//allow player control and gravity
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
		this.switch1on = true;
		this.switch2on = false;
		
		//enable player interacting with the switches
		this.switch1.body.createBodyCallback(this.player, this.switch1.hitted, this.switch1);
		this.switch2.body.createBodyCallback(this.player, this.switch2.hitted, this.switch2);
		//not allow player touch the watchers
		this.enemy1.body.createBodyCallback(this.player, this.enemy1.collide, this.enemy1);
		this.enemy2.body.createBodyCallback(this.player, this.enemy2.collide, this.enemy2);
		this.enemy3.body.createBodyCallback(this.player, this.enemy3.collide, this.enemy3);

	},

	update: function()
	{
		this.player.update(this.control);
		
		//allow watchers change their direction
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
		//allow platforms and switches interaction
		if(this.switch1.onoff()&& this.switch1on)
		{
			this.switch1on = false;
			this.switch2on = true;
			this.blue1.moving(1488, 550, 0);	
			this.switch2.turnoff();
		}
		else if(!this.switch1.onoff())
		{
			this.blue1.moving(1328, 550, 0);	
		}
		
		if(this.switch2.onoff() && this.switch2on)
		{
			this.switch2on = false;
			this.switch1on = true;
			this.red1.moving(1488, 368, 0);	
			this.switch1.turnoff();
		}
		else if(!this.switch2.onoff())
		{
			this.red1.moving(1328, 368, 0);
		}
		
		if(this.enemy1.update(this.player, null) ||
		   this.enemy2.update(this.player, null) ||
		   this.enemy3.update(this.player, null))
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


		//allow projeectile arm
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
				if(this.switch2.body != null)
					this.switch2.body.createBodyCallback(this.projected, this.switch2.hitted, this.switch2);
				this.enemy1.body.createBodyCallback(this.projected, this.enemy1.disable, this.enemy1);
				this.enemy2.body.createBodyCallback(this.projected, this.enemy2.disable, this.enemy2);
				this.enemy3.body.createBodyCallback(this.projected, this.enemy3.disable, this.enemy3);
				
			}
		}
		if(this.hand != undefined)
			this.hand.update();
		
		//allow player restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
		
		if(checkoverlap(this.player.sprite(), this.superenemy1.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy2.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy3.sprite())
		|| checkoverlap(this.player.sprite(), this.superenemy4.sprite()))
		{
			this.superenemy1.invisible();
			this.superenemy2.invisible();
			this.superenemy3.invisible();
			this.superenemy4.invisible();
			if(this.control)
			{
				this.control = false;
				this.player.death()
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'fear3');
			}
		}
		
		if(checkoverlap(this.player.sprite(), this.door.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.invisible();
				this.door.teleport();
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'angerboss');
			}
		}
	}
}

//boss fight state
var angerboss = function(game) {};
angerboss.prototype = 
{
	init: function()
	{
		this.state = 'angerboss';
	},
	preload: function()
	{

	},

	create: function()
	{
		//enable P2 physics and tilemap
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		//create platforms
		this.blue1 = new platform(game, 'bplatform', 0, -94, 688, 0);
		game.add.existing(this.blue1);

		this.red1 = new platform(game, 'rplatform', 0, -94, 496, 0);
		game.add.existing(this.red1);

		this.yellow1 = new platform(game, 'yplatform', 0, -94, 304, 0);
		game.add.existing(this.yellow1);
		
		this.map = game.add.tilemap('angerboss');
		this.map.addTilesetImage('test', 'joy');
		this.map.setCollisionBetween(1, 8);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		game.physics.p2.convertTilemap(this.map, this.maplayer);
		
		//create player character
		this.player = new player(game, 'player', 0, 90, 600, 'jumpSound');
		game.add.existing(this.player);
		
		//create levers and platform interaction
		this.blues = new lever(game, 'blever', 0, 912, 704, 'LeverSound');
		game.add.existing(this.blues);
		
		this.reds = new lever(game, 'rlever', 0, 912, 512, 'LeverSound');
		game.add.existing(this.reds);
		
		this.yellows = new lever(game, 'ylever', 0, 912, 320, 'LeverSound');
		game.add.existing(this.yellows);
		
		//enable projectile arm
		this.handstation = new handstation(game, 'hand', 0, 944, 816,'whoosh', 'staticSound');
		game.add.existing(this.handstation);
		
		this.hand = undefined;
		
		this.control = true;
		game.physics.p2.gravity.y = 300;
		
		this.cannon1 = new cannon(game, 'box', 0, 1232, 300)
		game.add.existing(this.cannon1);
		this.missile1 = undefined;
		
		this.cannon2 = new cannon(game, 'box', 0, 1232, 500)
		game.add.existing(this.cannon2);
		this.missile2 = undefined;
		
		this.cannon3 = new cannon(game, 'box', 0, 1232, 700)
		game.add.existing(this.cannon3);
		this.missile3 = undefined;
		
		//create boss
		this.boss = new boss(game, 'boss', 0, 1232, 112, this.reds, this.blues, this.yellows);
		game.add.existing(this.boss);

		game.physics.p2.setPostBroadphaseCallback(this.player.collexception, this);
	},

	update: function()
	{
		this.player.update(this.control);
		
		//enable platforms and levers interaction
		this.blues.playeroverlap(checkoverlap(this.player.sprite(), this.blues.sprite()));
		if(this.blues.update())
		{
			this.blue1.moving(160, 688, 0);
		}
		else
		{
			this.blue1.moving(-94, 688, 0);
		}
		this.reds.playeroverlap(checkoverlap(this.player.sprite(), this.reds.sprite()));
		if(this.reds.update())
		{
			this.red1.moving(160, 496, 0);
		}
		else
		{
			this.red1.moving(-94, 496, 0);
		}
		this.yellows.playeroverlap(checkoverlap(this.player.sprite(), this.yellows.sprite()));
		if(this.yellows.update())
		{
			this.yellow1.moving(160, 304, 0);
		}
		else
		{
			this.yellow1.moving(-94, 304, 0);
		}

		//enable projectile arm
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
					this.boss.body.createBodyCallback(this.projected, this.boss.hitted, this.boss);
				
			}
		}
		if(this.hand != undefined)
			this.hand.update();
		
		//allow boss destroy the player
		if(checkoverlap(this.player.sprite(), this.boss.sprite()))
		{
			if(this.control)
			{
				this.control = false;
				this.player.death()
				game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'angerboss');
			}
		}
		
		//cannon shoot missile by calling update
		this.missile1 = this.cannon1.update(this.player);
		if(this.missile1 != undefined)
		{
			//if a missile is successfully created, allow it destroy playerSS
			game.add.existing(this.missile1);
			//restart the stage when player gets hit
			if(checkoverlap(this.player.sprite(), this.missile1.sprite()))
			{
				if(this.control)
				{
					this.control = false;
					this.player.death()
					game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'angerboss');
				}
			}
		}
		this.missile2 = this.cannon2.update(this.player);
		if(this.missile2 != undefined)
		{
			game.add.existing(this.missile2);
			if(checkoverlap(this.player.sprite(), this.missile2.sprite()))
			{
				if(this.control)
				{
					this.control = false;
					this.player.death()
					game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'angerboss');
				}
			}
		}
		this.missile3 = this.cannon3.update(this.player);
		if(this.missile3 != undefined)
		{
			game.add.existing(this.missile3);
			if(checkoverlap(this.player.sprite(), this.missile1.sprite()))
			{
				if(this.control)
				{
					this.control = false;
					this.player.death()
					game.time.events.add(Phaser.Timer.SECOND * 1, restart, this, 'angerboss');
				}
			}
		}
		//allow player restart the stage
		if(game.input.keyboard.isDown(Phaser.Keyboard.R) && this.control)
		{
			game.state.restart(true, false);
		}
	},
	
	render: function()
	{
		game.debug.body(this.missile1);
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
		game.add.text(20, 20, "Game Over\n" + 
		"Press Spacebar to restart\n", style);
		this.mutebutton = game.add.button(50,50,'mutebutton', decidetomute, this, 2,1,1,0);
	},
	update: function()
	{
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			//restart the game
			game.state.start('MainMenu', true, false, this.level);
		}
	}
}

//adding states for calling
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
game.state.add('fear3', fear3);
game.state.add('sad1', sad1);

game.state.add('sad2', sad2);
game.state.add('sad3', sad3);
game.state.add('angerboss', angerboss);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');