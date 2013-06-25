
function Map(options) {
  this.map = null;
  this.dinamycLayer = null;
  this.options = options;
  this.previous_time = new Date().getTime();

  this.init();
}

Map.prototype.init = function(done) {
  var self = this;

  cartodb.createVis('map', 'scripts/data/viz.json').done(function(vis, layers) {
    self.map = vis.getNativeMap();

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

  var timeUpdated = new Date((this.dinamycLayer.time*15*60 + START_DATE)*1000)

  var hours = timeUpdated.getHours();
  var minutes = timeUpdated.getMinutes();
  var date = timeUpdated.getDate();
  var month = timeUpdated.getMonth() + 1;
  var year = timeUpdated.getFullYear();

  minutes = (minutes<10?'0':'') + minutes;

  document.getElementById('hour').innerHTML = hours + ":" + minutes + '<br /><span>' + date + '/' + month + '/' + year + '</span>';
  requestAnimationFrame(this._tick);
}


Map.prototype.play = function() {
  this.dinamycLayer.play();
  requestAnimationFrame(this._tick);
}

Map.prototype.stop = function() {
}
