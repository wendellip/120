missile.prototype = Object.create(Phaser.Sprite.prototype);
missile.prototype.constructor = missile;

function missile(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.enable(this);
this.body.enable = true;
this.body.CollideWorldBounds = true;
this.rotation = Math.PI;
}

missile.prototype.update = function()
{
	
}

missile.prototype.sprite = function()
{
	return this.body.sprite;
}