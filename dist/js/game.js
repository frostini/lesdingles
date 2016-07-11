(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';


var BootState = require('./states/boot');
var MenuState = require('./states/menu');
var PlayState = require('./states/play');
var PreloadState = require('./states/preload');

var game = new Phaser.Game(288, 505, Phaser.AUTO, 'dingleberries');

// Game States
game.state.add('boot', BootState);
game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.add('preload', PreloadState);


game.state.start('boot');

  
},{"./states/boot":11,"./states/menu":12,"./states/play":13,"./states/preload":14}],2:[function(require,module,exports){
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

},{"./berry":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
  'use strict';
  // var Shit = require('../prefabs/shit'); 

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('flap');
  this.animations.play('flap', 20, true);

  this.flapSound = this.game.add.audio('flap');

  this.name = 'bird';
  this.alive = false;
  this.onGround = false;


  // enable physics on the bird
  // and disable gravity on the bird
  // until the game is started
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = true;


  this.events.onKilled.add(this.onKilled, this);

  
  
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  // check to see if our angle is less than 90
  // if it is rotate the bird towards the ground by 2.5 degrees
  if(this.angle < 90 && this.alive) {
    this.angle += 2.5;
  } 

  if(!this.alive) {
    this.body.velocity.x = 0;
  }
};

Bird.prototype.flap = function() {
  if(!!this.alive) {
    this.flapSound.play();
    //cause our bird to "jump" upward
    this.body.velocity.y = -400;
    // rotate the bird to -40 degrees
    this.game.add.tween(this).to({angle: -40}, 100).start();
  }
};

// Bird.prototype.shit = function() {
  // if(!!this.alive) {
    // this.shit = new Shit(this.game, 100, this.game.height/2);
//     this.game.add.existing(this.shit);

    // console.log("Im shittttttinnnnnnn")
    // this.shit = new Shit(this.game, 100, this.game.height/2);
    // this.game.add.existing(this.shit);
  // }
// }

Bird.prototype.revived = function() { 
};

Bird.prototype.onKilled = function() {
  this.exists = true;
  this.visible = true;
  this.animations.stop();
  var duration = 90 / this.y * 300;
  this.game.add.tween(this).to({angle: 90}, duration).start();
  console.log('killed');
  console.log('alive:', this.alive);
};

module.exports = Bird;


},{}],5:[function(require,module,exports){

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


},{}],6:[function(require,module,exports){
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
},{"./building":5}],7:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');
  // start scrolling our ground
  this.autoScroll(-300,0);
  
  // enable physics on the ground sprite
  // this is needed for collision detection
  this.game.physics.arcade.enableBody(this);
      
  // we don't want the ground's body
  // to be affected by gravity or external forces
  this.body.allowGravity = false;
  this.body.immovable = true;


};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Ground;
},{}],8:[function(require,module,exports){

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


},{}],9:[function(require,module,exports){
'use strict';

var Scoreboard = function(game) {
  
  var gameover;
  
  Phaser.Group.call(this, game);
  gameover = this.create(this.game.width / 2, 100, 'gameover');
  gameover.anchor.setTo(0.5, 0.5);

  this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
  this.scoreboard.anchor.setTo(0.5, 0.5);
  
  this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'flappyfont', '', 18);
  this.add(this.scoreText);
  
  this.bestText = this.game.add.bitmapText(this.scoreboard.width, 230, 'flappyfont', '', 18);
  this.add(this.bestText);

  // add our start button with a callback
  this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
  this.startButton.anchor.setTo(0.5,0.5);

  this.add(this.startButton);

  this.y = this.game.height;
  this.x = 0;
  
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score) {
  var coin, bestScore;
  this.scoreText.setText(score.toString());
  if(!!localStorage) {
    bestScore = localStorage.getItem('bestScore');
    if(!bestScore || bestScore < score) {
      bestScore = score;
      localStorage.setItem('bestScore', bestScore);
    }
  } else {
    bestScore = 'N/A';
  }

  this.bestText.setText(bestScore.toString());

  if(score >= 10 && score < 20)
  {
    coin = this.game.add.sprite(-65 , 7, 'medals', 1);
  } else if(score >= 20) {
    coin = this.game.add.sprite(-65 , 7, 'medals', 0);
  }

  this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);

  if (coin) {
    
    coin.anchor.setTo(0.5, 0.5);
    this.scoreboard.addChild(coin);
    
     // Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
    var emitter = this.game.add.emitter(coin.x, coin.y, 400);
    this.scoreboard.addChild(emitter);
    emitter.width = coin.width;
    emitter.height = coin.height;


    //  This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
    // emitter.width = 800;

    emitter.makeParticles('particle');

    // emitter.minParticleSpeed.set(0, 300);
    // emitter.maxParticleSpeed.set(0, 600);

    emitter.setRotation(-100, 100);
    emitter.setXSpeed(0,0);
    emitter.setYSpeed(0,0);
    emitter.minParticleScale = 0.25;
    emitter.maxParticleScale = 0.5;
    emitter.setAll('body.allowGravity', false);

    emitter.start(false, 1000, 1000);
    
  }
};

