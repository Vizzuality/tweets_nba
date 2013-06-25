
START_DATE = 1371160800;
END_DATE = 1371938174;
BALLS_COLOR_ES = 'rgba(255, 77, 77, 0.4)';
BALLS_COLOR_NO_ES = 'rgba(238, 238, 238, 0.2)';
BALL_SIZE_GAIN = 3; // ball size is greater when this value is increased
BALL_ANIMATION_SPEED = 3; // no more than 5

function Map(options) {
  this.map = null;
  this.dinamycLayer = null;
  this.options = options;
  this.previous_time = new Date().getTime();
}

Map.prototype.init = function(done) {
  var self = this;
  cartodb.createVis('map', '/viz.json').done(function(vis, layers) {
    self.map = vis.getNativeMap();
    /*
    layers[1].getSubLayer(0).hide();
    layers[1].getSubLayer(1).hide();
    layers[1].getSubLayer(2).hide();
    */
  //sle.map = L.map('map').setView([0, 0], 3);
  /*L.tileLayer('http://b.tile.stamen.com/toner-background/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="">OpenStreetMap</a> contributors'
}).addTo(this.map);*/
    self.dinamycLayer = new L.TimeLayer({
      start_date: START_DATE,
      end_date: END_DATE
    });
    self.map.addLayer(self.dinamycLayer);
    self._tick = self._tick.bind(self);
    self.previous_time = new Date().getTime();
    self.play();
  });
};



Map.prototype._tick = function() {
  var now = new Date().getTime();
  var delta =  0.001*(now - this.previous_time);
  this.previous_time = now;
  this.dinamycLayer._render(delta);
  document.getElementById('time').innerHTML = new Date((this.dinamycLayer.time*15*60 + START_DATE)*1000);
  requestAnimationFrame(this._tick);
}


Map.prototype.play = function() {
  this.dinamycLayer.play();
  requestAnimationFrame(this._tick);
}

Map.prototype.stop = function() {
}

$(function() {
  var map = new Map();
  map.init();
});

