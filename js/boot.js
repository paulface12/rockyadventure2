// BOOT.JS

class bootState extends Phaser.State {
  create() {
    console.log('BOOT');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('load');
	//aud_blip = game.add.audio('audio_blip');
  }
}