Scoreboard.prototype.startClick = function() {
  this.game.state.start('play');
};





Scoreboard.prototype.update = function() {
  // write your prefab's specific update code here
};

module.exports = Scoreboard;

},{}],10:[function(require,module,exports){
// 'use strict';

// var Shit = function(game, x, y, frame) {
  // Phaser.Sprite.call(this, game, x, y, 'shit', frame);
	// this.game.physics.arcade.enableBody(this);
  // initialize your prefab here
  
// };

// Shit.prototype = Object.create(Phaser.Sprite.prototype);
// Shit.prototype.constructor = Shit;

// Shit.prototype.update = function() {
  
  // write your prefab's specific update code here
  
// };

// module.exports = Shit;



},{}],11:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],12:[function(require,module,exports){

'use strict';
function Menu() {
    // this.poo = {}
}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    // add the background sprite
    this.background = this.game.add.sprite(0,0,'background');
    
    // add the ground sprite as a tile
    // and start scrolling in the negative x direction
    this.ground = this.game.add.tileSprite(0,448, 335,56,'ground');
    this.ground.autoScroll(-200,0);

    /** STEP 1 **/
    // create a group to put the title assets in 
    // so they can be manipulated as a whole
    this.titleGroup = this.game.add.group()
      
    /** STEP 2 **/
    // create the title sprite
    // and add it to the group
    this.title = this.add.sprite(0,0,'title');
    this.titleGroup.add(this.title);
    
    /** STEP 3 **/
    // create the bird sprite 
    // and add it to the title group
    this.bird = this.add.sprite(200,5,'bird');
    this.titleGroup.add(this.bird);
    
    /** STEP 4 **/
    // add an animation to the bird
    // and begin the animation
    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 12, true);
    
    /** STEP 5 **/
    // Set the originating location of the group
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    /** STEP 6 **/
    //  create an oscillating animation tween for the group
    this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5);

    // var poo = this.game.add.image(0,0,'shit');
    // poo.enableBody = true;
    // poo.scale.setTo(1,1);
  },
  startClick: function() {
    // start button click handler
    // start the 'play' state
    this.game.state.start('play');
  }
};

