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

exitdoor.prototype.update = function()
{
	
}

exitdoor.prototype.sprite = function()
{
	return this.body.sprite;
}

exitdoor.prototype.checkoverlap = function(spriteA, spriteB)
{
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}