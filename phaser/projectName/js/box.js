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
this.body.mass = 100;

}


box.prototype.update = function()
{

}