module.exports = Menu;

},{}],13:[function(require,module,exports){
'use strict';
var Bird = require('../prefabs/bird');
var Ground = require('../prefabs/ground');
var Berry = require('../prefabs/berry');
var Berries = require('../prefabs/berries');
var Person1 = require('../prefabs/person_1');
var BuildingGroup = require('../prefabs/buildingGroup');
var Scoreboard = require('../prefabs/scoreboard');
var Shit = require('../prefabs/shit');

function Play() {
}
Play.prototype = {
  create: function() {
    // start the phaser arcade physics engine
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    // give our world an initial gravity of 1200
    this.game.physics.arcade.gravity.y = 1200;

    // add the background sprite
    this.background = this.game.add.sprite(0,0,'background');

    
    // create and add a new Bird object
    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);
    
    // create person to instantiate on game start
    this.person_1 = new Person1(this.game, this.game.width, 400);

// !!Creating group to contain buildingGroups!!
    this.buildings = this.game.add.group();

    // create and add a new Ground object
    this.losberries = this.game.add.group()


    this.ground = new Ground(this.game, 0, 450, 335, 112);
    this.game.add.existing(this.ground);
    

    // add keyboard controls
    this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.flapKey.onUp.addOnce(this.startGame, this);
    this.flapKey.onUp.add(this.bird.flap, this.bird);
    
    this.hitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.hitKey.onDown.add(this.yay, this);

    // this.flapKey.onHold.add(this.bird.shit, this.bird);
   //for .flap-consider using "this.onTap = null;" instead of onDown for

    // add mouse/touch controls
    this.game.input.onUp.addOnce(this.startGame, this);
    this.game.input.onUp.add(this.bird.flap, this.bird);
    // this.game.input.isDown.add(this.bird.shit, this.bird);
    

    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    

    this.score = 0;
    this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);

    this.instructionGroup = this.game.add.group();
    this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100,'getReady'));
    this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 180,'instructions'));
    this.instructionGroup.setAll('anchor.x', 0.5);
    this.instructionGroup.setAll('anchor.y', 0.5);

    this.gameover = false;

    // this.pipeHitSound = this.game.add.audio('pipeHit');
    this.groundHitSound = this.game.add.audio('groundHit');
    this.scoreSound = this.game.add.audio('score');
    // this.timer = this.game.time.events.loop(5000, this.addOneTreat, this);


  },

  update: function() {
 
   // this.person.x -= 2;
   //  if (this.person.x < -this.person.width)
   //    {this.person.x = this.game.world.width;
   //  }

    // enable collisions between the bird and the ground
    this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
    // this.game.physics.arcade.collide(this.person, this.poo, this.shittySituation, null, this);
    this.game.physics.arcade.collide(this.person_1, this.poo, this.shittySituation, null, this);
    // this.game.physics.arcade.collide(this.bird, this.BuildingGroup, this.deathHandler, null, this);
   
    this.buildings.forEach(function(buildingGroup) {
        this.game.physics.arcade.collide(this.bird, buildingGroup, this.deathHandler, null, this);
    }, this);

  },
  generateBuildings: function(){
    console.log('called buildingGenerator');
    var buildingGroup = this.buildings.getFirstExists(false);
    if (!buildingGroup) { 
        buildingGroup = new BuildingGroup(this.game, this.buildings);
        // buildingGroup.x = this.game.width;
        // buildingGroup.y = 300;
    }
    buildingGroup.reset(this.game.width, 252);
  },
  shittySituation: function(person, poo){
    console.log('i got yayyyyeed');
  },
  yay: function(){
    console.log('yayyed');
    this.poo = this.add.sprite(this.bird.x, this.bird.y, 'shit');
    this.game.physics.arcade.enableBody(this.poo);

  },
  generateBerries: function() {
    console.log("Berrrrrries")
    var berryY = this.game.rnd.integerInRange(0, 150);
    var berriesGroup = new Berries(this.game);
    berriesGroup.x = this.game.width;
    berriesGroup.y = berryY;
  },
  shutdown: function() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.scoreboard.destroy();
  },
  startGame: function() {
    if(!this.bird.alive && !this.gameover) {
        this.bird.body.allowGravity = true;
        this.bird.alive = true;
        this.instructionGroup.destroy();
        this.game.add.existing(this.person_1);
        this.buildingGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generateBuildings, this);
        this.buildingGenerator.timer.start();
        this.berrygenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 5.00, this.generateBerries, this);
        this.berrygenerator.timer.start();

    }
  },
  checkScore: function(pipeGroup) {
    // if(pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
        // pipeGroup.hasScored = true;
        // this.score++;
        // this.scoreText.setText(this.score.toString());
        // this.scoreSound.play();
    // }
  },
  deathHandler: function(bird, enemy) {
    if(enemy instanceof Ground && !this.bird.onGround) {
        this.groundHitSound.play();
        this.scoreboard = new Scoreboard(this.game);
        this.game.add.existing(this.scoreboard);
        this.scoreboard.show(this.score);
        this.bird.onGround = true;
    } // else if (enemy instanceof Pipe){
        // this.pipeHitSound.play();
    // }

    if(!this.gameover) {
        this.gameover = true;
        this.bird.kill();
        this.berrygenerator.timer.stop();
        this.buildings.callAll('stop');
        this.buildingGenerator.timer.stop();
        this.ground.stopScroll();
    }
    
  },
  render: function(){
      this.game.debug.body(this.person_1);
    if (this.poo){
      this.game.debug.body(this.poo);
    }
  }
};

module.exports = Play;

},{"../prefabs/berries":2,"../prefabs/berry":3,"../prefabs/bird":4,"../prefabs/buildingGroup":6,"../prefabs/ground":7,"../prefabs/person_1":8,"../prefabs/scoreboard":9,"../prefabs/shit":10}],14:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('background', 'assets/city_skyline_1.png');
    this.load.image('ground', 'assets/road_me_doo.png');
    this.load.image('title', 'assets/title.png');
    this.load.spritesheet('building_1', 'assets/building_7.png', 83, 317, 1);
    this.load.spritesheet('bird', 'assets/bird_sprite_1.png', 50,44,8);
    this.load.spritesheet('person', 'assets/hannah_sprite_3.png', 36, 70, 4);
    this.load.spritesheet('person_1', 'assets/hannah_sprite_3.png', 36, 70, 4);
    // this.load.spritesheet('pipe', 'assets/pipes.png', 54,320,2);
    this.load.image('startButton', 'assets/start-button.png');
    this.load.spritesheet('shit', 'assets/shit.png', 12,12,1);
    this.load.spritesheet('berry', 'assets/berry.png', 10, 10, 1);

    this.load.image('instructions', 'assets/instructable.png');
    this.load.image('getReady', 'assets/get-ready.png');
    
    this.load.image('scoreboard', 'assets/scoreboard.png');
    this.load.spritesheet('medals', 'assets/medals.png',44, 46, 2);
    this.load.image('gameover', 'assets/gameover.png');
    this.load.image('particle', 'assets/particle.png');

    this.load.audio('flap', 'assets/flap.wav');
    this.load.audio('pipeHit', 'assets/pipe-hit.wav');
    this.load.audio('groundHit', 'assets/ground-hit.wav');
    this.load.audio('score', 'assets/score.wav');
    this.load.audio('ouch', 'assets/ouch.wav');

    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])