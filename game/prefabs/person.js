
var Person = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'person_1', frame);
  this.anchor.setTo(0.5, 0.5);
  // this.animations.add('flap');
  // this.animations.play('flap', 12, true);
  this.animations.add('walk');
  this.animations.play('walk', 10, true);
  // this.flapSound = this.game.add.audio('flap');

  this.name = 'person_1';
  this.alive = false;
  this.onGround = false;


  // enable physics on the Person
  // and disable gravity on the Person
  // until the game is started
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  // this.body.collideWorldBounds = true;

  // this.events.onKilled.add(this.onKilled, this);

  
  
};

Person.prototype = Object.create(Phaser.Sprite.prototype);
Person.prototype.constructor = Person;

Person.prototype.update = function() {
  // check to see if our angle is less than 90
  // if it is rotate the Person towards the ground by 2.5 degrees
  // if(this.angle < 90 && this.alive) {
    // this.angle += 2.5;
  // } 

  if(!this.alive) {
    this.body.velocity.x = -0;

  }

   this.body.x -= 2;
    if (this.body.x < -this.body.width)
    {
        this.body.x = this.game.world.width;
    }




};

Person.prototype.walking = function() {
    // this.walk = this.person.animations.add('walk');
    

  if(!!this.alive) {
    this.animations.play('walk', 20, true);
    // this.flapSound.play();
    //cause our Person to "jump" upward
    // this.body.velocity.y = -400;
    // rotate the Person to -40 degrees
    // this.game.add.tween(this).to({angle: -40}, 100).start();
  }
};

// Person.prototype.shit = function() {
  // if(!!this.alive) {
    // this.shit = new Shit(this.game, 100, this.game.height/2);
//     this.game.add.existing(this.shit);

    // console.log("Im shittttttinnnnnnn")
    // this.shit = new Shit(this.game, 100, this.game.height/2);
    // this.game.add.existing(this.shit);
  // }
// }

Person.prototype.revived = function() { 
};

Person.prototype.onKilled = function() {
  // this.exists = true;
  // this.visible = true;
  // this.animations.stop();
  // var duration = 90 / this.y * 300;
  // this.game.add.tween(this).to({angle: 90}, duration).start();
  // console.log('killed');
  // console.log('alive:', this.alive);
};

module.exports = Person;

