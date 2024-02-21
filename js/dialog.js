// DIALOG.JS

var rsg_text;
var rsg_status = 0;

function FireMissile() {
    if (!player_disabled) {
      //game.sound.play('aud_pewpew');
	  aud_pewpew.play();
	  var s = pmissiles.create(player.x + 16, player.y, 'pmiss');
      s.anchor.set(0.5);
      s.lifespan = 2000;
      s.body.velocity.x = 1000;
    }
}
  
function GetCorrectedGameTime() {
	return game.time.now - pause_duration;
}
	
function RunRSGTween() {
	console.log("RUN RSG TWEEN: " + rsg_status);

	if (rsg_status <= 2) {
	  var t = "";
	  switch (rsg_status) {
		case 0:
		  t = "READY...";
		  break;
		case 1:
		  t = "SET...";
		  break;
		case 2:
		  t = "GO!";
		  rsg_text.fill = "#000000";
		  HideDialog();
		  UnPauseGame();
		  break;
	  }
	  rsg_text.text = t;
	  //rsg_text.scale.set(0.5);
	  rsg_text.alpha = 1;
	  rsg_status++;
	  //var tw = game.add.tween(rsg_text.scale).to({x:1, y:1}, 250, null, true);
	  var tw = game.add.tween(rsg_text).to({alpha:0}, 300, null, true);
	  tw.onComplete.add(RunRSGTween);
	} 
}
  




function NextLevel() {
   console.log("NEXT LEVEL");
   curr_level++;
   if (curr_level > 3) {
     //PauseGame(false, false);
     curr_dialog = new Dialog("CONGRATULATIONS!", 2, ShowEndScreen);
     curr_dialog.setMainText("You have completed all the levels. Let's go buy Mommy a present!");
     curr_dialog.setBottomText("Press ENTER to continue.");
     curr_dialog.showDialog();
   } else {
     dollar_collected = [false, false, false, false];
     game.state.start(game.state.current);
   }
}

function PauseGame(level_start, continue_music) {
	
	HideDialog();
	game.input.keyboard.reset(true);
	game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.addOnce(NextLevel);
    game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.addOnce(RestartLevel);
    game.input.keyboard.addKey(Phaser.Keyboard.B).onDown.add( function() { lives_left=lives_left+20; text_lives.text = "LIVES: " + lives_left; } );
    game.input.keyboard.addKey(Phaser.Keyboard.Y).onDown.add( function () { game.physics.arcade.isPaused = !game.physics.arcade.isPaused; } );
	
	if (player_disabled) {
		//k_enter.onDown.addOnce(PauseGame, this);
	} else {
		
		cam_s.body.velocity.x = 0;
		game.physics.arcade.isPaused = true;
		pause_start_time = game.time.now;
		
		if (level_start == true) {
			switch (curr_level) {
				case 1:
				  var t = "LEVEL 1: THE DISC GOLF COURSE";
				  var m = "Remember the first rule of disc golf: Avoid the trees!";
				  break;
				case 2:
				  var t = "LEVEL 2: FLORIDA";
				  var m = "A day at the beach!  Help Rocky stay high and dry... and watch out for those pesky fish!";
				  break;
				case 3:
				  var t = "LEVEL 3: THE HAUNTED ATTIC";
				  var m = "It's dark and scary up there... and things are never what they seem!";
				  break;
			}
			curr_dialog = new Dialog(t, 2, this.StartLevel);
			curr_dialog.setMainText(m);
			curr_dialog.setBottomText("Press ENTER to start.");
			curr_dialog.showDialog();
		} else {
			// PAUSE GAME DURING GAME PLAY
			if (!continue_music) {music.pause();}
			console.log("PLAY: ENTER PRESS DURING GAME");
			game.physics.arcade.isPaused = true;
		  
			curr_dialog = new Dialog("GAME PAUSED", 2, PauseCallback);
			curr_dialog.setOptions(['CONTINUE', 'QUIT'], 0);
			curr_dialog.setBottomText("Press ENTER to make selection.");
			curr_dialog.showDialog();
			
			
		}
  
	}
}

function PauseCallback() {
	console.log("SUBMIT PAUSE SELECTION");
	var sel = curr_dialog.selection;
	HideDialog();
	switch (sel) {
		case 0:
		UnPauseGame();
		break;
	  case 1:
		ConfirmQuit();
		break;
	}
}

function UnPauseGame() {
	console.log("UNPAUSE");
	music.resume();
	cam_s.body.velocity.x = cam_speed;
	game.physics.arcade.isPaused = false;
	pause_duration = pause_duration + game.time.now - pause_start_time;
	key_q.reset();
  
	// CREATE INPUT
	game.input.keyboard.reset(true);
	cursors = game.input.keyboard.createCursorKeys();
	game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(FireMissile, this);
	k_enter.onDown.addOnce(PauseGame, this);
	
}

function StartLevel() {
  curr_dialog.dlgbox.destroy();
  rsg_text = game.add.text(400, 300, '', { font: 'bold 32px Arial', fill: '#FFF' });
  rsg_text.anchor.set(0.5);
  rsg_text.fixedToCamera = true;
  rsg_status = 0;
  RunRSGTween();
}

function RestartLevel() {
  HideDialog();
  //dollar_collected = [false, false, false, false];
  game.state.start(game.state.current);
}

function ConfirmQuit() {
	curr_dialog = new Dialog("QUIT? ARE YOU SURE?", 2, ConfirmQuitCallback);
	curr_dialog.setOptions(["YES", "NO"], 0);
	curr_dialog.setBottomText("Press ENTER to make selection.");
	curr_dialog.showDialog();
}

function ConfirmQuitCallback() {
	var sel = curr_dialog.selection;
	HideDialog();
	if (sel == 0) {
		ShowEndScreen();
	} else {
		PauseGame();
	}
}

function ShowEndScreen() {
  console.log("SHOW END SCREEN");
  HideDialog();
  game.paused = false;
  menu_state = 2;
  music.resume();
  game.state.start('menu');
}






