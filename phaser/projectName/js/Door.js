exitdoor.prototype = Object.create(Phaser.Sprite.prototype);
exitdoor.prototype.constructor = exitdoor;
function exitdoor(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.anchor.set(0.5,0.5);
this.scale.setTo(.3);
game.physics.enable(this);
this.body.CollideWorldBounds = true;


}


hand2.prototype.update = function()
{
}