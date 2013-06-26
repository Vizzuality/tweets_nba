
var BALLS_COLOR_ES = 'rgba(255, 77, 77, .4)',
    BALLS_COLOR_NO_ES = 'rgba(238, 238, 238, .2)',
    BALL_SIZE_GAIN = 3; // ball size is greater when this value is increased,
    BALL_ANIMATION_SPEED = 3; // no more than 5,
    dragged = false,
    clicked = false,
    stopped = false,
    valueStart = 0;

if($.browser.mobile) {
  document.location = "/mobile.html";
} else if(Modernizr.canvas) {
  App.initialize();
} else {
  document.location = "/oldbrowsers.html";
}
