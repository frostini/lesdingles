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
