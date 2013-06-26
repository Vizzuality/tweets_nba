
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

    cartodb.createVis('map', 'scripts/data/viz.json').done(function(vis, layers) {
      self.map = vis.getNativeMap();

      self.dinamycLayer = new L.TimeLayer({
        start_date: window.AppData.START_DATE,
        end_date: window.AppData.END_DATE
      });

      self.map.addLayer(self.dinamycLayer);
      self._tick = self._tick.bind(self);
      self.previous_time = new Date().getTime();
      self.play();
    });
  },

  _tick: function() {
    var now = new Date().getTime();
    var delta =  0.001*(now - this.previous_time);
    this.previous_time = now;
    this.dinamycLayer._render(delta);

    // var timeUpdated = new Date((this.dinamycLayer.time*15*60 + START_DATE)*1000)
    // requestAnimationFrame(this._tick);
  },

  set_time: function(t) {
    // console.log(t);
  },

  play: function() {
    this.dinamycLayer.play();
    // requestAnimationFrame(this._tick);
  },

  stop: function() {
  },

  render: function() {
    requestAnimationFrame(this._tick);
  },
}
