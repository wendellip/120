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
		if((this.body.y+64) >= player.body.y && (this.body.y-64) <= player.body.y)
		{
			console.log("123");
			var distance = this.body.x - player.body.x;
			if(this.faceleft == true)
			{
				if(distance >= -64 && distance < 250)
				{
					if(box != undefined)
					{
						for(var i = 0; i < box.length; i++)
							if((this.body.y+32) >= box[i].body.y && (this.body.y-32) <= box[i].body.y)
								if((this.body.x - box[i].body.x) < distance)
									return false;
					}
					this.speed = 0;
					return true;
				}
			}
			else
			{
				if(distance <= 64 && distance > -250)
				{
					if(box != undefined)
					{
						for(i = 0; i < box.length; i++)
							if((this.body.y+32) >= box[i].body.y && (this.body.y-32) <= box[i].body.y)
								if((this.body.x - box[i].body.x) > distance)
									return false;
					}
					this.speed = 0;
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