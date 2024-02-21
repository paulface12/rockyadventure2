// MENU.JS

var menu_bg;
var menu_state = 1; // 1=MENU; 2=END
var text_objs;
var anim_i;
var end_objs;
// "He decides to buy his Mommy..."
// "SHE'S GONNA LOVE IT!"

class menuState extends Phaser.State {

  preload () {
    console.log ("MENU: PRELOAD");
  }

  create () {
    console.log ("MENU: CREATE");
	
	music.volume = 1;
	
	aud_blip = game.add.audio('aud_blip');
	aud_tada = game.add.audio('aud_tada');
	aud_chaching = game.add.audio('aud_chaching');
	aud_drumroll = game.add.audio('aud_drumroll');
	
	var i = game.sound.removeByKey('aud_pewpew');
	console.log("PEWPEW REMOVED: " + i);
	
    game.world.resize(1600, 400);
    game.stage.backgroundColor = "#FFFFFF";

    // CREATE MENU BACKGROUND SPRITE
    menu_bg = game.add.tileSprite(0, 0, 1600, 600, 'menu_bg');
    menu_bg.alpha = 0.50;

    // CREATE MENU SPRITE
    var menu = game.add.sprite(32, 32, 'menu');

    // CREATE TEXT
    var t = game.add.text(400, 496, 'Press ENTER to start the adventure', {font: 'normal 24px Arial', fill: '#fff' });
    t.x = t.x - t.width / 2;
    game.add.tween(t).to({alpha:0.30}, 250, null, true, 0, -1, true);

    dialogs = game.add.group();
    end_objs = game.add.group();

    HideDialog();

    // CREATE END (i.e. menu_state == 2)
    if (menu_state == 2) {
		
	  music.volume = 0.5;
      end_objs = [];

      var s = game.add.sprite(832, -750, 'end');
      
	  var prize_text = "";
	  var prize_image_id = "";
	
		switch(score) {
			case 0:
				prize_text = "A COUPON";
				prize_image_id = "prize_snugs";
				break;
			case 1:
				prize_text = "A STUFFED ANIMAL";
				prize_image_id = "prize_sa";
				break;
			case 2:
				prize_text = "SPORTS EQUIPMENT";
				prize_image_id = "prize_se";
				break;
			case 3:
				prize_text = "A BOX OF POPSICLES";
				prize_image_id = "prize_bp";
				break;
			case 4:
				prize_text = "A BOX OF CRACKERS";
				prize_image_id = "prize_bc";
				break;
			case 5:
				prize_text = "ICE CREAM";
				prize_image_id = "prize_ic";
				break;
			case 6:
				prize_text = "TURKEY?";
				prize_image_id = "prize_tk";
				break;
			case 7:
				prize_text = "A BOOK ABOUT BIRDS";
				prize_image_id = "prize_bk";
				break;
			case 8:
				prize_text = "A ROTISERRIE CHICKEN";
				prize_image_id = "prize_rot";
				break;
			case 9:
				prize_text = "WRAPPING PAPER";
				prize_image_id = "prize_wp";
				break;
			case 10:
				prize_text = "A COMFY BLANKET";
				prize_image_id = "prize_cb";
				break;
			case 11:
				prize_text = "A DISC GOLF PUTTER";
				prize_image_id = "prize_dgp";
				break;
			default:
				prize_text = "A DVD ABOUT HORSES";
				prize_image_id = "prize_dvd";
				break;
		}
	
		// PRIZE
		 var prize = game.add.sprite(368, 240, prize_image_id);
		 prize.anchor.set(0.5, 0.5);
		 s.addChild(prize);
	  
	  // CURTAIN
	  var curtain1 = game.add.sprite(224, 128, 'curtain');
      var curtain2 = game.add.sprite(512, 128, 'curtain');
      curtain2.anchor.set(1, 0);
      s.addChild(curtain1);
      s.addChild(curtain2);
      
	  s.data = {a:0, d:250, t:1000, y:32};
      end_objs.push(s);

      var opts = {font: 'normal 24px Arial', fill: '#fff' };

      s = game.add.text(981, 50, 'Rocky', opts);
      s.data = {a:1, d:1500, t:250};
      end_objs.push(s);

      s = game.add.text(1058, 50, 'collected', opts);
      s.data = {a:1, d:0, t:250};
      end_objs.push(s);
		
	  s = {renderable:false} // dummy object for chaching sound
      s.data = {a:5, d:500, t:0, sound_obj:aud_chaching};
      end_objs.push(s);
	  
      var style = {font: 'bold 24px Arial', fill: '#fff' };
      s = game.add.text(1194, 66, '$' + score, style);
      s.anchor.set(0.5);
      s.data = {a:2, d:0, t:250, s:style};
      end_objs.push(s);

      s = game.add.text(1235, 50, 'on', opts);
      s.data = {a:1, d:0, t:250};
      end_objs.push(s);

      s = game.add.text(1269, 50, 'his', opts);
      s.data = {a:1, d:0, t:250};
      end_objs.push(s);

      s = game.add.text(1309, 50, 'adventure.', opts);
      s.data = {a:1, d:0, t:250};
      end_objs.push(s);

      var opts_maroon = {font: 'normal 24px Arial', fill: '#800000' };
      s = game.add.text(1200, 115, 'He decides to buy his mommy...', opts_maroon);
      s.anchor.set(0.5, 0);
      s.data = {a:1, d:1000, t:250};
      end_objs.push(s);
	
	  s = {renderable:false} // dummy object for drumroll sound
      s.data = {a:5, d:500, t:0, sound_obj:aud_drumroll};
      end_objs.push(s);
	  
      s = {renderable:false} // dummy object with dummy renderable attribute for drawing curtains
      s.data = {a:4, d:500, t:500, s1:curtain1, s2:curtain2}
      end_objs.push(s);
	  
	  s = {renderable:false} // dummy object for tada sound
      s.data = {a:5, d:1000, t:0, sound_obj:aud_tada};
      end_objs.push(s);

      var opts_maroon_small = {font: 'bold 18px Arial', fill: '#800000' };
      s = game.add.text(1200, 380, prize_text, opts_maroon_small);
      s.anchor.set(0.5, 0);
      s.data = {a:1, d:0, t:250};
      end_objs.push(s);

      var opts_maroon_bold = {font: 'bold 24px Arial', fill: '#800000' };
      s = game.add.text(1200, 450, "SHE'S GONNA LOVE IT!", opts_maroon_bold);
      s.anchor.set(0.5);
      s.data = {a:2, d:1000, t:250, s:opts_maroon};
      end_objs.push(s);

      s = game.add.text(1200, 500, 'Press ENTER to return to menu', opts);
      s.anchor.set(0.5, 0);
      s.data = {a:3, d:500, t:250};
      end_objs.push(s);

      //end_objs.push(game.add.text(975, 50, 'Rocky', opts));
      //end_objs.push(game.add.text(1055, 50, 'collected', opts));
      //end_objs.push(game.add.text(1238, 50, 'on', opts));
      //end_objs.push(game.add.text(1275, 50, 'his', opts));
      //end_objs.push(game.add.text(1320, 50, 'adventure', opts));

      //t = game.add.text(1200, 496, 'Press ENTER to return to menu', {font: 'normal 24px Arial', fill: '#fff' });
      //t.x = t.x - t.width / 2;
      //game.add.tween(t).to({alpha:0.50}, 1000, null, true, 0, -1, true);
      //t = game.add.text(1194, 50, '$' + score, {font: 'bold 24px Arial', fill: '#fff' });
      //t.x = t.x - t.width / 2;
    }



    this.setMenuState();

  }

