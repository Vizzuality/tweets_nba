function Slider(el, options) {
  var self = this;

  this.$el = el;
  this.$slider_container = $("#slider_wrapper");

  this.options = {
    timeMin: options.timeMin,
    timeRange: options.timeRange
  };

  self.initialize();
}

Slider.prototype = {
  initialize: function() {
    var self = this;

    this.valueStop = 0;

    self.$el.slider();
    this._initBindings();
  },

  _initBindings: function() {
    var self = this;

    Events.on("enableslider", this._onEnableSlider, this);
    Events.on("disableslider", this._onDisableSlider, this);

    Events.on("clickhandle", function(val) {
      clicked = true;
      valueStart = val;

      $(document).on("mousemove", function() {
        dragged = true;
      });
    });

    $(document).on("mouseup", function() {
      if(clicked) {
        self.valueStop = self.$el.slider("value");

        dragged = false;
        clicked = false;

        $(this).off('mousemove');
      }
    });

    this.$el
      .on("slide", function(event, ui) {
        self.onSlideStart(ui.value);
      })
      .on("slidestop", function(event, ui) {
        self.onSlideStop(ui.value);
      })
      .find("a")
        .on("mousedown", function() {
          Events.trigger("clickhandle", self.$el.slider("value"));
        })
        .on("click", function() {
          if(valueStart === self.valueStop) {
            if(!stopped) {
              Events.trigger("stopanimation");
            } else {
              Events.trigger("resumeanimation");
            }
          }
        });
  },

  _onEnableSlider: function() {
    $(this.$slider_container).animate({
      bottom: '30px'
    });
  },

  _onDisableSlider: function() {
    $(this.$slider_container).animate({
      bottom: '-110px'
    });

    Events.trigger("stopanimation");
  },

  onSlideStart: function(pos) {
    var time = this.posToTime(pos);

    Events.trigger("changetime", time);

    this.updateHour(time);
  },

  onSlideStop: function(pos) {
    var time = this.posToTime(pos);

    this.$el.slider("value", pos);

    Events.trigger("changetime", time);

    this.updateHour(time);
  },

  updateHour: function(time) {
    var offset = new Date().getTimezoneOffset()*60*1000;
    var timeUpdated = new Date(this.options.timeMin + 1000 * time  + offset);
    var hours = timeUpdated.getHours();
    var minutes = timeUpdated.getMinutes();

    if(minutes%2 === 0) {
      minutes = (minutes<10?'0':'') + minutes;
      $("#hour").text(hours + ":" + minutes);
    };
  },

  posToTime: function(pos) {
    return pos * 60 * this.options.timeRange / 100;
  },

  timeToPos: function(time) {
    return 100 * time / (60 * this.options.timeRange);
  },

  render: function() { // empty on purpose
    
  },

  set_time: function(time) {
    this.$el.slider("value", this.timeToPos(time));

    this.updateHour(time);
  }
}
