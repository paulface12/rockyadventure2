// GAME.JS
class endState extends Phaser.State {
  preload () {
    console.log ("END: PRELOAD");
  }
  create () {
    console.log ("END: CREATE");
    //game.add.sprite(0, 0, 'menu');

    game.stage.backgroundColor = "#FFFF66";
    var test_menu = game.add.text(20, 20, "END SCREEN", { font: 'normal 32px Arial', fill: '#000000' });

    // INPUT
    game.input.keyboard.reset(true);
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this.restartGame, this);
  }
  update() {
    //console.log("TEST");
    //game.paused = true;
  }
  restartGame () {
    console.log("END: ENTER PRESS");
    HideDialog();
    game.state.start('menu');
  }
}
