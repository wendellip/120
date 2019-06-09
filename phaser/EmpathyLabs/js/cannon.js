cannon.prototype = Object.create(Phaser.Sprite.prototype);
cannon.prototype.constructor = cannon;

function cannon(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.p2.enable(this);
this.body.enable = true;
this.body.fixedRotation = true;
this.body.static = true;
this.attacking = false;
this.missile = undefined;
}

cannon.prototype.update = function(player)
{	
	if(!this.attacking && player != undefined)
	{
		this.attacking = true;
		game.time.events.add(game.rnd.integerInRange(4, 8) * 1000, this.recover, this);
		this.missile =new missile(game, 'missile', 0, this.position.x, this.position.y);
		var xd = (this.position.x - player.position.x) * (this.position.x - player.position.x);
		var yd = (this.position.y - player.position.y) * (this.position.y - player.position.y);
		var sum = xd + yd;
		if (this.position.x > player.position.x)
			this.missile.body.velocity.x = -300 * Math.sqrt(xd) / Math.sqrt(sum);
		else
			this.missile.body.velocity.x = 300 * Math.sqrt(xd) / Math.sqrt(sum);
		if (this.position.y > player.position.y)
			this.missile.body.velocity.y = -300 * Math.sqrt(yd) / Math.sqrt(sum);
		else
			this.missile.body.velocity.y = 300 * Math.sqrt(yd) / Math.sqrt(sum);	
		return this.missile;
	}
	else return this.missile;
}

cannon.prototype.recover = function()
{	
	this.attacking = false;
	this.missile = undefined;
}

cannon.prototype.sprite = function()
{
	return this.body.sprite;
}