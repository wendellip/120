hand.prototype = Object.create(Phaser.Sprite.prototype);
hand.prototype.constructor = hand;
function hand(game, key, frame, x, y, player)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.scale.setTo(.1);
this.pivot.x = 100;
this.anchor.set(2);
this.hand2 = undefined;
this.gothand = true;
}


hand.prototype.update = function(player)
{
	//the arm rotates with player's movement
	this.rotation += 0.1;
	if(game.input.activePointer.isDown && this.gothand)
	{
		this.gothand = false;
		this.destroy();
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
	return this.hand2; 
}


function moveHand(player, hand2)
{
	var dx = player.body.x - hand2.x;
	var dy = player.body.y - hand2.y;
	handrotation= Math.atan2(dy, dx);
	hand2.body.rotation = handrotation + game.math.degToRad(-90);
	var angle = hand2.body.rotation + (Math.PI / 2);
	hand2.body.velocity.x = 300 * Math.cos(angle);
	hand2.body.velocity.y = 300 * Math.sin(angle);
}