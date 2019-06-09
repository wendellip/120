superenemy.prototype = Object.create(Phaser.Sprite.prototype);
superenemy.prototype.constructor = superenemy;

function superenemy(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.enable(this);
this.body.enable = true;
this.body.setCircle(32);
this.body.CollideWorldBounds = true;
//default player is not found
this.found = false;
}

superenemy.prototype.update = function(player)
{
	//if player is spot by the watchers
	if(this.found)
	{
		//look for player position and chase player
		if(player != undefined)
		{
			if(player.body.x > this.body.x)
				this.body.velocity.x = 200;
			else if(player.body.x < this.body.x)
				this.body.velocity.x = -200;
			else
				this.body.velocity.x = 0;
			if(player.body.y > this.body.y)
				this.body.velocity.y = 200;
			else if(player.body.y < this.body.y)
				this.body.velocity.y = -200;
			else
				this.body.velocity.y = 0;
			this.rotation = Math.atan2(player.body.y - this.body.y, player.body.x - this.body.x);
		}	
	}
}

superenemy.prototype.foundplayer = function()
{
	//call when player is found
	this.found = true;
}

superenemy.prototype.sprite = function()
{
	return this.body.sprite;
}

superenemy.prototype.invisible = function()
{
	//player gets hit, missile disappear
	this.alpha = 0;
}