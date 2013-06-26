
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
    });
  },

  set_time: function(t) {
    if(this.dinamycLayer) {
      this.dinamycLayer.set_time(t);
    }
  },

  render: function() {
    var now = new Date().getTime();
    var delta =  0.001*(now - this.previous_time);
    this.previous_time = now;

    if(this.dinamycLayer) {
      this.dinamycLayer._render(delta);
    }
  },
}
