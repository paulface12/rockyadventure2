// GAME.JS

console.log('GAME');

var curr_level;

// CONSTANTS
//const CAMERA_V = 90;
var cam_speed;

// AUDIO
var music;
var aud_explosion;
//var aud_sadtrombone;
var aud_pewpew;
var aud_chaching;
var aud_blip;
var aud_tada;
var aud_goal;
var aud_drumroll;

// SPRITES
var player;
var goal;
var bg1;
var cam_s;
var player_in_water;

// KEYINPUT
var k_enter;
var key_q;
var cursors;
var pkey;
var shoot_key;

// MISC
var player_crashed;
var player_disabled;
var lives_left;
var score = 0;
var difficulty = 1; //0, 1, 2, or 3
var diff_text;
var diff_factor;
var curr_dialog;
//var pause_after_next_update = false;
//var dialog_on_render = false;

var dollar_id;
var dollar_collected = [false, false, false, false]; // array - true if collected

// INFO text
var text_score;
var text_level;
var text_diff;
var text_lives;

// GROUPS
var wmissiles;
var waters;
var fencebgs;
var fences;
var dollars;

var crushers;
var crushertails;
var crusherheads;

var watercannons;
var platforms;
var dirt;
var fish;
var enemies;
var ghostblocks;
var camoships;

var fallspikes;
var pmissiles;
var emissiles;
var smoke;
var glimmers;
var others;
var info;
var dialogs;

var pause_duration = 0;
var pause_start_time;

//var game = new Phaser.Game(800, 576, Phaser.AUTO, '', { preload: preload, pauseUpdate: PauseUpdateFunc });
var game = new Phaser.Game(800, 576, Phaser.CANVAS);
//game.state.onPauseUpdateCallback = function () { console.log("PAUL WILSON"); };


	
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('premenu', preMenuState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('end', endState);



game.state.start('boot');

//game.renderer.renderSession.roundPixels = true;
