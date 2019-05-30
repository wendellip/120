platform.prototype = Object.create(Phaser.Sprite.prototype);
platform.prototype.constructor = platform;

function platform(game, key, frame, x, y, rotation)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.p2.enable(this, true);
this.body.enable = true;
this.body.CollideWorldBounds = true;
this.body.rotation = rotation;
this.body.static = true;
this.body.data.gravityScale = 0;
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

platform.prototype.moving = function(x, y, rotation)
{
	this.body.rotation = rotation;
	this.body.reset(x, y);
}