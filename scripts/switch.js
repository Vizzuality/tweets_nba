function Switch(el) {
  this.$el = el;

  this.dynamicEnabled = false;

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
        } else {
          return false;
        }
      });
  },

  toggleDynamic: function(dynamic) {
    if(dynamic) {
      $(this.$el).animate({
        bottom: '150px'
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
