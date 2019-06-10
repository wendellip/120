hand.prototype = Object.create(Phaser.Sprite.prototype);
hand.prototype.constructor = hand;
function hand(game, key, frame, x, y, jumpkey)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.scale.setTo(.1);
this.pivot.x = 100;
this.anchor.set(2);
this.gothand = true;
this.hand2 = undefined;
this.soundwhoosh=game.add.audio(jumpkey);
}


hand.prototype.update = function()
{
	//the arm rotates
	this.rotation += 0.1;
}

hand.prototype.newhand = function(player)
{
	//if player click and shoot an arm
	if(this.gothand)
	{	
		this.gothand = false;
		this.destroy();
		//destroy the rotating arm and create a arm interacting with the environment
		//calculation its projectile direction according to player and pointer
		this.hand2 =new hand2(game, 'hand', 0, player.position.x, player.position.y);
		var xd = (game.input.x - player.position.x) * (game.input.x - player.position.x);
		var yd = (game.input.y - player.position.y) * (game.input.y - player.position.y);
		var sum = xd + yd;
		if (game.input.x < player.position.x)
			this.hand2.body.velocity.x = -1000 * xd / sum;
		else
			this.hand2.body.velocity.x = 1000 * xd / sum;
		if (game.input.y < player.position.y)
			this.hand2.body.velocity.y = -1000 * yd / sum;
		else
			this.hand2.body.velocity.y = 1000 * yd / sum;	
	}
	this.soundwhoosh.play();
	return this.hand2; 
}

hand.prototype.resethand = function()
{
	this.gothand = true;
}