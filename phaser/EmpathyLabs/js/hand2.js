hand2.prototype = Object.create(Phaser.Sprite.prototype);
hand2.prototype.constructor = hand2;
function hand2(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.anchor.set(0.5,0.5);
game.physics.p2.enable(this);
this.body.enable = true;
this.body.CollideWorldBounds = true;
this.handdestroy = false;

}


hand2.prototype.update = function()
{
	//if the arm slows down and hit almost zero, destroy the projectile arm
	if(this.body == null)
		return true;
	if(this.body.velocity.x < 1 && this.body.velocity.y < 1 
	&& this.body.velocity.x > -1 && this.body.velocity.y > -1)
	{
		this.destroy();
		this.handdestroy = true;
		return true;
	}
	else
		return false;
}