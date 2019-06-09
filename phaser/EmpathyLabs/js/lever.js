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
//allow button E to interact with the lever
this.trigger = game.input.keyboard.addKey(Phaser.Keyboard.E);﻿﻿
this.overlap = false;

}

lever.prototype.update = function()
{ 
	//allow E to activate the lever
	this.trigger.onDown﻿.add(change, this);
	//return its state
	return this.on;
}

lever.prototype.playeroverlap = function(overlapping)
{
	//check if player is standing next to the lever
	this.overlap = overlapping;
}

lever.prototype.forceoff = function()
{
	//for boss to force chaning lever state
	this.on= false;
	this.frameName  = "offlever";
}

function change()
{
	if(this.overlap)
	{
		//toggling the state if player is standing next to it
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