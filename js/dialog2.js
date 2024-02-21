// DIALOG.JS

class Dialog {
  constructor(t, i, e) {

    if (curr_dialog != null) {
      HideDialog();
    }

    this.selection = 0;
    this.tot_sprite_height = 0; // TOTAL HEIGHT OF ALL SPRITES IN MAIN AREA
    this.num_sprites = 0; // NUM SPRITES IN MAIN AREA
    this.enter_press = e;
    this.options_arr = [];
    this.opt_height = 0;
    this.main_text_height = 0;
	
	dialogs.visible = false;
	
    this.overlay = dialogs.create(0, 0, 'overlay');
    this.overlay.alpha = 0.75;
    this.overlay.fixedToCamera = true;
	
	this.up_key = null;
	this.down_key = null;
	
    switch (i) {
      case 1:
        this.dlg_key = 'dialog';
        break;
      case 2:
        this.dlg_key = 'dialog2';
        break;
      case 3:
        this.dlg_key = 'dialog_long';
        break;
    }
	
	
    this.dlgbox = dialogs.create(400, 300, this.dlg_key);
    this.dlgbox.anchor.set(0.5);
    this.dlgbox.fixedToCamera = true;
	
    this.title_text = game.add.text(0, -this.dlgbox.height / 2 + 23, t, { font: 'bold 18px Arial', fill: '#FFF' });
    this.title_text.anchor.set(0.5);
    this.dlgbox.addChild(this.title_text);
	
  }

  setOptions(arr, init) {
    var opt_bg;
    var s;
    this.init_sel = init;
    for (var i=0; i<arr.length; i++) {
      //console.log("OPT:" + arr[i]);

      opt_bg = game.add.sprite(0, 0, 'option_bg');
      opt_bg.anchor.set(0.5);
      //opt_bg.tint = 0xDDDDDD;
      this.options_arr.push(opt_bg);

      s = game.add.text(0, 4, arr[i], {font: 'bold 24px Arial', fill:'#333'});
      s.anchor.set(0.5);
      s.scale.set(0.75);
      s.data = {bg:opt_bg};
      //s.scale.set(0.75);
      //this.options_arr.push(s);
      opt_bg.data = {text_s:s};
      this.dlgbox.addChild(opt_bg);
      opt_bg.addChild(s);

      //opt_bg.scale.set(0.75);

      //this.tot_sprite_height += opt_bg.height;
      //this.num_sprites += 1;

    }

    if (arr.length > 0) {
      this.opt_height = (arr.length * opt_bg.height) + ((arr.length - 1) * 10);
      this.num_sprites += 1;
    }

    this.sel_box = game.add.sprite(0, 0, 'sel_box');
    this.sel_box.anchor.set(0.5);
    this.sel_box.scale.set(1);
    this.dlgbox.addChild(this.sel_box);
  }

  setBottomText(str) {
    this.bottom_text = game.add.text(0, this.dlgbox.height / 2 - 23, str, { font: 'bold 12px Arial', fill: '#666' });
    this.bottom_text.anchor.set(0.5);
    this.dlgbox.addChild(this.bottom_text);
  }

  setMainText(str) {
    this.main_text = game.add.text(0, -40, str, { font: 'normal 18px Arial', fill: '#333', align: 'center', wordWrap: true, wordWrapWidth: 300 });
    this.main_text.anchor.set(0.5);
    this.dlgbox.addChild(this.main_text);
    this.main_text_height = this.main_text.height;
    //this.tot_sprite_height += this.main_text.height;
    this.num_sprites += 1;
  }

  setEnterPress(e) {
    this.enter_press = e;
  }

  showDialog() {
	
	aud_blip.play();
	
    // SET MAIN VERTICAL SPACE SIZE
    this.v_space = this.dlgbox.height - 40;
    if (this.bottom_text != null) { this.v_space -= 45; }
    //console.log("VSPACE: " + this.v_space);

    //this.spacing = (this.v_space - this.tot_sprite_height) / (this.num_sprites + 1);
    this.spacing = (this.v_space - this.main_text_height - this.opt_height) / (this.num_sprites + 1);
    //console.log("SPACING: " + this.tot_sprite_height + ", " + this.num_sprites + ", " + this.spacing);


    var next_start = (this.dlgbox.height / -2) + 40;
    if(this.main_text != null) {
      this.main_text.y = next_start + this.spacing + this.main_text.height / 2;
      next_start = this.main_text.y + this.main_text.height / 2;
      //console.log("MT: " + this.main_text.height);
    }

    if (this.options_arr.length > 0) {
      next_start += this.spacing;
      for (var i=0; i<this.options_arr.length; i++) {
        var s = this.options_arr[i];
        s.y = next_start + s.height / 2;
        next_start = s.y + s.height / 2 + 10;

        //var bg_y = s.y;
        //s.data.opt_bg.y = bg_y;

        //console.log("option: " + s.height);
      }
      this.next_start += this.spacing - 10;

      this.setSelection(this.init_sel, true);

      this.up_key = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	  this.up_key.onDown.add(this.selectUp, this);
	  
      this.down_key = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	  this.down_key.onDown.add(this.selectDown, this);
    }

    k_enter.reset();
    k_enter.onDown.addOnce(this.enter_press, this);

    this.dlgbox.scale.set(0.0);
	dialogs.visible = true;
    game.add.tween(this.dlgbox.scale).to({x:1, y:1}, 50, null, true);
  }

  setSelection(i, skip_tween) {
    console.log("OPTION SELECTED: " + i);
    if (i >= 0 && i<= this.options_arr.length - 1) {
      aud_blip.play();
	  var new_s = this.options_arr[i];
      var old_s = this.options_arr[this.selection];
      var new_y = new_s.y;
      if (skip_tween == null || skip_tween == false) {
        game.add.tween(this.sel_box).to({y:new_y}, 10, null, true);
        game.add.tween(old_s.data.text_s.scale).to({x:0.75, y:0.75}, 100, null, true);
        game.add.tween(new_s.data.text_s.scale).to({x:1, y:1}, 100, null, true);
        //game.time.events.add(100, function(s) {s.tint = 0xFFFFFF;}, this, old_s.data.text_s);
        //game.time.events.add(100, function(s) {s.tint = 0x000000;}, this, new_s.data.text_s);
        //game.time.events.add(time_cursor + s.data.d, this.animationEvent, this, s);
        //game.add.tween(old_s.data.text_s).to({tint:0xFFFFFF}, 100, null, true);
        //game.add.tween(new_s.data.text_s).to({tint:0x000000}, 100, null, true);
      } else {
        this.sel_box.y = new_y;
        old_s.data.text_s.scale.set(0.75);
        new_s.data.text_s.scale.set(1);
        old_s.data.text_s.tint = 0xFFFFFF;
        new_s.data.text_s.tint = 0X000000;
      }

      this.selection = i;
    }

  }

  selectUp() {
	 
    console.log("UP");
    this.setSelection(this.selection - 1, false);
  }

  selectDown() {
    console.log("DOWN");
    this.setSelection(this.selection + 1, false);
  }

}


function HideDialog(skip_overlay) {
  console.log("HIDE DIALOG");
  
  if (curr_dialog != null) {
	aud_blip.play();
    
	//if (skip_overlay == null || skip_overlay == false) {
    //  curr_dialog.overlay.destroy()
    //}
    
	//dialogs.visible = false;
	game.input.keyboard.reset(true);
	curr_dialog.dlgbox.destroy();
    dialogs.removeAll();
    curr_dialog = null;
	
  }
}
