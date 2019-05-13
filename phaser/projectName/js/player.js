player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;

function player(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);

game.physics.enable(this);
this.anchor.set(0.5);
this.body.setCircle(32, 13, 20);
this.body.CollideWorldBounds = true;
this.body.gravity.y = 500;
this.body.rotation = false;
}


player.prototype.update = function()
{

	if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && (this.body.blocked.down || this.body.touching.down))
	{
		this.body.velocity.y = -375;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	{
		this.body.velocity.x = 300;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
	{
		this.body.velocity.x = -300;
	}
	else
	{
		this.body.velocity.x = 0;
	}

}