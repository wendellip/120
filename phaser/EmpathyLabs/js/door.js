exitdoor.prototype = Object.create(Phaser.Sprite.prototype);
exitdoor.prototype.constructor = exitdoor;
function exitdoor(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.enable(this);
this.body.CollideWorldBounds = true;
this.animations.add('teleport', ['door02', 'door03', 'door04', 'door05', 'door06'], 5, false);
this.frameName  = "door01";

}

exitdoor.prototype.update = function()
{
	
}

exitdoor.prototype.sprite = function()
{
	return this.body.sprite;
}

exitdoor.prototype.teleport = function()
{
	this.animations.play('teleport');
}

exitdoor.prototype.recover = function()
{
	this.frameName  = "door01";
}
