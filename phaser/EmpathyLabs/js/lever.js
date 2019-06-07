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
this.on = false;
this.trigger = game.input.keyboard.addKey(Phaser.Keyboard.E);﻿﻿
this.overlap = false;

}

lever.prototype.update = function()
{ 
	this.trigger.onDown﻿.add(change, this);
	return this.on;
}

lever.prototype.playeroverlap = function(overlapping)
{
	this.overlap = overlapping;
}

function change()
{
	if(this.overlap)
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
}

lever.prototype.sprite = function()
{
	return this.body.sprite;
}