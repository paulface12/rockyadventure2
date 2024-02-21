// COLLISIONS.JS

function RunCollisions(o) {


  // player out of camera crash;
  if (player.x < game.camera.x  - 16|| player.x > game.camera.x + 800 + 16) {
    CrashPlayer();
  }

  // player
  game.physics.arcade.collide(player, platforms, CrashPlayer);
  //game.physics.arcade.overlap(player, platforms, function() {});

  // water collision
  player_in_water = false;
  game.physics.arcade.overlap(player, waters, WaterOverlap);

  if (player_crashed) {

    if (player_in_water) {
      player.body.gravity.y = -300;
      player.body.drag.set(100);
      player.body.angularDrag = 400;
    } else {
      player.body.gravity.y = 300;
      player.body.drag.set(50);
      player.body.angularDrag = 200;
    }

    if (GetCorrectedGameTime() > player.data.lastSmoke + 500) {
      CreateSmoke(player);
      player.data.lastSmoke = GetCorrectedGameTime();
    }

  } else {

    game.physics.arcade.overlap(player, enemies, CrashPlayer);
    game.physics.arcade.overlap(player, emissiles, CrashPlayerKillOther);
    game.physics.arcade.overlap(player, fish, CrashPlayer);
    game.physics.arcade.overlap(player, wmissiles, CrashPlayer);
    game.physics.arcade.overlap(player, ghostblocks, CrashPlayer);
    game.physics.arcade.overlap(player, fences, FenceOverlap);
    game.physics.arcade.overlap(player, crushers, CrashPlayer);
    game.physics.arcade.overlap(player, fallspikes, CrashPlayer);

    game.physics.arcade.overlap(player, goal, GoalReached);
    game.physics.arcade.overlap(player, dollars, CollectDollar);

  }

  // pmissiles
  game.physics.arcade.overlap(pmissiles, platforms, ExplodeAndKill);
  game.physics.arcade.overlap(enemies, pmissiles, MutualExplode);
  game.physics.arcade.overlap(fish, pmissiles, MutualExplode);
  game.physics.arcade.overlap(pmissiles, ghostblocks, ExplodeAndKill);
  game.physics.arcade.overlap(pmissiles, crushers, ExplodeAndKill);
  game.physics.arcade.overlap(pmissiles, fallspikes, ExplodeAndKill);

  // enemy
  game.physics.arcade.overlap(emissiles, platforms, ExplodeAndKill);
  game.physics.arcade.collide(enemies, platforms, EnemyPlatformCollide);
  game.physics.arcade.collide(fish, platforms, EnemyPlatformCollide);

  game.physics.arcade.collide(ghostblocks, platforms, GhostblockStop);
  game.physics.arcade.collide(crusherheads, crusherheads);
  game.physics.arcade.collide(crusherheads, platforms);
  game.physics.arcade.collide(fallspikes, platforms);

}

function CreateSmoke(s) {
  var smoke_s = smoke.create(s.x, s.y, 'smoke');
  smoke_s.anchor.set(0.5);
  smoke.alpha = 0.8;

  var x_vel = Math.floor(Math.random() * 30) - 15;
  smoke_s.body.velocity.set(x_vel, -50);

  smoke_s.angle = Math.floor(Math.random() * 4) * 90;

  var t = game.add.tween(smoke_s).to({alpha:0}, 1500, null, true);
  t.onComplete.add(function(s, t) { s.destroy(); });
}

function GoalReached(s1, s2) {
  if (!s2.data.collected) {

    //console.log("TIMER: " + text_timer.text);
	
	aud_goal.play();
	
    s2.data.collected = true;
    console.log("GOAL REACHED");

    player.body.velocity.set(0);
    cam_s.body.velocity.set(0);
    player_disabled = true;

    var t1 = game.add.tween(s2);
    t1.to({angle:180}, 500, null, true); //x:player.x, y:player.y

    var t2 = game.add.tween(s2.scale);
	
    t2.to({x:1, y:1}, 500, null, true);

    t1.onComplete.add( function (s, t) {

      player.renderable = false;

      var t3 = game.add.tween(s);
      t3.to({angle:60}, 500, null, true);

      var t4 = game.add.tween(s.scale);
      t4.to({x:0, y:0}, 500, null, true);

      
	  t4.onComplete.add( function (s, t) { NextLevel(); });

    });

  }
}



