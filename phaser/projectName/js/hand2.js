hand2.prototype = Object.create(Phaser.Sprite.prototype);
hand2.prototype.constructor = hand2;
function hand2(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.anchor.set(0.5,0.5);
this.scale.setTo(.1);
game.physics.p2.enable(this);
this.body.enable = true;
this.body.CollideWorldBounds = true;
this.isconnected==0;
this.health=2;


}


hand2.prototype.update = function(colliding)
{
	//enable picking the arm
	if(this.health == 2 && colliding)
	{
		return this.health;
	}
	else
		return false;
}