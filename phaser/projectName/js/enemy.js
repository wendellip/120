enemy.prototype = Object.create(Phaser.Sprite.prototype);
enemy.prototype.constructor = enemy;

function enemy(game, key, frame, x, y, faceleft)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.p2.enable(this);
this.body.enable = true;
this.body.setCircle(32);
this.body.CollideWorldBounds = true;
this.body.fixedRotation = true;
this.spot = false;
this.faceleft = faceleft;
this.speed = 128;
if(!faceleft)
{
	this.speed = -128
}

}

enemy.prototype.update = function(player, box)
{
	this.body.moveLeft(this.speed);
	if(player != undefined)
	{
		if((this.body.y+32) >= player.body.y && (this.body.y-32) <= player.body.y)
		{
			var distance = this.body.x - player.body.x;
			if(this.faceleft == true)
			{
				if(distance >= 0 && distance < 200)
				{
					if(box != null)
					{
						for(var i = 0; i < box.length(); i++)
							if((this.body.y+32) >= box[i].body.y && (this.body.y-32) <= box[i].body.y)
								if((this.body.x - player.body.x) < distance)
									return false;
					}
					return true;
				}
			}
			else
			{
				if(distance <= 0 && distance > -200)
				{
					if(box != null)
					{
						for(var i = 0; i < box.length(); i++)
							if((this.body.y+32) >= box[i].body.y && (this.body.y-32) <= box[i].body.y)
								if((this.body.x - player.body.x) > distance)
									return false;
					}
					return true;
				}
			}
		}
	}
	return false;
}

enemy.prototype.toggling = function()
{
	this.faceleft = !this.faceleft;
	this.speed = -this.speed;
}

enemy.prototype.sprite = function()
{
	return this.body.sprite;
}