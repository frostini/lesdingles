'use strict';
var Bird = require('../prefabs/bird');
var Ground = require('../prefabs/ground');
var Berry = require('../prefabs/berry');
var Berries = require('../prefabs/berries');
var Person1 = require('../prefabs/person_1');
var BuildingGroup = require('../prefabs/buildingGroup');
var Scoreboard = require('../prefabs/scoreboard');
// var Shit = require('../prefabs/shit');

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

    // create and add a group to hold our pipeGroup prefabs
    // this.pipes = this.game.add.group();
    
    // create and add a new Bird object
    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);
    
    // this.walk = this.person.animations.add('walk');
    // this.person_1 = new Person1(this.game, 200, 400);
    // this.game.add.existing(this.person_1);
    this.person = this.game.add.sprite(200, 350, 'person')
      this.person.animations.add('walk');
    this.person.animations.play('walk', 13, true); 
 this.game.physics.arcade.enableBody(this.person);
 this.person.body.allowGravity = false;


// !!Creating group to contain buildingGroups!!
this.buildings = this.game.add.group();



// this.BuildingGroup = new BuildingGroup(this.game);
// this.game.add.existing(this.BuildingGroup);


    // this.berry = new Berry(this.game, 200, 50, 1);
    // this.game.add.existing(this.berry);
    // adding berry
    // this.berries = this.game.add.group();
    // this.berries.createMultiple(10, 'berry');
    // this.berries.enablebody = true;
    //     this.shit = new Shit(this.game, 100, this.game.height/2);
    // this.game.add.existing(this.shit);
    // this.game.physics.arcade.enable(this.berries);
    // this.game.physics.enable(this.berries, Phaser.Physics.ARCADE);

    // this.berries.body.velocity.x = -500;

    // create and add a new Ground object
    this.losberries = this.game.add.group()


    // this.game.add.tween(person).to({x: -30}, 10000, Phaser.Easing.Linear.None, true);
// this.game.physics.enable(this.person, Phaser.Physics.ARCADE);
    // person.body.velocity.y = 0;
    // person.body.collideWorldBounds = true;
// this.person.body.immovable = true;


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

    // this.pipeGenerator = null;

    this.gameover = false;

    // this.pipeHitSound = this.game.add.audio('pipeHit');
    this.groundHitSound = this.game.add.audio('groundHit');
    this.scoreSound = this.game.add.audio('score');
    // this.timer = this.game.time.events.loop(5000, this.addOneTreat, this);





  },

  update: function() {
 
   this.person.x -= 2;
    if (this.person.x < -this.person.width)
    {
        this.person.x = this.game.world.width;
    }




    // enable collisions between the bird and the ground
    this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
    this.game.physics.arcade.collide(this.person, this.poo, this.shittySituation, null, this);
    // this.game.physics.arcade.collide(this.person_1, this.poo, this.shittySituation, null, this);
    // this.game.physics.arcade.collide(this.bird, this.BuildingGroup, this.deathHandler, null, this);
   
    this.buildings.forEach(function(buildingGroup) {
        this.game.physics.arcade.collide(this.bird, buildingGroup, this.deathHandler, null, this);
    }, this);




// if(!this.gameOver){
//     if(this.player.body.bottom >= this.world.bounds.bottom){
//         this.setGameOver();
//     }
// }

   // if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
   //  {
   //      this.bird.shit();
   //  }


    // if(!this.gameover) {    
    //     // enable collisions between the bird and each group in the pipes group
    //     this.pipes.forEach(function(pipeGroup) {
    //         this.checkScore(pipeGroup);
    //         this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
    //     }, this);
    // }

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
    // var yayy = this.add.image()
      this.poo = this.add.sprite(this.bird.x, this.bird.y, 'shit');
      this.game.physics.arcade.enableBody(this.poo);
        // poo.enableBody = true;
        // this.game.physics.enable(poo, Phaser.Physics.ARCADE);
        // poo.body.velocity.y = -500;0
        // poo.allowGravity = true;
        // poo.scale.setTo(1,1);

  // this.game.physics.arcade.enableBody(poo);
  // this.body.allowGravity = false;
  // this.body.collideWorldBounds = true;

  },
  generateBerries: function() {
    console.log("Berrrrrries")
    var berryY = this.game.rnd.integerInRange(0, 150);
    var berriesGroup = new Berries(this.game);
    berriesGroup.x = this.game.width;
    berriesGroup.y = berryY;
  },
  //   addOneTreat: function(x, y) {
  // var treat = this.berries.getFirstDead(),
  //     nth = Math.floor(Math.random()*5);
  //   treat.enablebody = true;
  //   treat.reset(this.game.width, 200);
  //   treat.body.allowGravity = false;
  //   treat.body.immovable = true;
  //   treat.body.velocity.x= -200;
  //   treat.body.velocity.y= 0;
  //   // treat.body.velocity.y= 0;
  //   // treat.body.immovable = true
  //   treat.checkWorldBounds = true;
  //   treat.outOfBoundsKill = true;
  //   console.log("yo im a berry")
  //   },

//   addBerries: function() {
//     for
//   }
//     addBlock: function() {
//   var treat = this.berries.getFirstDead(),
//       nth = Math.floor(Math.random()*5);

//   treat.reset(this.game.width, nth * this.game.height/5);
//   treat.body.velocity.x = -150;
//   treat.checkWorldBounds = true;
//   treat.outOfBoundsKill = true;
// },
  shutdown: function() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    // this.pipes.destroy();
    this.scoreboard.destroy();
  },
  startGame: function() {
    if(!this.bird.alive && !this.gameover) {
        this.bird.body.allowGravity = true;
        this.bird.alive = true;
        // add a timer
        // this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
        // this.pipeGenerator.timer.start();

        this.instructionGroup.destroy();
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
        // this.pipes.callAll('stop');
        // this.pipeGenerator.timer.stop();
        this.berrygenerator.timer.stop();
        this.ground.stopScroll();
    }
    
  },
  render: function(){
      // this.game.debug.body(this.person);
    // if (this.poo){
      // this.game.debug.body(this.poo);
    // }
  }
  //,
  // generatePipes: function() {
    // var pipeY = this.game.rnd.integerInRange(-100, 100);
    // var pipeGroup = this.pipes.getFirstExists(false);
    // if(!pipeGroup) {
        // pipeGroup = new PipeGroup(this.game, this.pipes);  
  //   }
  //   // pipeGroup.reset(this.game.width, pipeY);
    

  // }
};

module.exports = Play;
