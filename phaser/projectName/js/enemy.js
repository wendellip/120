enemy.prototype = Object.create(Phaser.Sprite.prototype);
enemy.prototype.constructor = enemy;

function enemy(game, key, frame, x, y, faceleft)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.enable(this);
this.body.setCircle(32);
this.body.CollideWorldBounds = true;
this.body.gravity.y = 500;
this.body.rotation = false;
this.spot = false;
this.left = faceleft;
if(faceleft)
{
	this.body.velocity.x = -64;
}
else
{
	this.body.velocity.x = 64;
}

}

player.prototype.update = function(toggle, player, box)
{
	if(toggle)
		toggling();
	if((this.body.y+32) >= player.body.y && (this.body-32) <= player.body.y)
	{
		var distance = this.body.x - player.body.x;
		if(this.left)
		{
			if(distance >= 0 && distance < 128)
			{
				for(int i = 0; i < box.size(); i++)
					if((this.body.y+32) >= box[i].body.y && (this.body-32) <= box[i].body.y)
						if((this.body.x - player.body.x) < distance)
							return false;
				return true;
			}
		}
		else
		{
			if(distance <= 0 && distance > -128)
			{
				for(int i = 0; i < box.size(); i++)
					if((this.body.y+32) >= box[i].body.y && (this.body-32) <= box[i].body.y)
						if((this.body.x - player.body.x) > distance)
							return false;
				return true;
			}
		}
	}
	else
		return false;
}

function toggling()
{
	this.left = !this.left;
	this.body.velocity.x = -(this.body.velocity.x);
}