var game = new Phaser.Game(800, 600, Phaser.AUTO);



console.log('boot_message');

var GameState = {
  preload: function() {
    this.load.image('testsprite', 'obj/boi.png');
    this.load.image('theme', 'obj/theme.png');
    this.load.image('meteor', 'obj/meteor.png');
      console.log('objects_loaded');
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
      console.log('physic_enabled');

      this.background = this.game.add.sprite(0, 0, 'theme');

      boi = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'testsprite');
      boi.scale.setTo(3, 3);
      boi.anchor.setTo(0.5, 0.5);

        for (var i = 0; i < 15; i++)
    {
        meteor = game.add.sprite(game.world.randomX, game.world.randomY, 'meteor');
        rand = game.rnd.realInRange(2, 6);
        meteor.scale.setTo(rand, rand);
    }
        console.log('objects_imported')

      game.physics.enable([boi,meteor], Phaser.Physics.ARCADE);
        console.log('objects_physic_enabled');
      boi.body.setSize(12, 12, 0, 0);
      meteor.enableBody = true;
      meteor.body.setSize(12, 12, 0, 0);
      meteor.body.immovable = true;
      meteor.anchor.setTo(0.5, 0.5);
      boi.body.collideWorldBounds = true;
        console.log('hitboxes_created');

      cursors = game.input.keyboard.createCursorKeys();
        console.log('input_created');
},
  update: function() {

    game.physics.arcade.collide(boi, meteor);

    boi.body.velocity.x = 0;
    boi.body.velocity.y = 0;

    if(cursors.left.isDown) {

    boi.body.velocity.x -= 80;
  }
  if(cursors.right.isDown) {
    boi.body.velocity.x += 80;
  }
  if(cursors.up.isDown) {
    boi.body.velocity.y -= 110;
  }
  if(cursors.down.isDown) {
    boi.body.velocity.y += 110;
  }
  },
};



game.state.add('GameState', GameState);
game.state.start('GameState');
