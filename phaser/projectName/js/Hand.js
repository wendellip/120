hand.prototype = Object.create(Phaser.Sprite.prototype);
hand.prototype.constructor = hand;
function hand(game, key, frame, x, y)
{
Phaser.Sprite.call(this, game, x, y, key, frame);
this.anchor.set(0.5,0.5);
this.scale.setTo(.1);
game.physics.enable(this);
this.anchor.set(0,1);
this.body.CollideWorldBounds = true;
this.body.rotation=true;
this.body.gravity.y = 0;
this.health==2;


}


hand.prototype.update = function()
{
}