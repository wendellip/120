boss.prototype = Object.create(Phaser.Sprite.prototype);
boss.prototype.constructor = boss;

function boss(game, key, frame, x, y, red, blue, yellow)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.p2.enable(this);
this.body.enable = true;
this.body.fixedRotation = true;
this.health = 3;
this.invincible = false;
this.body.static = true;
this.reds = red;
this.blues = blue;
this.yellows = yellow;
this.attacking = false;
this.speed = 0;
}

boss.prototype.update = function()
{	
	this.body.velocity.x = this.speed;
	if(this.health <= 0)
		return true;
	else if(!this.attacking && this.health > 0)
	{
		this.attacking = true;
		game.time.events.add(game.rnd.integerInRange(4, 8) * 1000, this.attack, this);
	}
	return false;
}

boss.prototype.hitted = function(hand, boss, lever1, lever2, lever3)
{
	if(!this.invincible)
	{
		this.health = this.health - 1;
		if(this.health > 0)
		{
			this.invincible = true;
			this.reds.forceoff();
			this.blues.forceoff();
			this.yellows.forceoff();
			game.time.events.add(Phaser.Timer.SECOND * 5, this.backtonormal, this);
		}
		else
			this.death();
	}
}

boss.prototype.backtonormal = function()
{
	this.invincible = false;
	this.attacking = false;
	this.speed = 0
}

boss.prototype.death = function()
{

}

boss.prototype.attack = function()
{
	if(!this.invincible && this.health > 0)
	{
		this.invincible = true;
		this.speed = 84;
		game.time.events.add(Phaser.Timer.SECOND * 2, this.gofront, this);
		game.time.events.add(Phaser.Timer.SECOND * 5, this.goback, this);
		game.time.events.add(Phaser.Timer.SECOND * 9, this.backtonormal, this);
	}


}

boss.prototype.gofront = function()
{
	this.speed = -400;
}

boss.prototype.goback = function()
{
	this.speed = 258;
}

boss.prototype.sprite = function()
{
	return this.body.sprite;
}