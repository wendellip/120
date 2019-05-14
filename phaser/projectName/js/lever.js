lever.prototype = Object.create(Phaser.Sprite.prototype);
lever.prototype.constructor = lever;

function lever(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.frameName = 'offlever';
game.physics.enable(this);
this.enableBody = true;
this.body.CollideWorldBounds = true;
this.body.immovable = true;
this.on = null;
this.trigger = game.input.keyboard.addKey(Phaser.Keyboard.C);﻿﻿
}


lever.prototype.update = function(hitted)
{
	if(hitted)
	{
		this.trigger.onDown﻿.add(change, this);
		if(this.on != null)
		{
			var temp = this.on
			this.on = null;
			return temp;
		}
	}
}

function change()
{
	if(this.frameName == "offlever")
	{
		this.on = true;
		this.frameName = "onlever";
	}
	else
	{
		this.on= false;
		this.frameName  = "offlever";
	}
}