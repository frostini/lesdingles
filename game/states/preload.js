
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
