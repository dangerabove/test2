var game = new Phaser.Game(800, 600, Phaser.AUTO);




var meteor;

var GameState = {
  preload: function() {
    this.load.image('testsprite', 'obj/boi.png');
    this.load.image('theme', 'obj/theme.png');
    this.load.image('meteor', 'obj/meteor.png');
    this.load.image('bl', 'obj/boi_l.png');
    this.load.image('br', 'obj/boi_r.png');
    this.load.image('bd', 'obj/boi_d.png');
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

      this.background = this.game.add.sprite(0, 0, 'theme');

      boi = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'testsprite');
      boi.scale.setTo(3, 3);
      boi.anchor.setTo(0.5, 0.5);

      meteor = game.add.group();
      meteor.enableBody = true;
      meteor.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 15; i++)
    {
        var m = meteor.create(game.world.randomX, game.world.randomY, 'meteor');
        rand = game.rnd.realInRange(2, 6);
        m.scale.setTo(rand, rand);
        m.body.setSize(12, 12, 0, 0);
        m.body.immovable = true;
        m.anchor.setTo(0.5, 0.5);
    }

      game.physics.enable(boi, Phaser.Physics.ARCADE);
      boi.body.setSize(12, 12, 0, 0);
      boi.body.collideWorldBounds = true;

      cursors = game.input.keyboard.createCursorKeys();
},
  update: function() {

    boi.body.velocity.x = 0;
    boi.body.velocity.y = 0;

  if(cursors.left.isDown) {
    boi.body.velocity.x -= 130;
    boi.loadTexture('bl');
  }
  if(cursors.right.isDown) {
    boi.body.velocity.x += 130;
    boi.loadTexture('br');
  }
  if(cursors.up.isDown) {
    boi.body.velocity.y -= 130;
    boi.loadTexture('testsprite');
  }
  if(cursors.down.isDown) {
    boi.body.velocity.y += 130;
    boi.loadTexture('bd');
  }

  collisionHandler: function(boi, meteor) {
    //boi.destroySprite();
  },

  game.physics.arcade.overlap(meteor, boi, collisionHandler, null, this);

  },

  destroySprite: function(boi) {
    boi.destroy();
},
};



game.state.add('GameState', GameState);
game.state.start('GameState');
