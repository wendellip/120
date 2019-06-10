missile.prototype = Object.create(Phaser.Sprite.prototype);
missile.prototype.constructor = missile;

function missile(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.p2.enable(this);
this.body.clearShapes();
this.body.loadPolygon("missilephy", "missile");
this.body.enable = true;
this.body.CollideWorldBounds = true;
var empty = game.physics.p2.createCollisionGroup();
this.body.collides(empty);
this.body.data.gravityScale = 0;
this.body.rotation = Math.PI;
}

missile.prototype.update = function()
{
	
}

missile.prototype.sprite = function()
{
	return this.body.sprite;
}