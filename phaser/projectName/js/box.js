box.prototype = Object.create(Phaser.Sprite.prototype);
box.prototype.constructor = box;

function box(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.enable(this);
this.body.CollideWorldBounds = true;
this.scale.set(2);
this.body.setSize(64, 64, 0, 0);
this.body.gravity.y = 500;
this.pushb = game.input.keyboard.addKey(Phaser.Keyboard.E);﻿﻿
this.body.immovable = true;
this.collide = false;
this.ground = false;
}


box.prototype.update = function(collide, ground)
{
	if(collide != undefined)
		this.collide = collide;
	if(ground != undefined)
		this.ground = ground;
	if(!this.collide || !this.ground)
	{
		this.body.velocity.x = 0;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.E))
	{
		if(this.collide && this.ground)
		{
			if(this.body.touching.left)
			{
				this.body.velocity.x = 64;
			}
			else if(this.body.touching.right)
			{
				this.body.velocity.x = -64;
			}
		}
	}
	else
		this.body.velocity.x = 0;
}

function pushing()
{
	if(this.collide && this.ground)
	{
		if(this.body.touching.left)
		{
			this.body.velocity.x = 64;
		}
		else if(this.body.touching.right)
		{
			this.body.velocity.x = -64;
		}
		this.body.velocity.x = 0;
	}
}

function stop()
{
	
}