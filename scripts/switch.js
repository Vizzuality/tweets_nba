function Switch(el) {
  this.$el = el;

  this.dynamicEnabled = true;

  this.initialize();
}

Switch.prototype = {
  initialize: function() {
    var self = this;

    this.$el.find("#static")
      .on("click", function(e) {
        e.preventDefault();

        if(self.dynamicEnabled) {
          self.dynamicEnabled = false;
          self.toggleDynamic(false);

          $(this).closest("li").addClass("selected");
          $(this).closest("li").siblings().removeClass("selected");

          window.Vis.getLayers()[1].getSubLayer(2).show();
          App.map.map.removeLayer(App.map.dinamycLayer);
        } else {
          return false;
        }
      });

    this.$el.find("#dynamic")
      .on("click", function(e) {
        e.preventDefault();

        if(!self.dynamicEnabled) {
          self.dynamicEnabled = true;
          self.toggleDynamic(true);

          $(this).closest("li").addClass("selected");
          $(this).closest("li").siblings().removeClass("selected");

          window.Vis.getLayers()[1].getSubLayer(2).hide();
          App.map.map.addLayer(App.map.dinamycLayer);
        } else {
          return false;
        }
      });
  },

  toggleDynamic: function(dynamic) {
    if(dynamic) {
      $(this.$el).animate({
        bottom: '150px'
      }, 250);

      Events.trigger("enableslider");
    } else {
      $(this.$el).animate({
        bottom: '10px'
      }, 250);

      Events.trigger("disableslider");
    }
  },

  render: function() { // empty on purpose
    
  }
}
