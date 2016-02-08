'use strict';
var Berry = require('./berry')

var Berries = function(game, parent) {
  Phaser.Group.call(this, game, parent);
  this.firstBerry = new Berry(this.game,0,0,0);
  this.add(this.firstBerry)
  this.setAll('body.velocity.x', - 150);
  // initialize your prefab here
  
};

Berries.prototype = Object.create(Phaser.Group.prototype);
Berries.prototype.constructor = Berries;

Berries.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Berries;
