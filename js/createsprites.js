// FUNCTION THAT CHECKS LOADED map
// AND CREATES AND PLACES SPRITES

function CreateGlimmer(s) {
  var g = glimmers.create(s.x, s.y, 'glimmer', 0);
  g.anchor.set(s.anchor.x, s.anchor.y);
  g.data.lastStart = GetCorrectedGameTime();
  var ag = g.animations.add('gl', null, 15);
  //ag.onComplete.add(function(g) {
  //  game.time.events.add(1000, function(g) {
  //    g.animations.play('gl');
  //  }, this, g);
  //}, this, 0, g);
  //g.animations.play('gl');
  return g;
}

function LoadColumn (o, j) {
  if (j < o.map.width) {
    //console.log('LOAD COLUMN: ' + j);
    for (var i = 0; i < o.map.height; i++) {
      var tile = o.map.getTile(j, i);
      if (tile != null) {

        var x = tile.x * 32;
        var y = tile.y * 32 + 32;
        var xctr = x + 16;
        var yctr = y + 16;
        var s = null;

        switch (tile.index - 1) {
          case 0: // player
            player = others.create(xctr, yctr, 'ship');
            game.physics.arcade.enable(player);
            player.anchor.set(0.5);
            player.body.bounce.set(0.5);
            player.body.setSize(28, 28, 0, 0);
            player.body.gravity.y = 0;
            player.data = {xdiff:xctr, vx:0, vy:0, player:true};
            //player.fixedToCamera = true;
            break;
          case 1: // dollar
            if (!dollar_collected[dollar_id]) {
              console.log('DOLLAR CREATED: ' + dollar_id);
              console.log(dollar_collected[0] + ', ' + dollar_collected[1] + ', ' + dollar_collected[2] + ', ' + dollar_collected[3]);
              s = dollars.create(xctr, yctr, 'dollar');
              s.anchor.set(0.5);
              var g = CreateGlimmer(s);
              s.data = {id: dollar_id, collected:false, g:g};
              //s.addChild(g);


            } else {
              console.log('DOLLAR SKIPPED: ' + dollar_id);
            }
            dollar_id++;
            break;
          case 2: // goal
            goal = others.create(xctr, yctr, 'goal');
            game.physics.arcade.enable(goal);
            goal.anchor.set(0.5);
            goal.scale.set(0.33333);
            var g = CreateGlimmer(goal);
            goal.data = {collected: false};
            break;
          case 10: // wall
            s = platforms.create(x, y, 'wall');
            s.body.immovable = true;
            break;
          case 11: // dirt
            s = dirt.create(x, y, 'dirt');
            break;
          case 12: // grass
            s = platforms.create(x, y, 'grass');
            s.body.immovable = true;
            break;
          case 13: // sand
            s = platforms.create(x, y, 'sand');
            s.body.immovable = true;
            break;
          case 14: // water
            //s = waters.create(x, y, 'water');
            s = waters.create(x, y);
            s.renderable = false;
            break;
          case 15: // tree trunk
            s = platforms.create(x, y, 'trunk');
            s.body.immovable = true;
            break;
          case 16: // leaves
            s = platforms.create(x, y, 'leaves');
            s.body.immovable = true;
            break;
          case 20: // enemy ship 1 (straight left);
            s = enemies.create(x, y, 'eship');
            s.body.velocity.x = -100;
            s.data = {'eid':1};
            break;
          case 21: // enemy ship 2 (up and down rotate; fire missile)
            s = enemies.create(x, y,'eship');
            s.data = {'eid':2, 'ctr':0, 'lastMissileTime':GetCorrectedGameTime() };
            break;
          case 22: // fish
						//s = waters.create(x, y, 'water'); // water sprite behind fish
						s = fish.create(x, y, 'fish');
						s.data = {'eid':3, 'ctr':0, 'state':0, 'origY':s.body.y};
            break;
					case 23: // watercannon
						s = watercannons.create(x, y, 'cannon');
						s.data = {'lastFire':0};
            break;
          case 24: // camoship
						s = camoships.create(x, y, 'dollar');
						s.data = {'state':0};
            break;
				  case 25: // ghostblock
						s = ghostblocks.create(x, y, 'wall');
						s.data = {'lastMove':0, 'state':-1, 'dir':-1};
            break;
					case 26: // fence
					  s = fences.create(x, y, 'fence');
						s.alpha = 0.0;
						s.data = {'lastFire':GetCorrectedGameTime() - 2000, 'state':1};
						s = fencebgs.create(x, y, 'fencebg');
					  break;
					case 27: // crusher up
						var c = crushers.create(x, y, 'crusher_up');
						s = crusherheads.create(x, y); // invisible sprite
						s.body.setSize(32, 32);
            s.body.bounce.set(1);
						s.data = {'cid':0, 'origY':s.y, 'child':c};
						s.body.velocity.y = -100;
            break;
				  case 28: // crusher down
						var c = crushers.create(x, y, 'crusher_down');
						s = crusherheads.create(x, y); // invisible sprite
						s.body.setSize(32, 32);
            s.body.bounce.set(1);
						s.data = {'cid':1, 'origY':s.y, 'child':c};
						s.body.velocity.y = 100;
            break;
					case 29: // fall spike
						s = fallspikes.create(x, y, 'fallspike');
            //s.body.immovable = true;
            //s.body.drag.set(10000);
            break;
        }
      }
    }
  }
}
