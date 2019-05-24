exitdoor.prototype = Object.create(Phaser.Sprite.prototype);
exitdoor.prototype.constructor = exitdoor;
function exitdoor(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.scale.setTo(.5);
game.physics.enable(this);
this.body.setSize(80, 80, 0, 160);
this.body.CollideWorldBounds = true;


}


hand2.prototype.update = function()
{
}