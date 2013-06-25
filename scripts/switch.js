function Switch(el, options) {
  this.$el = el;

  this.options = {
  };

  this.dynamicEnabled = false;

  this.initialize();
}

Switch.prototype = {
  initialize: function() {
    var self = this;

    this._initBindings();
  },

  _initBindings: function() {
    var self = this;

    this.$el.find("#static")
      .on("click", function(e) {
        e.preventDefault();

        if(self.dynamicEnabled) {
          self.dynamicEnabled = false;
          self.toggleDynamic(false);
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
        } else {
          return false;
        }
      });
  },

  toggleDynamic: function(dynamic) {
    console.log(dynamic);
    if(dynamic) {
      $(this.$el).animate({
        bottom: '100px'
      });

      Events.trigger("enableslider");
    } else {
      $(this.$el).animate({
        bottom: '0'
      });

      Events.trigger("disableslider");
    }
  },

  render: function() { // empty on purpose
    
  }
}
