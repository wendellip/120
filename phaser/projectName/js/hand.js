hand.prototype = Object.create(Phaser.Sprite.prototype);
hand.prototype.constructor = hand;
function hand(game, key, frame, x, y, player)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.anchor.x = 2;
this.anchor.y = 2;
this.scale.setTo(.1);
game.physics.enable(this);
this.body.CollideWorldBounds = true;
this.body.rotation=true;
this.body.gravity.y = 0;
this.health==2;

}


hand.prototype.update = function(player)
{
	this.rotation = game.physics.arcade.angleToPointer(player);

}