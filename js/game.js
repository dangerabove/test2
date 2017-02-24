var game = new Phaser.Game(800, 600, Phaser.AUTO);


var boi;
var meteor;
var walk;
var walkr;
var walkl;
var walkd;


var GameState = {
  preload: function() {

    this.load.image('killed', 'obj/sqr.png');
    this.load.image('theme', 'obj/theme.png');
    this.load.image('meteor', 'obj/meteor.png');
    this.load.spritesheet('animation_l', 'obj/boi_al.png', 12, 12);
    this.load.spritesheet('animation_r', 'obj/boi_ar.png', 12, 12);
    this.load.spritesheet('animation_d', 'obj/boi_ad.png', 12, 12);
    this.load.spritesheet('animation', 'obj/boi_a.png', 12, 12);
    this.load.audio('inba', 'snd/aaa.mp3');
  },

create: function() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

    this.background = this.game.add.sprite(0, 0, 'theme');

    dead = this.game.add.audio('inba');

      boi = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'animation' );
      boi.scale.setTo(3, 3);
      boi.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(boi);
      boi.body.setSize(12, 12, 0, 0);
      boi.body.collideWorldBounds = true;

      walk = boi.animations.add('walk');
      walkr = boi.animations.add('walkr');
      walkl = boi.animations.add('walkl');
      walkd = boi.animations.add('walkd');

      meteor = game.add.physicsGroup();

        for (var i = 0; i < 15; i++)
    {
        var m = meteor.create(game.world.randomX, game.world.randomY, 'meteor');
        rand = game.rnd.realInRange(2, 6);
        m.scale.setTo(rand, rand);
        m.body.setSize(12, 12, 0, 0);
        m.body.immovable = true;
        m.anchor.setTo(0.5, 0.5);
    }

      leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      leftKey.onDown.add(function() {
        boi.loadTexture('animation_l', 0, true);
        boi.animations.play('walkl', 10, true);
        });

      rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      rightKey.onDown.add(function() {
        boi.loadTexture('animation_r', 0, true);
        boi.animations.play('walkr', 10, true);
        });

      upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      upKey.onDown.add(function() {
        boi.loadTexture('animation', 0, true);
        boi.animations.play('walk', 10, true);
        });

      downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      downKey.onDown.add(function() {
        boi.loadTexture('animation_d', 0, true);
        boi.animations.play('walkd', 10, true);
        });


      cursors = game.input.keyboard.createCursorKeys();
},

  update: function() {

    if(game.physics.arcade.collide(boi, meteor)) {
       dead.play();
       console.log('You are dead, not big surprise.');
       boi.kill();
     }

    boi.body.velocity.x = 0;
    boi.body.velocity.y = 0;

    if(cursors.left.isDown) {
      boi.body.velocity.x -= 130;
    }

    if(cursors.right.isDown) {
      boi.body.velocity.x += 130;
    }

    if(cursors.up.isDown) {
      boi.body.velocity.y -= 130;
    }

    if(cursors.down.isDown) {
      boi.body.velocity.y += 130;
    }
  },



};



game.state.add('GameState', GameState);
game.state.start('GameState');
