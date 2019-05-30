box.prototype = Object.create(Phaser.Sprite.prototype);
box.prototype.constructor = box;

function box(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.p2.enable(this, true);
this.body.CollideWorldBounds = true;
this.body.fixedRotation = true;
this.anchor.set(0.5);
this.scale.set(2);
this.body.mass = 150;
}


box.prototype.update = function(hitplayer)
{


}