function CollectDollar(s1, s2) {
  if (s2.data.collected == false) {
	
	game.sound.play('aud_chaching');
	
    console.log('DOLLAR COLLECTED: ' + s2.data.id);
    s2.data.collected = true;
    dollar_collected[s2.data.id] = true;
	console.log(dollar_collected[0] + ', ' + dollar_collected[1] + ', ' + dollar_collected[2] + ', ' + dollar_collected[3]);
    //s2.kill();
    //this.dialog_tween = game.add.tween(this.dialog.scale);
    //this.dialog_tween.to({x:1, y:1}, 100, null, true);
    var t = game.add.tween(s2)
    var t2 = game.add.tween(s2.scale);
    t.to({alpha:0.50}, 200, null, true); //y:s2.y - 32
    t2.to({'x':2, 'y':2}, 200, null, true);

    s2.data.g.destroy();
    t.onComplete.add( function (s, t) {
      s.destroy();
    });

    //t.to({y:player.y - 16, x:player.x + 16, alpha:0.25}, 200, null, true);


    score++;
    text_score.text = "MONEY: $" + score
  }
}

function GhostblockStop(gb, p) {
  if (gb.data.state == 1) { // if moving and collide, stop and change dir
    gb.data.dir--;
    if (gb.data.dir == -1) {gb.data.dir = 3};
    gb.data.state = 0;
    gb.data.lastMove = GetCorrectedGameTime();
    gb.alpha = 1;
  }
}

function WaterOverlap(p, w) {
  player_in_water = true;
  CrashPlayer();
}

function FenceOverlap(p, f) {
  if (f.alpha == 1) {
    CrashPlayer(p, f);
  }
}

function CrashPlayer(s1, s2) {
  if (!player_crashed && !player_disabled)
  {
	 
	
	 
	cam_s.body.velocity.set(0);
    game.camera.shake(0.005, 250);
    game.camera.flash();

    player.data.lastSmoke = GetCorrectedGameTime() - 500;

    Explode(player);
    lives_left--;
    player_crashed = true;
    player_disabled = true;
    player.body.angularVelocity = 720;

    // transfer some of velocity of sprite collided with to player
    if (s2 != null) {
      player.body.velocity.x = (player.body.velocity.x + s2.body.velocity.x) * 0.5;
      player.body.velocity.y = (player.body.velocity.y + s2.body.velocity.y) * 0.5;
    }

    var t = "OH NO!";

    switch(lives_left) {
      case -1:
        var m = "Rocky crashed! He's had enough for today. Let's go buy Mommy a present!";
        var b = "Press ENTER to continue"
        var e = ShowEndScreen;
        break;
      default:
        var m = "Rocky crashed!"
        var b = "Press ENTER to restart level";
        var e = RestartLevel;
        break;
    }
    var ev = game.time.events.add(Phaser.Timer.SECOND, function () {
      curr_dialog = new Dialog(t, 2, e);
      curr_dialog.setMainText(m);
      curr_dialog.setBottomText(b);
      curr_dialog.showDialog();
	  game.sound.play('aud_sadtrombone');
    });
    //ev.args = ["Player Crashed!", false];
  }
}

function CrashPlayerKillOther(s1, s2) {
  CrashPlayer(s1, s2);
  s2.kill();
}

function Explode(s) {
	if (s.data.player == true) {	
		aud_explosion.volume = 1.0;
		aud_explosion.play();
	} else {
		aud_explosion.volume = 0.50;
		aud_explosion.play();
	}
	
	
	var expl = others.create(s.x - (s.width * s.anchor.x) + (s.width / 2), s.y - (s.height * s.anchor.y) + (s.height / 2), 'explosion');
	expl.anchor.set(0.5);
	var tw1 = game.add.tween(expl)
	tw1.to( { alpha:0 }, 400, null, true);
  
  
	//console.log("TEST TEST TEST");
	var t2 = game.add.tween(expl.scale);
	t2.to({'x':2, 'y':2}, 400, null, true);

	tw1.onComplete.add(function(s, t) { s.destroy(); });
	return expl;
}

function ExplodeAndKill(s) {
  Explode(s);
  s.kill();
}

function MutualExplode(s1, s2) {
  var e = Explode(s1);
  //game.physics.arcade.enable(e);
  //e.body.velocity.x = s1.body.velocity.x;
  //e.body.velocity.y = s1.body.velocity.y;

  //var max_v = 100;
  //if (e.body.velocity.x > max_v) { e.body.velocity.x = max_v; }
  //if (e.body.velocity.x < -max_v) { e.body.velocity.x = -max_v; }
  //if (e.body.velocity.y > max_v) { e.body.velocity.y = max_v; }
  //if (e.body.velocity.y < -max_v) { e.body.velocity.y = -max_v; }

  //e.body.drag.set(500);
  s1.kill();
  s2.kill();
}

function EnemyPlatformCollide(e, p) {
  if (e.data.eid == 1) {
    ExplodeAndKill(e);
  }
}

// OTHER /////////////

function CreateDialog(message, pause_game) {


}
