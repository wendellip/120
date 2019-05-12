box.prototype = Object.create(Phaser.Sprite.prototype);
box.prototype.constructor = box;

function box(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.enable(this);
this.body.CollideWorldBounds = true;
this.scale.set(2);
this.body.gravity.y = 500;
}


box.prototype.update = function(hitplayer)
{

	if(hitplayer && this.body.touching.left)
	{
		if(!this.body.blocked.right && !this.body.touching.right)
		{
			this.body.velocity.x = 125;
		}
		else
		{
			this.body.velocity.x = 0;
		}
	}
	else if(hitplayer && this.body.touching.right)
	{
		if(!this.body.blocked.left && !this.body.touching.left)
		{
			this.body.velocity.x = -125;
		}
		else
			this.body.velocity.x = 0;
	}
	else
	{
		this.body.velocity.x = 0.000001 * this.body.velocity.x;
	}


}