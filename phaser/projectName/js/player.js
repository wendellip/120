Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

function Player(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.enable(this);
this.enableBody = true;
this.body.CollideWorldBounds = true;
this.body.gravity.y = 500;

}


Player.prototype.update = function(hitplatform)
{
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && hitplatform)
	{
		this.body.velocity.y -= 300;
		this.animations.play('sliding');
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	{
		this.body.velocity.x = 50;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
	{
		this.body.velocity.x = -50;
	}
	else
	{
		this.body.velocity.x = 0;
	}

}