  update() {
    menu_bg.tilePosition.x = menu_bg.tilePosition.x - 0.5;
  }

  setMenuState() {
    if ( menu_state == 1 ) {
      // MENU STATE
      console.log("MENU STATE");
      game.camera.x = 0;
      // INPUT
      game.input.keyboard.reset();
      game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this.showDifficultyDialog, this);
      // DEBUG
      //game.input.keyboard.addKey(Phaser.Keyboard.T).onDown.add(this.debugToggleMenuState, this);
    } else {
      // END STATE
      console.log("END STATE");
      game.camera.x = 800;
      this.addAnimations();
      game.input.keyboard.reset();
	  // DEBUG
		game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add( function() { score++; game.state.start(game.state.current); } );
		game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.add( function() { score = score - 1; game.state.start(game.state.current); } );
    }
  }

  addAnimations() {
    var time_cursor = 0;
    var s;
    for (var i = 0; i < end_objs.length; i++) {
      s = end_objs[i];
      s.renderable = false;
      game.time.events.add(time_cursor + s.data.d, this.animationEvent, this, s);
      time_cursor = time_cursor + s.data.d + s.data.t;
    }

    //anim_i = 0;
    //this.animateTopText();
  }

  animationEvent(s) {
    s.renderable = true;
    switch (s.data.a) {
      case 0:
        game.add.tween(s).to({y:s.data.y}, s.data.t, null, true);
        //s.scale.set(0);
        //game.add.tween(s.scale).to({x:1, y:1}, s.data.t, null, true);
        break;
      case 1:
        s.alpha = 0;
        var final_y = s.y;
        s.y = s.y + 10;
        game.add.tween(s).to({y:final_y, alpha:1}, s.data.t, null, true);
        //s.scale.set(0);
        //game.add.tween(s.scale).to({x:1, y:1}, s.data.t, null, true);
        break;
      case 2:
        var s2 = game.add.text(s.x, s.y, s.text, s.data.s);
        s2.anchor.set(0.5);
        game.add.tween(s2.scale).to({x:2, y:2}, s.data.t, null, true);
        game.add.tween(s2).to({alpha:0}, s.data.t, null, true);
        break;
      case 3:
        game.add.tween(s).to({alpha:0.30}, 250, null, true, 0, -1, true);
        game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.tweenToMenu, this);
        break;
      case 4:
        game.add.tween(s.data.s1.scale).to({x:.1}, s.data.t, null, true);
        var t = game.add.tween(s.data.s2.scale).to({x:.1}, s.data.t, null, true);
		//t.onComplete.add(function() {aud_tada.play();})
        break;
	  case 5:
		s.data.sound_obj.play();
	    break;
    }
  }

  animateTopText() {
    console.log("I: " + anim_i);
    if (anim_i < text_objs.length) {
      console.log("TOP TEXT");
      var t = game.add.tween(text_objs[anim_i]);
      t.to({alpha:1}, 500, null, true);
      anim_i++;
      t.onComplete.add(this.animateTopText, this);
    } else {
      console.log("DONE");
    }
  }

  DifficultyDialogCallback() {
	console.log("ENTER PRESSED");
	
	if(curr_dialog != null) {
		
		// INITIALIZE CERTAIN VARIABLES HERE
		// THOSE VARIABLES THAT NEED TO PERSIST THROUGHOUT PLAY STATE RESTARTS (CHANGING LEVEL, DYING, ETC)
		
		curr_level = 1;
		score = 0;
		dollar_collected = [false, false, false, false];
		difficulty = curr_dialog.selection;

		switch (difficulty) {
		  case 0:
			diff_text = "EASY";
			lives_left = 10;
			diff_factor = 1.25;
			cam_speed = 100;
			break;
		  case 1:
			diff_text = "NORMAL";
			lives_left = 6;
			diff_factor = 1.25;
			cam_speed = 140;
			break;

		  case 2:
			diff_text = "HARD";
			lives_left = 4;
			diff_factor = 1.25;
			cam_speed = 180;
			break;
		  case 3:
			diff_text = "INSANE";
			lives_left = 2;
			diff_factor = 1.25;
			cam_speed = 300;
			break;
		}

		game.state.start('play');
	}
  }

  tweenToMenu() {
    console.log("TWEEN TO MENU");
	music.volume = 1;
    var t = game.add.tween(game.camera)
    t.to({x:0}, 200, null, true);
    t.onComplete.add(this.tweenToMenuComplete, this);
  }

  tweenToMenuComplete(s, t) {
    menu_state = 1;
    this.setMenuState();
  }

  showDifficultyDialog() {
    console.log("SHOW DIFF DIALOG");
    curr_dialog = new Dialog("SELECT DIFFICULTY", 3, this.DifficultyDialogCallback);
    curr_dialog.setOptions(['EASY', 'NORMAL', 'HARD', 'INSANE'], difficulty);
    curr_dialog.setBottomText("Press ENTER to start. Press Q to return to menu.");
    curr_dialog.showDialog();
    game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.addOnce(this.quitDifficultyDialog, this);
  }
	
	quitDifficultyDialog() {
		HideDialog();
		this.setMenuState();
	}
	
  debugToggleMenuState() {
    console.log("TOGGLE MENU STATE");
    // TOGGLE
    if ( menu_state == 1 ) {
      menu_state = 2;
      //game.camera.x = 400;
    } else {
      menu_state = 1;
      //game.camera.x = 0;
    }

    this.setMenuState();
  }
}
