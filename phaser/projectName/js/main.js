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
		game.load.image('player', 'assets/img/Player_A.png');
		game.load.image('box', 'assets/img/Box.png');
		game.load.spritesheet('test', 'assets/map/test.png', 32, 32);
	},
	create: function()
	{

	},
	update: function()
	{
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			game.state.start('tutorial1', true, false, this.level);
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
		console.log('tutorial1');
	},

	create: function()
	{
		game.stage.setBackgroundColor('#FFFF00');

		// game.physics.startSystem(Phaser.Physics.ARCADE);
		// game.physics.arcade.TILE_BIAS = 32;

		// Using code from: https://samme.github.io/phaser-examples-mirror/p2%20physics/tilemap.html

		// Start the P2 physics system
		game.physics.startSystem(Phaser.Physics.P2JS);

		// Set background color
		game.stage.backgroundColor = "#facade";

		// Add tilemap for current level
		this.map = game.add.tilemap('tutorial1');

		// Not sure what this is
		this.map.addTilesetImage('test', 'test');


		// Create a map layer
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		// Resize the map layer?
		this.mapLayer.resizeWorld();
		
		// Set collision (Gotta figure out the actual range)
		this.map.setCollisionBetween(1,12);

		// Convert the tilemap layer into bodies.  
		game.physics.p2.convertTilemap(this.map, this.mapLayer);


		this.player = new player(game, 'player', 0, game.width - 100, 100);
		game.add.existing(this.player);

		
	},

	update: function()
	{
		//game.physics.arcade.collide(this.player, this.mapLayer);
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
		
		this.player = new player(game, 'player', 0, 100, 450);
		game.add.existing(this.player);

		
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);
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
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');