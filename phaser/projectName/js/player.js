player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;

function player(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.enable(this);
this.enableBody = true;
this.scale.set(0.175);
this.anchor.set(0);
this.body.CollideWorldBounds = true;
this.body.gravity.y = 500;


}


player.prototype.update = function()
{
	if((game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.body.blocked.down )|| 
	(game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.body.touching.down))
	{
		this.body.velocity.y -= 400;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	{
		this.body.velocity.x = 125;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
	{
		this.body.velocity.x = -125;
	}
	else
	{
		this.body.velocity.x = 0;
	}

}