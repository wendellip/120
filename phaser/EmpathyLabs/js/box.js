box.prototype = Object.create(Phaser.Sprite.prototype);
box.prototype.constructor = box;

function box(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.p2.enable(this);
this.body.enable = true;
this.body.CollideWorldBounds = true;
this.body.fixedRotation = true;
this.body.friction = 0;
this.body.mass = 50;

}


box.prototype.update = function()
{

}

box.prototype.floating = function()
{
	this.body.reset(this.body.x, this.body.y-0.5);
	this.body.data.gravityScale = 0;
	game.time.events.add(Phaser.Timer.SECOND * 1, recover, this);
}

box.prototype.sprite = function()
{
	return this.body.sprite;
}

function recover()
{
	this.body.data.gravityScale = 1;
}