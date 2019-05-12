player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;

function player(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.p2.enable(this, true);
this.scale.set(0.175);
this.body.setCircle(32);
this.body.CollideWorldBounds = true;
}


player.prototype.update = function()
{
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
	{
		this.body.velocity.y = -400;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
	{
		this.body.velocity.y = 400;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	{
		this.body.velocity.x = 400;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
	{
		this.body.velocity.x = -400;
	}
	else
	{
		this.body.velocity.x = 0;
	}

}