hand.prototype = Object.create(Phaser.Sprite.prototype);
hand.prototype.constructor = hand;
function hand(game, key, frame, x, y, player)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.anchor.x = 2;
this.anchor.y = 2;
this.scale.setTo(.1);
game.physics.p2.enable(this);
this.body.CollideWorldBounds = true;
this.body.rotation=true;
this.health==2;
this.hand2 = undefined;
this.gothand = true;
}


hand.prototype.update = function(player)
{
	//the arm rotates with player's movement
	this.rotation = game.physics.angleToPointer(player);
	if(game.input.activePointer.isDown && this.gothand)
	{
		this.gothand = false;
		this.destroy();
		this.hand2 =new hand2(game, 'hand', 0, this.position.x+player.position.x, this.position.y+player.position.y);
		game.physics.arcade.moveToPointer(this.hand2, 1000);
  		timer = game.time.create(game,true);
  		timer.add(2000, changepickup, this, newhand);
   		timer.start();
   		newhand.setHealth(1);
	}
	return this.hand2;
}