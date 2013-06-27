

function Map(options) {
  this.map = null;
  this.dinamycLayer = null;
  this.options = options;
  this.previous_time = new Date().getTime();

  this.init();
}

Map.prototype = {
  init: function(done) {
    var self = this;

    window.Vis = cartodb.createVis('map', 'scripts/data/viz.json').done(function(vis, layers) {
      self.map = vis.getNativeMap();

      self.dinamycLayer = new L.TimeLayer({
        start_date: window.AppData.START_DATE,
        end_date: window.AppData.END_DATE
      });

      self.map.addLayer(self.dinamycLayer);
      self._tick = self._tick.bind(self);
      self.previous_time = new Date().getTime();

      requestAnimationFrame(self._tick);
    });

    Events.on("resettime", function() {
      if(self.dinamycLayer) {
        self.dinamycLayer.set_time(window.AppData.START_DATE);
      }
    });
  },

  _tick: function() {
    var now = new Date().getTime();
    var delta =  0.001*(now - this.previous_time);
    this.previous_time = now;

    if(this.dinamycLayer && !stopped && !clicked) {
      this.dinamycLayer._render(delta);

      requestAnimationFrame(this._tick);      
    }
  },

  play: function() {
    requestAnimationFrame(this._tick);
  },

  set_time: function(t) {
    if(this.dinamycLayer && (dragged)) {
      this.dinamycLayer.set_time(t);
    }
  }
}
