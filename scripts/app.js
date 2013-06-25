var App = {

  animables: [], // list of objects need to be updated and rendered

  initialize: function(options) {
    var self = this;

    this.options = _.extend({}, options);

    // Map
    this.map = new Map();

    // Switch
    this.switch = new Switch($('#switch'));


    // ****
    // Map animated particled
    // ****

    // Slider
    this.slider = new Slider($('#slider'), {
      timeMin: new Date(this.init_time).getTime(),
      timeRange: (this.last_time - this.init_time) * 1
    });

    this._initBindings();
    
    this.animables.push(this.map, this.slider);
    this._tick = this._tick.bind(this);
    requestAnimationFrame(this._tick);
  },

  _initBindings: function() {
    var self = this;

    Events.on("enableanimation", this._onEnableAnimation, this);
    Events.on("disableanimation", this._onDisableAnimation, this);
    Events.on("resumeanimation", this._onResumeAnimation, this);
    Events.on("stopanimation", this._onStopAnimation, this);

    Events.on("changetime", function(time) {
      self.time = time >> 0;
    });
  },

  _onResumeAnimation: function() {
    stopped = false;
    //TODO: this should be in slider
    // jquery driven development is shit
    $(".ui-slider-handle").removeClass("stopped");
  },

  _onStopAnimation: function() {
    stopped = true;
    //TODO: this should be in slider
    // jquery driven development is shit
    $(".ui-slider-handle").addClass("stopped");
  },

  _tick: function() {
    var self = this;
    this.tick();
    if($.browser.safari) {
      // for some reason in safari when the animations is heavy the UI thread gets blocked
      // so we need to give some time to be able to get mouse events
      // thanks to iker jimenez (@navedelmisterio) for the inspiration
      setTimeout(function() {
        requestAnimationFrame(self._tick);
      }, 1);
    } else {
        requestAnimationFrame(self._tick);
    }
  },

  tick: function() {
    var animables = this.animables;

    // update time
    var t0 = new Date().getTime();
    var dt = 0.001*(t0 - this.old_time);
    dt = dt*this.options.scale*this.options.time_scale;
    dt = Math.min(15*60, dt); // dont allow the time advance more than 15 mins
    this.old_time = t0;

    if(!stopped && !clicked){
      this.time += dt;
      if(this.time/60 >= this.last_time) {
        this.time = 0;
      }
      for(var i = 0; i < animables.length; ++i) {
        var a = animables[i];
        a.set_time(this.time);
        a.render();
      }
    } else if (dragged) {
      for(var i = 0; i < animables.length; ++i) {
        var a = animables[i];
        a.set_time(this.time);
        a.render();
      }
    }

  },

  add_debug: function() {
    var gui = new dat.GUI();
    var ro = this.map.probsLayer.render_options
    //gui.remember(this);
    //gui.remember(ro);
    gui.add(this.options, 'scale', 0, 10)
    //gui.add(ro, 'filtered')

    var f2 = gui.addFolder('particles');
    f2.add(ro, 'part_min_size', 0.2, 40).onChange(this.map.probsLayer.precache_sprites)
    f2.add(ro, 'part_inc', 0, 70).onChange(this.map.probsLayer.precache_sprites)
    f2.add(ro, 'min_alpha', 0, 0.3).onChange(this.map.probsLayer.precache_sprites)
    f2.add(ro, 'alpha_inc', 0, 0.5).onChange(this.map.probsLayer.precache_sprites)
    f2.add(ro, 'part_type', ['sphere', 'glow']).onChange(this.map.probsLayer.precache_sprites)
    f2.addColor(ro, 'part_color').onChange(this.map.probsLayer.precache_sprites)
    f2.open();

    var post = gui.addFolder('Postprocess');
    post.add(ro, 'post_alpha', 0, 1)
    post.add(ro, 'post_decay', 0, 1)
    post.add(ro, 'post_size', [64, 128, 256, 512, 1024]).onChange(this.map.probsLayer.init_post_process)
    post.add(ro, 'post_process')
    post.open()
  }
};
