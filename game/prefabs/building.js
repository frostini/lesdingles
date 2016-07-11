
var Building = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'building_1', frame);
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);
  // this.name = 'building_1';
  // this.alive = false;
  // this.onGround = false;
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building;

Building.prototype.update = function() {
  // if(!this.alive) {
  //   this.body.velocity.x = 50;
  // }

  //  this.body.x -= 2;
  //   if (this.body.x < -this.body.width)
  //   {
  //       this.body.x = this.game.world.width;
  //   }

};

Building.prototype.walking = function() {
  // if(!!this.alive) {
  // }
};
Building.prototype.revived = function() { 
};

Building.prototype.onKilled = function() {
};

module.exports = Building;

