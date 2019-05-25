player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;

function player(game, key, frame, x, y, jumpkey)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.enable(this);
this.body.setCircle(32);
this.body.CollideWorldBounds = true;
this.body.gravity.y = 500;
this.body.rotation = false;
this.jumpse = game.add.audio(jumpkey);
this.jumpb = game.input.keyboard.addKey(Phaser.Keyboard.W);﻿﻿
this.jump = 1;
this.interact = false;
}


player.prototype.update = function()
{
	//moving and jumping
	this.jumpb.onDown﻿.add(jumping, this);
	if((this.body.blocked.down || this.body.touching.down))
	{
		this.jump = 1;
		this.interact = true;
	}
	else
	{
		this.jump = 0;
		this.interact = false;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.D))
	{
		this.body.velocity.x = 300;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.A))
	{
		this.body.velocity.x = -300;
	}
	else
	{
		this.body.velocity.x = 0;
	}
	return this.interact;
}

function jumping()
{
	if(this.jump > 0)
	{
		this.jumpse.play('', 0, 1, false);
		this.jump = this.jump - 1;
		this.body.velocity.y -= 390;
	}
}
