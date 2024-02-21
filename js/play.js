// PLAY.JS

var text_debug;
var text_timer;
var start_time;
var stop_timer;

class playState extends Phaser.State {
	
  // FUNCTIONS
  preload() {
    console.log('PLAY: PRELOAD ' + curr_level);
  }

  create() {
    console.log('PLAY: CREATE ' + curr_level);
	

	//if(music != null) {
	//	music.stop();
	//	music.destroy();
	//}
	
	//game.sound.stopAll();
	
	//var i = game.sound.removeByKey('music');
	//console.log("MUSIC REMOVED: " + i);
	//music = game.sound.play('music', 1, true);
	
	var i = game.sound.removeByKey('aud_pewpew');
	console.log("PEWPEW REMOVED: " + i);
	
	aud_pewpew = game.add.audio('aud_pewpew');
	aud_blip = game.add.audio('aud_blip');
	aud_goal = game.add.audio('aud_goal');
	aud_explosion = game.add.audio('aud_explosion');
	//aud_sadtrombone = game.add.audio('audio_sadtrombone');
	//aud_chaching = game.add.audio('audio_chaching');
	
	//if(music.isPlaying) {
	//	console.log("MUSIC STOPPING");
	//	music.stop();
	//} 
	
    game.stage.backgroundColor = "#333333";
    this.first_update = true;

    // DELETE LATER
    //lives_left = 0;

    // MISC
    player_crashed = false;
    player_disabled = false;
    dollar_id = 0;
    pause_duration = 0;
	//dollar_collected = [false, false, false, false];

    //this.pauseUpdate = function () { console.log("AOSDFJASD"); }
    //game.state.onPauseUpdateCallback = function() { console.log("asdfasdfasdf"); };

    // BG
    bg1 = game.add.tileSprite(0, 64, 800, 600, 'bg_level' + curr_level);
    bg1.fixedToCamera = true;

    // GROUPS
    wmissiles = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		waters = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		fencebgs = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		fences = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		dollars = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);

