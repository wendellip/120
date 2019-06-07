onswitch.prototype = Object.create(Phaser.Sprite.prototype);
onswitch.prototype.constructor = onswitch;

function onswitch(game, key, frame, x, y, rotation)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.frameName = 'offswitch';
game.physics.p2.enable(this);
this.body.enable = true;
this.body.rotation = rotation;
this.body.CollideWorldBounds = true;
this.body.static = true;
this.on = false;


}


onswitch.prototype.update = function()
{
	
}

onswitch.prototype.hitted = function()
{
	if(this.on == false)
	{
		this.on = true;
		this.frameName = 'onswitch';
		this.body.enable = false;
		this.body.destroy();
		return true;
	}
	else
		return false;
}

onswitch.prototype.onoff = function()
{
	return this.on;
}