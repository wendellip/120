enemy.prototype = Object.create(Phaser.Sprite.prototype);
enemy.prototype.constructor = enemy;

function enemy(game, key, frame, x, y, faceleft)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.animations.add('left', ['left01', 'left02'], 5, true);
this.animations.add('right', ['righrt01', 'right02'], 5, true);
this.animations.add('stand', ['middle01', 'middle02', 'middle03', 'middle01', 'middle04', 'middle05'], 15, true);
this.animations.add('alarm', ['alarm01', 'alarm02', 'alarm03'], 15, false);
this.animations.add('alarmloop', ['alarmloop01', 'alarmloop02', 'alarmloop03', 'alarmloop04', 'alarmloop05'], 15, true);

game.physics.p2.enable(this);
this.body.enable = true;
this.body.setCircle(32);
this.body.CollideWorldBounds = true;
this.body.fixedRotation = true;
this.spot = false;
this.faceleft = faceleft;
this.speed = 128;
this.animations.play('left');
this.working = true;
this.found = false;
this.body.static = false;
if(!faceleft)
{
	this.animations.play('right');
	this.speed = -128
}
}

enemy.prototype.update = function(player, box)
{
	this.body.moveLeft(this.speed);
	if(this.working)
	{
		if(player != undefined)
		{
			if((this.body.y+64) >= player.body.y && (this.body.y-64) <= player.body.y)
			{
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
										return this.found;
						}
						this.speed = 0;
						this.animations.play('alarm');
						this.working = false;
						game.time.events.add(Phaser.Timer.SECOND * 2, this.alarmloop, this);
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
										return this.found;
						}	
						this.speed = 0;
						this.animations.play('alarm');
						this.working = false;
						game.time.events.add(Phaser.Timer.SECOND * 2, this.alarmloop, this);
						return true;
					}
				}
			}
		}
		return this.found;
	}
	else
		return this.found;
}

enemy.prototype.toggling = function()
{
	this.animations.play('stand');
	var speed = this.speed;
	this.speed = 0;
	this.working = false;
	if(this.faceleft)
		this.body.reset(this.body.x + 3, this.body.y);
	else
		this.body.reset(this.body.x - 3, this.body.y);
	game.time.events.add(Phaser.Timer.SECOND * 1, this.toggle, this, speed);
}

enemy.prototype.toggle = function(speed)
{
	this.faceleft = !this.faceleft;
	this.speed = -speed;
	this.working = true;
	if(this.faceleft)
		this.animations.play('left');
	else
		this.animations.play('right');
}

enemy.prototype.disable = function()
{
	this.working = false;
	var speed = this.speed;
	this.speed = 0;
	game.time.events.add(Phaser.Timer.SECOND * 5, this.backtowork, this, speed);
}

enemy.prototype.alarmloop = function()
{
	this.animations.play('alarmloop');
}

enemy.prototype.backtowork = function(speed)
{
	if(!this.found)
	{
		this.speed = speed;
		this.working = true;
	}
}
enemy.prototype.sprite = function()
{
	return this.body.sprite;
}

enemy.prototype.collide = function()
{
	this.found = true;
	this.animations.play('alarm');
	this.working = false;
	game.time.events.add(Phaser.Timer.SECOND * 2, this.alarmloop, this);
}