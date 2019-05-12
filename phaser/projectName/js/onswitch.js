onswitch.prototype = Object.create(Phaser.Sprite.prototype);
onswitch.prototype.constructor = onswitch;

function onswitch(game, key, frame, x, y, rotation)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.frameName = 'offswitch';
this.angle = rotation;
game.physics.enable(this);
this.enableBody = true;
this.body.CollideWorldBounds = true;
this.body.immovable = true;
this.on = false;
}


onswitch.prototype.update = function(hitplayer)
{
	if(this.on == false && hitplayer)
	{
		this.on = true;
		this.frameName = 'onswitch';
		return this.on;
	}
	else
		return false;
}