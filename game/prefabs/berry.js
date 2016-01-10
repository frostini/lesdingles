'use strict';

var Berry = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'berry', frame);
  this.anchor.setTo(0.5, 0.5);
  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true ;
};

Berry.prototype = Object.create(Phaser.Sprite.prototype);
Berry.prototype.constructor = Berry;

Berry.prototype.update = function() {
  // Berry.prototype.appear = function() {
  // 	this.body.velocity.x = -100;
  // };
  // // write your prefab's specific update code here
  
};

module.exports = Berry;
