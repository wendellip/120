platform.prototype = Object.create(Phaser.Sprite.prototype);
platform.prototype.constructor = platform;

function platform(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.enable(this);
this.enableBody = true;
this.body.CollideWorldBounds = true;
this.body.immovable = true;
this.moving = false;
}


platform.prototype.update = function(hit,x, y)
{
	//if the lever or switch tiggered, move the platform.
	if(hit && !this.moving)
	{
		this.moving = true;
		game.physics.arcade.moveToXY(this, x, y, 0, 2000);
		game.time.events.add(2000, function ()
		{
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
			this.moving = false;
		}
		, this);
	}
}