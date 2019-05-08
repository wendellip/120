let style = { font: '24px Helvetica', fill: '#FFF' };
//define the game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser');

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
		
	},

	create: function()
	{

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
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');