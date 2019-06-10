handstation.prototype = Object.create(Phaser.Sprite.prototype);
handstation.prototype.constructor = handstation;
function handstation(game, key, frame, x, y,jumpkey, staticsound)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.enable(this);
this.body.CollideWorldBounds = true;
this.hand = undefined;
this.whooshsound=jumpkey;
this.pickupsound=game.add.audio(staticsound);
}

handstation.prototype.update = function()
{
	
}

handstation.prototype.takearm = function()
{
	// if player interacting the station, create a new arm
	this.pickupsound.play();
	this.hand = new hand(game, 'hand', 0, 0, 0, this.whooshsound);
	return this.hand;
}

handstation.prototype.sprite = function()
{
	return this.body.sprite;
}
