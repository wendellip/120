handstation.prototype = Object.create(Phaser.Sprite.prototype);
handstation.prototype.constructor = handstation;
function handstation(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.scale.setTo(.1);
game.physics.enable(this);
this.body.CollideWorldBounds = true;
this.hand = undefined;

}

handstation.prototype.update = function()
{
	
}

handstation.prototype.takearm = function()
{
	// if player interacting the station, create a new arm
	this.hand = new hand(game, 'hand', 0, 0, 0);
	return this.hand;
}

handstation.prototype.sprite = function()
{
	return this.body.sprite;
}
