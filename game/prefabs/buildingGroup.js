'use strict';

var Building = require('./building');

var BuildingGroup = function(game, parent) {
  Phaser.Group.call(this, game, parent);
  this.firstBuilding = new Building(this.game, 0, 0, 0);
  this.add(this.firstBuilding);
  
  this.hasScored = false;
  this.setAll('body.velocity.x', -200);
};

BuildingGroup.prototype = Object.create(Phaser.Group.prototype);
BuildingGroup.prototype.constructor = BuildingGroup;

BuildingGroup.prototype.update = function() {
  this.checkWorldBounds(); 
};

BuildingGroup.prototype.checkWorldBounds = function() {
  if(!this.firstBuilding.inWorld) {
    this.exists = false;
  }
};


BuildingGroup.prototype.reset = function(x, y) {
  this.firstBuilding.reset(0, 0);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -200);
  this.hasScored = false;
  this.exists = true;
  console.log('called reset function within building group');
};


BuildingGroup.prototype.stop = function() {
  // this.setAll('body.velocity.x', 0);
};

module.exports = BuildingGroup;