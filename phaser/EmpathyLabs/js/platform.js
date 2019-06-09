platform.prototype = Object.create(Phaser.Sprite.prototype);
platform.prototype.constructor = platform;

function platform(game, key, frame, x, y, rotation)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.p2.enable(this);
this.body.enable = true;
this.body.CollideWorldBounds = true;
this.body.rotation = rotation;
//create an immovable platform
this.body.static = true;
this.body.mass = 0;

}


platform.prototype.update = function()
{

}

platform.prototype.moving = function(x, y, rotation)
{
	//reset its positiong and rotation and it's interacting with the lever or switch
	this.body.rotation = rotation;
	this.body.reset(x, y);
}

platform.prototype.sprite = function()
{
	return this.body.sprite;
}