// LOAD.JS


class loadState extends Phaser.State {

  preload() {
    console.log('LOAD: PRELOAD ROUND PIXELS');

    game.renderer.renderSession.roundPixels = true;

    game.load.tilemap('level1', 'levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level2', 'levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level3', 'levels/level3.json', null, Phaser.Tilemap.TILED_JSON);
	
	// audio
	game.load.audio('music', 'assets/music1.wav');
	game.load.audio('aud_explosion', 'assets/sounds/explosion.wav');
	game.load.audio('aud_sadtrombone', 'assets/sounds/sadtrombone.wav');
	game.load.audio('aud_pewpew', 'assets/sounds/pewpew.wav');
	game.load.audio('aud_chaching', 'assets/sounds/chaching.wav');
	game.load.audio('aud_blip', 'assets/sounds/blip.wav');
	game.load.audio('aud_tada', 'assets/sounds/tada.wav');
	game.load.audio('aud_goal', 'assets/sounds/goal.wav');
	game.load.audio('aud_drumroll', 'assets/sounds/drumroll.wav');
	
    // MENU
    game.load.image('menu_bg', 'assets/menu_bg.png');
    game.load.image('menu', 'assets/menu.png');
    game.load.image('sel_box', 'assets/sel_box.png');
    game.load.image('end', 'assets/end.png');
    game.load.image('curtain', 'assets/curtain.png');

    // DIALOG, INFO
    game.load.image('dialog', 'assets/dialog.png');
    game.load.image('dialog2', 'assets/dialog2.png');
    game.load.image('dialog_long', 'assets/dialog_long.png');
    game.load.image('option_bg', 'assets/option_bg.png');
    game.load.image('overlay', 'assets/overlay.png');
    game.load.image('info_bar', 'assets/info_bar.png');

    // COMMON
    game.load.image('bg_level1', 'assets/bg_level1.png');
    game.load.image('bg_level2', 'assets/bg_level2.png');
    game.load.image('bg_level3', 'assets/bg_level3.png');

    // LEVEL 1
    game.load.spritesheet('glimmer', 'assets/glimmer.png', 32, 32);
    game.load.image('ship', 'assets/ship.png');
    game.load.image('goal', 'assets/goal.png');
    game.load.image('smoke', 'assets/smoke.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('leaves', 'assets/leaves.png');
    game.load.image('dirt', 'assets/dirt.png');
    game.load.image('trunk', 'assets/trunk.png');
		game.load.image('grass', 'assets/grass.png');
		game.load.image('eship', 'assets/eship.png');
		game.load.image('pmiss', 'assets/pmiss.png');
		game.load.image('explosion', 'assets/explosion.png');
		game.load.image('emiss', 'assets/emiss.png');
		game.load.image('dollar', 'assets/dollar.png');

    // LEVEL 2
    game.load.image('sand', 'assets/sand.png');
		game.load.image('water', 'assets/water.png');
		game.load.image('cannon', 'assets/cannon.png');
		game.load.image('wmiss', 'assets/wmissile.png');
    game.load.spritesheet('fish', 'assets/fish.png', 32, 32);

    // LEVEL 3
    game.load.image('fencebg', 'assets/fence_bg.png');
    game.load.image('fence', 'assets/fence.png');
    game.load.image('crusher_up', 'assets/crusher_up.png');
    game.load.image('crusher_down', 'assets/crusher_down.png');
    game.load.image('fallspike', 'assets/fallspike.png');
	
	// PRIZES
    game.load.image('prize_bc', 'assets/prizes/PRIZE_BC.jpg');
	game.load.image('prize_bk', 'assets/prizes/PRIZE_BK.jpg');
	game.load.image('prize_bp', 'assets/prizes/PRIZE_BP.jpg');
	game.load.image('prize_cb', 'assets/prizes/PRIZE_CB.jpg');
	game.load.image('prize_dgp', 'assets/prizes/PRIZE_DGP.jpg');
	game.load.image('prize_dvd', 'assets/prizes/PRIZE_DVD.jpg');
	game.load.image('prize_ic', 'assets/prizes/PRIZE_IC.jpg');
	game.load.image('prize_rot', 'assets/prizes/PRIZE_ROT.jpg');
	game.load.image('prize_sa', 'assets/prizes/PRIZE_SA.jpg');
	game.load.image('prize_se', 'assets/prizes/PRIZE_SE.jpg');
	game.load.image('prize_tk', 'assets/prizes/PRIZE_TK.jpg');
	game.load.image('prize_wp', 'assets/prizes/PRIZE_WP.jpg');
	game.load.image('prize_snugs', 'assets/prizes/PRIZE_SNUGS.jpg');
    

    k_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    key_q = game.input.keyboard.addKey(Phaser.Keyboard.Q);

  }

  create() {
    console.log('LOAD: CREATE');
    game.state.start('premenu');
  }

}

class preMenuState extends Phaser.State {
	preload() {
		console.log('PREMENU: PRELOAD');
	}
	create() {
		console.log('PREMENU: CREATE');
		var t = game.add.text(400, 200, "Rocky's Valentine's Day Adventure", {font: 'normal 14px courier', fill: '#fff' });
		t.anchor.set(0.5, 0.5);
		
		var t = game.add.text(400, 225, 'A game by Paul Wilson for Debra Lofano', {font: 'normal 14px courier', fill: '#fff' });
		t.anchor.set(0.5, 0.5);
		
		var t = game.add.text(400, 250, 'Copyright 2022 paulface.com All Rights Reserved', {font: 'normal 14px courier', fill: '#fff' });
		t.anchor.set(0.5, 0.5);
		
		t = game.add.text(400, 400, 'Press ENTER to begin game.', {font: 'normal 24px courier', fill: '#fff' });
		t.anchor.set(0.5, 0.5);
		//t.x = t.x - t.width / 2;
		game.add.tween(t).to({alpha:0.30}, 250, null, true, 0, -1, true);
		
		k_enter.onDown.addOnce(function() {game.state.start('menu'); music = game.sound.play('music', 1, true);}, this);

	}
}
