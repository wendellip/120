enemy.prototype = Object.create(Phaser.Sprite.prototype);
enemy.prototype.constructor = enemy;

function enemy(game, key, frame, x, y, faceleft, jumpkey, alarmkey)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
//create animation
this.jumpse = game.add.audio(jumpkey);
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
this.faceleft = faceleft;
this.speed = 128;
this.animations.play('left');
this.working = true;
this.found = false;
this.body.static = false;
this.alarmse=game.add.audio(alarmkey);
//choosing its walking direction
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
			//check player and watcher y position, if it's close check x position
			if((this.body.y+64) >= player.body.y && (this.body.y-64) <= player.body.y)
			{
				var distance = this.body.x - player.body.x;
				if(this.faceleft == true)
				{
					//if player is close enough
					if(distance >= -64 && distance < 250)
					{
						//check if there's any box between
						if(box != undefined)
						{
							for(var i = 0; i < box.length; i++)
								if((this.body.y+32) >= box[i].body.y && (this.body.y-32) <= box[i].body.y)
									if((this.body.x - box[i].body.x) < distance)
										return this.found;
						}
						//if all true, player is spot
						this.alarmse.play();
						this.speed = 0;
						this.animations.play('alarm');
						this.working = false;
						game.time.events.add(Phaser.Timer.SECOND * 2, this.alarmloop, this);
						return true;
					}
				}
				else
				{
					//same function but facing another direction
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
	//allow watcher change its direction
	this.animations.play('stand');
	var speed = this.speed;
	this.speed = 0;
	this.working = false;
	//back off a little bit and wait for 2 seconds
	if(this.faceleft)
		this.body.reset(this.body.x + 3, this.body.y);
	else
		this.body.reset(this.body.x - 3, this.body.y);
	game.time.events.add(Phaser.Timer.SECOND * 2, this.toggle, this, speed);
}

enemy.prototype.toggle = function(speed)
{
	//change watcher direction according its original direction
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
	//if watcher gets hit by projectile arm, disable it for 5 seconds
	this.working = false;
	console.log('disabled robot, should play sound');
	var speed = this.speed;
	this.speed = 0;
	this.jumpse.play();
	game.time.events.add(Phaser.Timer.SECOND * 5, this.backtowork, this, speed);
}
enemy.prototype.stopsound = function()
{
	console.log('should pause alarm');
	this.alarmse.destroy();
}
enemy.prototype.alarmloop = function()
{
	this.animations.play('alarmloop');
}

enemy.prototype.backtowork = function(speed)
{
	//back to normal work after 5 seconds
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
	//if player touch watchers, player is spotted
	this.found = true;
	this.alarmse.loop=true;
	this.alarmse.play();

	this.animations.play('alarm');
	this.working = false;
	game.time.events.add(Phaser.Timer.SECOND * 2, this.alarmloop, this);
}