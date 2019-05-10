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
		game.load.tilemap('testmap', 'assets/map/test.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('player', 'assets/img/Player_A.png');
		game.load.spritesheet('test', 'assets/map/test.png', 32, 32);
	},
	create: function()
	{

	},
	update: function()
	{
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			game.state.start('GamePlay', true, false, this.level);
		}
	}
}

//define GamePlay state
var GamePlay = function(game) {};
GamePlay.prototype = 
{
	init: function()
	{
		this.state = 'Gameplay';
	},
	preload: function()
	{
		console.log('game');
	},

	create: function()
	{
		game.stage.setBackgroundColor('#FFFF00');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		this.map = game.add.tilemap('testmap');
		this.map.addTilesetImage('test', 'test');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		this.mapLayer.resizeWorld();
		
		this.player = new player(game, 'player', 0, 100, 650);
		game.add.existing(this.player);

		
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);
		

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
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');