		crushers = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		crushertails = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		crusherheads = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);

		watercannons = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		platforms = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
    dirt = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		fish = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		enemies = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		ghostblocks = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		camoships = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);

		fallspikes = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
		pmissiles = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);

    emissiles = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
    smoke = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);
    others = game.add.group(void(0), '', false, true, Phaser.Physics.ARCADE);

    glimmers = game.add.group();
    info = game.add.group();
    dialogs = game.add.group();



    // LOAD TILEMAP AND FIRST X COLUMNS
    this.map = game.add.tilemap('level' + curr_level);
    game.world.resize(3456, 400);
    //var layer = this.map.createLayer('Tile Layer 1');
    //layer.resizeWorld();

    this.next_load_j = 30;
    for (var j = 0; j < this.next_load_j; j++) {
      // LOAD FIRST X COLUMNS BEFORE LEVEL STARTS
			LoadColumn(this, j);
		}


    // DEBUG
    //game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.addOnce(NextLevel);
    //game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.addOnce(RestartLevel);
    //game.input.keyboard.addKey(Phaser.Keyboard.B).onDown.add( function() { lives_left=lives_left+20; text_lives.text = "LIVES: " + lives_left; } );
    //game.input.keyboard.addKey(Phaser.Keyboard.Y).onDown.add( function () { game.physics.arcade.isPaused = !game.physics.arcade.isPaused; } );

    // CAMERA
    cam_s = others.create(400, 0, 'explosion');
    cam_s.body.velocity.x = cam_speed;
    //game.camera.roundPx = false;
		game.camera.follow(cam_s, Phaser.Camera.FOLLOW_LOCKON, 1, 1);

    // SCORE/LIVES INFORMATION
    info.create(0, 0, 'info_bar');
    //text_score = game.add.text(8, 6, 'MONEY: $' + score, { font: 'bold 14px Arial', fill: '#FFF' });
    //text_level = game.add.text(235, 6, 'LEVEL ' + curr_level, { font: 'bold 14px Arial', fill: '#FFF' });
    //text_diff = game.add.text(435, 6, 'DIFFICULTY: ' + diff_text, { font: 'bold 14px Arial', fill: '#FFF' });
    //text_lives = game.add.text(715, 6, 'LIVES: ' + lives_left, { font: 'bold 14px Arial', fill: '#FFF' });
	
	
    text_level = game.add.text(6, 8, 'LEVEL ' + curr_level + ' (' + diff_text + ')', { font: 'bold 14px Arial', fill: '#FFF' });
    //text_diff = game.add.text(435, 6, 'DIFFICULTY: ' + diff_text, { font: 'bold 14px Arial', fill: '#FFF' });
    text_score = game.add.text(400, 20, 'MONEY: $' + score, { font: 'bold 14px Arial', fill: '#FFF' });
	text_score.anchor.set(0.50);
	text_lives = game.add.text(730, 8, 'LIVES: ' + lives_left, { font: 'bold 14px Arial', fill: '#FFF' });
	//text_timer = game.add.text(715, 6, 'TIME: ', { font: 'bold 14px Arial', fill: '#FFF' });
    text_score.autoRound = true;
    info.add(text_score);
    info.add(text_level);
    //info.add(text_diff);
    info.add(text_lives);
	//info.add(text_timer);
    info.fixedToCamera = true;

    // DEBUG
    //debugText1 = game.add.text(16, 550, '1', { fontSize: '32px', fill: '#000' });
    //debugText2 = game.add.text(300, 550, '2', { fontSize: '32px', fill: '#000' });
    //debugText3 = game.add.text(600, 550, '3', { fontSize: '32px', fill: '#000' });

    //var o = game.add.sprite(600, 32, 'overlay');
    //o.fixedToCamera = true;
    //o.alpha = 0.66;
    text_debug = game.add.text(600, 32, "", { font: 'bold 12px Arial', fill: '#FFF' });
    text_debug.fixedToCamera = true;

    start_time = GetCorrectedGameTime();
    //text_timer = game.add.text(20, 560, '0.00', { fontSize: '12px', fill: '#FFF' });
    //text_timer.fixedToCamera = true;

    PauseGame(true);

  }

  update() {
    
      if (!game.physics.arcade.isPaused) {
        RunCollisions(this);
        MoveAllSprites(this);
        this.LoadNextColumn();
      }

    // DEBUG
    if (false) {
      var arr = [];
      arr.push("roundPixels: " + game.renderer.renderSession.roundPixels);
      arr.push("cameraSpeed: " + cam_speed);
      arr.push("GameTime: " + GetCorrectedGameTime());
      arr.push("platforms: " + platforms.countLiving() + ", " + platforms.countDead());
      arr.push("dirt: " + dirt.countLiving() + ", " + dirt.countDead());
      arr.push("waters: " + waters.countLiving() + ", " + waters.countDead());
      arr.push("==================");
      arr.push("pmissiles: " + pmissiles.countLiving() + ", " + pmissiles.countDead());
      arr.push("enemies: " + enemies.countLiving() + ", " + enemies.countDead());
      arr.push("emissiles: " + emissiles.countLiving() + ", " + emissiles.countDead());
      arr.push("==================");
      arr.push("fish: " + fish.countLiving() + ", " + fish.countDead());
      arr.push("wmissiles: " + wmissiles.countLiving() + ", " + wmissiles.countDead());
      arr.push("==================");
      arr.push("ghostblocks: " + ghostblocks.countLiving() + ", " + ghostblocks.countDead());
      arr.push("camoships: " + camoships.countLiving() + ", " + camoships.countDead());
      arr.push("fences: " + fences.countLiving() + ", " + fences.countDead());
      arr.push("fallspikes: " + fallspikes.countLiving() + ", " + fallspikes.countDead());
      arr.push("crushers: " + crushers.countLiving() + ", " + crushers.countDead());
      arr.push("==================");
      arr.push("others: " + others.countLiving() + ", " + others.countDead());

      var s = "";
      for (var i = 0; i <= arr.length - 1; i++) {
        s = s + "\n" + arr[i];
      }

      text_debug.text = s;
    }
  }
  
  LoadNextColumn() {
		var x = this.camera_tile;
		this.camera_tile = Math.floor(game.camera.x / 32);
		if (x != this.camera_tile) {
			// CHANGE
			LoadColumn(this, this.next_load_j);
			this.next_load_j++;
		}
	}

 

	
}
