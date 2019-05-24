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
this.jumpb = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);﻿﻿
this.jump = 1;
this.jumpTimer = 0;

}


player.prototype.update = function(chara)
{
	//moving and jumping
    if (this.jumpb.isDown && game.time.now > this.jumpTimer && checkIfCanJump(chara))
    {
        this.body.moveUp(300);
        this.jumpTimer = game.time.now + 750;
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

function jumping()
{
	if(this.jump > 0)
	{
		this.jumpse.play('', 0, 1, false);
		this.jump = this.jump - 1;
		this.body.velocity.y -= 390;
	}
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
