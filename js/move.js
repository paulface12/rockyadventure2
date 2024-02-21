// MOVE.JS

function MoveAllSprites(o) {

////////////////////////////////////////
// Background
////////////////////////////////////////


  bg1.tilePosition.x = game.camera.x / -2;

/////////////////////////////////////////
// move player
/////////////////////////////////////////


  if (!player_disabled) {
    
	
	//text_timer.text = ((GetCorrectedGameTime() - start_time) / 1000).toFixed(2);
    var move_speed = 250;
    player.body.velocity.set(cam_speed , 0);

    if (cursors.up.isDown) { player.body.velocity.y = -move_speed; }
    if (cursors.down.isDown) { player.body.velocity.y = move_speed; }
    if (cursors.left.isDown && difficulty < 4) { player.body.velocity.x = cam_speed - move_speed; }
    if (cursors.right.isDown) { player.body.velocity.x = cam_speed + move_speed; }

    cam_s.body.velocity.x = cam_speed;
    var speed_up = false;
    //var max_speed = cam_speed + move_speed;
    if (player.x > game.camera.x + 400) {
      //if (player.body.velocity.x > cam_speed) {
        cam_s.body.velocity.x = cam_speed + ((player.x - game.camera.x - 400) / 400) * move_speed * 1.1;
        speed_up = true;
      //}
    }

    //if (speed_up) {
    //  cam_s.body.velocity.x += 6;
    //} else {
    //  cam_s.body.velocity.x -= 6;
    //  if (cam_s.body.velocity.x < cam_speed) {cam_s.body.velocity.x = cam_speed}
    //}
  } else {
	  
  }

  glimmers.forEachAlive(MoveGlimmer);

/////////////////////////////////////////
// move enemies
/////////////////////////////////////////

  // level 1
  enemies.forEachAlive(MoveEShip2);

  // level 2
  fish.forEachAlive(MoveFish);
  watercannons.forEachAlive(FireWaterCannon);

  // level 3
  ghostblocks.forEachAlive(MoveGhostblock);
  fences.forEachAlive(MoveFence);
  camoships.forEachAlive(MoveCamoship);
  crusherheads.forEachAlive(MoveCrusherHead);
  fallspikes.forEachAlive(MoveFallSpike);

  // GARBAGE COLLECTION
  platforms.forEachAlive( function(p) {
    if (p.x < game.camera.x - 100) {
      p.destroy();
    }
  });

  dirt.forEachAlive( function(p) {
    if (p.x < game.camera.x - 100) {
      p.destroy();
    }
  });

  waters.forEachAlive( function(p) {
    if (p.x < game.camera.x - 100) {
      p.destroy();
    }
  });

}

function MoveGlimmer(g) {
  if (GetCorrectedGameTime() > g.data.lastStart + 2000) {
    g.animations.play('gl');
    g.data.lastStart = GetCorrectedGameTime();
  }
}
function MoveEShip2(e) {
  if (e.data.eid == 2 ) {
    e.body.velocity.y = Math.sin((e.data.ctr / 120) * Math.PI) * 100; // MOVE BASED ON SINE WAVE
    e.data.ctr = e.data.ctr + 1;
    if (GetCorrectedGameTime() > e.data.lastMissileTime + 1750) { // FIRE MISSILE EVERY X SECONDS
      FireEMissile(e.body.x, e.body.y + 16)
      e.data.lastMissileTime = GetCorrectedGameTime() ;
    }
  }
}

function FireEMissile(x, y) {
  var m = emissiles.create(x, y, 'emiss');
  m.anchor.set(0.5);
  m.lifespan = 1500;
  m.body.velocity.x = -500;
}

function MoveFish(s) {
    if (s.data.state == 0) { // SWIMMING STATE
      if (Math.abs(s.x - player.x) < 100 && !player_crashed) { // commence jumping
        s.data.state = 1;
        s.frame = 2;
        s.body.gravity.y = 300;
        s.body.velocity.y = -600;
        s.body.velocity.x = 0;
      } else { // swim back and forth
        s.body.velocity.y = 0;
        s.body.velocity.x = Math.sin((s.data.ctr / 95) * Math.PI) * 100;
        s.data.ctr = s.data.ctr + 1;
        if (s.body.velocity.x < 0) { s.frame = 1; } else { s.frame = 0; }
      }
    } else { // JUMPING STATE
      if (s.body.velocity.y >= 0) { // falling
        s.frame = 3;
        if (s.body.y >= s.data.origY) { // commence swimming
          s.body.y = s.data.origY;
          s.data.state = 0;
          s.body.gravity.y = 0;
          s.body.velocity.set(0);
        }
      }
    }
}

function FireWaterCannon(wc) {
  if (GetCorrectedGameTime() > wc.data.lastFire + 2000) {
    var wm = wmissiles.create(wc.x, wc.y, 'wmiss');
    wm.body.velocity.y = -300;
    wm.lifespan = 1500;
    wc.data.lastFire = GetCorrectedGameTime();
  }
}

function MoveGhostblock(gb) {
  var gbv = 300;
  if (gb.data.state == -1) { // unactivated
    if (Math.abs(gb.x - player.x) < 100) {
      gb.data.state = 0;
      gb.data.dir = 2;
      gb.data.lastMove = GetCorrectedGameTime() - 2000;
    }
  } else if (gb.data.state == 0) { // activated
    if (GetCorrectedGameTime()> gb.data.lastMove + 2000) { // move
      gb.data.state = 1;
      gb.alpha = 0.50;
      if      (gb.data.dir == 0) { gb.body.velocity.set(0, -gbv); }
      else if (gb.data.dir == 1) { gb.body.velocity.set(gbv, 0); }
      else if (gb.data.dir == 2) { gb.body.velocity.set(0, gbv); }
      else if (gb.data.dir == 3) { gb.body.velocity.set(-gbv, 0); }
    }
  }
}

function MoveFence(f) {
  if (GetCorrectedGameTime() > f.data.lastFire + 1000) {
    if (f.data.state == 0) {
      f.data.state = 1;
      game.add.tween(f).to( { alpha: 1, }, 250, null, true);
      f.data.lastFire = GetCorrectedGameTime();
    } else {
      f.data.state = 0;
      game.add.tween(f).to( { alpha: 0 } , 250, null, true);
      f.data.lastFire = GetCorrectedGameTime();
    }
  }
}

function MoveCamoship(cs) {
  if (cs.data.state == 0) {
    if (Math.abs(cs.x - player.x) < 100)
    {
      // fade out dollar image
      game.add.tween(cs).to( { alpha: 0.0, tint:0xFF0000 }, 500, null, true);
      cs.data.state = 1;
      // create enemy ship, fade in, start movement on complete
      var e = enemies.create(cs.x, cs.y, 'eship');
      e.data = {'eid':1};
      e.alpha = 0;
      var tw = game.add.tween(e).to( { alpha: 1.0 }, 500, null, true);
      tw.onComplete.add (function(e, tw) { e.body.velocity.x = -100; });
    }
  }
}

function MoveCrusherHead(ch) {
  var crush = ch.data.child
  if (ch.data.cid == 0) {
    ch.data.child.body.y = ch.body.y;
  } else {
    ch.data.child.body.y = ch.body.y - (7 * 32);
  }
}

function MoveFallSpike(fs) {
  if (Math.abs(fs.x - player.x) < 100) {
    fs.body.gravity.y = 450;
  }
}
