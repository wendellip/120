hand2.prototype = Object.create(Phaser.Sprite.prototype);
hand2.prototype.constructor = hand2;
function hand2(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.anchor.set(0.5,0.5);
this.scale.setTo(.1);
game.physics.enable(this);
this.anchor.set(0,1);
this.body.CollideWorldBounds = true;
this.body.rotation=true;
this.body.gravity.y = 900;
this.pickup = true;
this.newhand = undefined;
}


hand2.prototype.update = function(colliding)
{

	//enable picking the arm
	if(this.pickup && colliding)
	{
		this.destroy();
		this.newhand = new hand(game, 'hand', 0, 50,50);
	}
	return this.newhand;
}
