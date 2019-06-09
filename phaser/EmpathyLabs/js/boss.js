boss.prototype = Object.create(Phaser.Sprite.prototype);
boss.prototype.constructor = boss;

function boss(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.p2.enable(this);
this.body.enable = true;
this.body.fixedRotation = true;
this.health = 3;
this.invincible = false;
this.body.static = true;

}

boss.prototype.update = function()
{
	if(this.health == 0)
		return true;
	else
		return false;
}

boss.prototype.hitted = function()
{
	if(!this.invincible)
	{
		this.health = this.health - 1;
		this.invincible = true;
		game.time.events.add(Phaser.Timer.SECOND * 5, this.backtonormal, this);
	}
}

boss.prototype.backtonormal = function()
{
	this.invincible = false;
}