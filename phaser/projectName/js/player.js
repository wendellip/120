player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;

function player(game, key, frame, x, y, jumpkey)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
game.physics.p2.enable(this);
this.body.enable = true;
this.body.setCircle(32);
this.body.CollideWorldBounds = true;
this.body.fixedRotation = true;
this.jumpse = game.add.audio(jumpkey);
this.jumpb = game.input.keyboard.addKey(Phaser.Keyboard.W);﻿﻿
this.jumpTimer = 0;
this.body.force = 10000;
}


player.prototype.update = function(control)
{
	if(control == undefined)
		return;
	if(control)
	{
		if (game.time.now > this.jumpTimer && checkIfCanJump(this))
		{
			if(this.jumpb.isDown)
			{
				this.body.moveUp(325);
				this.body.force = 0;
				this.jumpTimer = game.time.now + 750;
			}
			else
			{
				this.body.force = 5;
			}
		}
		else
		{
			this.body.force = 0;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.D))
		{
			this.body.moveRight(200);
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.A))
		{
			this.body.moveLeft(200);
		}
		else
		{
			this.body.velocity.x = 0;
		}
	}
	else
	{
		this.body.velocity.x = 0;
	}


}

player.prototype.sprite = function()
{
	return this.body.sprite;
}

player.prototype.collexception = function(body1, body2)
{
	if(body1 == undefined || body2 == undefined || body1.sprite == null || body2.sprite == null)
		return true;
	if((body1.sprite.key == "player" && body2.sprite.key == "hand") ||
	   (body2.sprite.key == "player" && body1.sprite.key == "hand") ||
	   (body1.sprite.key == "player" && body2.sprite.key == "enplatform") ||
	   (body2.sprite.key == "player" && body1.sprite.key == "enplatform"))
	{
		return false;
	}
	else
		return true;
}

player.prototype.death = function()
{
	console.log("death");
	return;
}

function checkIfCanJump(chara) {

    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

		if(chara != undefined)
		{
			if (c.bodyA === chara.body.data || c.bodyB === chara.body.data)
			{
				var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
				if (c.bodyA === chara.body.data) d *= -1;
				if (d > 0.5) result = true;
			}
		}
    }
    return result;
}
