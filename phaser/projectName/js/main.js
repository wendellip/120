let style = { font: '24px Helvetica', fill: '#FFF' };
//define the game
var game = new Phaser.Game(1440, 900, Phaser.AUTO, 'phaser');
var playertest;
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
		game.load.image('player', 'assets/img/Snowball.png');
		game.load.image('box', 'assets/img/Box.png');
		game.load.image('platform', 'assets/img/platform.png');
		game.load.spritesheet('test', 'assets/map/test.png', 32, 32);
		game.load.atlas('switches', 'assets/img/switches.png', 'assets/img/switches.json');
		game.load.image('hand', 'assets/img/HandPlaceholder.jpg');
		game.load.image('door', 'assets/img/Door.png');
	},
	create: function()
	{
		newhand=new hand2(game, 'hand', 0, -50, -50);
	},
	update: function()
	{
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			game.state.start('tutorial2', true, false, this.level);
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
		
		this.switch1 = new onswitch(game, 'switches', 0, 1200, 480, 90);
		game.add.existing(this.switch1);
		
		this.platform1 = new platform(game, 'platform', 0, 192, 512);
		game.add.existing(this.platform1);
		
		this.platform2 = new platform(game, 'platform', 0, 960, 512);
		game.add.existing(this.platform2);

		this.hand = new hand(game, 'hand', 0, 50,50);
		this.player.addChild(game.add.existing(this.hand));

		this.door = new exitdoor(game, 'door', 0, 1350, 300);
		game.add.existing(this.door);

		shotsfired = 0;
		
	},
 	
	update: function()
	{
		this.hand.rotation = game.physics.arcade.angleToPointer(this.player);
		if(game.input.activePointer.isDown){
			console.log(shotsfired);
			if(shotsfired==0){
				shotsfired+=1;
				this.hand.destroy();
				console.log(this.hand);
				newhand=new hand2(game, 'hand', 0, this.hand.position.x+this.player.position.x, this.hand.position.y+this.player.position.y);
				game.add.existing(newhand);
				game.physics.arcade.moveToPointer(newhand, 1000);
  				timer = game.time.create(game,true);
  				timer.add(2000, changepickup, this, newhand);
   				timer.start();
   				newhand.setHealth(1);

   			}
		}



		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.hand, this.mapLayer);
		game.physics.arcade.collide(newhand, this.mapLayer);
		game.physics.arcade.collide(this.player, this.platform1);
		game.physics.arcade.collide(this.hand, this.platform1);
		game.physics.arcade.collide(this.hand, this.platform2);
		game.physics.arcade.collide(newhand, this.platform1);
		game.physics.arcade.collide(newhand, this.platform2);
		game.physics.arcade.collide(this.player, this.platform2); 
		if(game.physics.arcade.overlap(this.player, this.door)){
			game.state.start('tutorial3');
		}

		

		if(newhand.update(game.physics.arcade.overlap(this.player, newhand))){
			this.hand = new hand(game, 'hand', 0, 50,50);
			this.player.addChild(game.add.existing(this.hand));
			newhand.destroy();
			shotsfired-=1;
		}


		if(this.switch1.update(game.physics.arcade.overlap(this.hand, this.switch1)))
		{
			this.platform1.update(true, 448, 512);
			this.platform2.update(true, 704, 512);		
		}
		if(this.switch1.update(game.physics.arcade.overlap(this.player, this.switch1)))
		{
			this.platform1.update(true, 448, 512);
			this.platform2.update(true, 704, 512);		
		}
		if(this.switch1.update(game.physics.arcade.overlap(newhand, this.switch1)))
		{
			this.platform1.update(true, 448, 512);
			this.platform2.update(true, 704, 512);		
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.R))
		{
			game.state.restart(true, false);
		}
	},
	
	render: function()
	{
		game.debug.body(this.switch1);
		game.debug.body(this.player);
		game.debug.body(this.hand);
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

		this.door = new exitdoor(game, 'door', 0, 1350, 200);
		game.add.existing(this.door);
	},

	update: function()
	{
		game.physics.arcade.collide(this.player, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.mapLayer);
		game.physics.arcade.collide(this.box2, this.mapLayer);
		game.physics.arcade.collide(this.box1, this.box2);
		this.box1.update(game.physics.arcade.collide(this.player, this.box1));
		this.box2.update(game.physics.arcade.collide(this.player, this.box2));
		if(game.physics.arcade.overlap(this.player, this.door)){
			game.state.start('GameOver');
		}

		
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
		console.log('gameover');

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


game.state.add('MainMenu', MainMenu);
game.state.add('tutorial1', tutorial1);
game.state.add('tutorial2', tutorial2);
game.state.add('tutorial3', tutorial3);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');

function changepickup(){
	newhand.setHealth(2);
	console.log(newhand.health);
}
