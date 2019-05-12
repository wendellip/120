box.prototype = Object.create(Phaser.Sprite.prototype);
box.prototype.constructor = box;

function box(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

// Enable P2 physics on the player
game.physics.p2.enable(this, true);
this.body.CollideWorldBounds = true;
}


box.prototype.update = function(hitplayer)
{


}