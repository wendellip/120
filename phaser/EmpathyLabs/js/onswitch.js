onswitch.prototype = Object.create(Phaser.Sprite.prototype);
onswitch.prototype.constructor = onswitch;

function onswitch(game, key, frame, x, y, rotation, onoff, SoundyBoi)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.p2.enable(this);
this.body.enable = true;
this.body.rotation = rotation;
this.body.CollideWorldBounds = true;
this.body.static = true;
this.soundeffect = game.add.audio(SoundyBoi);
//set its state from constructing
if(onoff == false)
{
	this.on = false;
	this.frameName = 'offswitch';
}
else
{
	this.on = true;
	this.frameName = 'onswitch';
}

}


onswitch.prototype.update = function()
{
	
}

onswitch.prototype.hitted = function()
{
	//if the switch gets hit, change it to on
	if(this.on == false)
	{
		this.soundeffect.play();
		this.on = true;
		this.frameName = 'onswitch';
		this.body.enable = false;
	}
}

onswitch.prototype.onoff = function()
{
	//return its state
	return this.on;
}

onswitch.prototype.turnoff = function()
{
	this.on = false;
	this.frameName = 'offswitch';
	this.body.enable = true;
}