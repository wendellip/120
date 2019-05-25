hand.prototype = Object.create(Phaser.Sprite.prototype);
hand.prototype.constructor = hand;
function hand(game, key, frame, x, y)
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
this.newhand = undefined;
this.shot = false;
}


hand.prototype.update = function(player)
{
	//the arm rotates with player's movement
	this.rotation = game.physics.arcade.angleToPointer(player);
	if(game.input.activePointer.isDown && !this.shot)
	{
		this.shot = true;
		this.destroy();
		this.newhand = new hand2(game, 'hand', 0, this.position.x+player.position.x, this.position.y+player.position.y);
		game.physics.arcade.moveToPointer(this.newhand, 1000);
	}
	return this.newhand;
}