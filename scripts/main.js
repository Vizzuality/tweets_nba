if($.browser.mobile) {
  document.location = "/mobile.html";
} else if(Modernizr.canvas) {
  // TODO: GLOBAL VARS
  var city = 'london',
      dragged = false,
      clicked = false,
      stopped = true,
      valueStart = 0,
      isSlowBrowser = false,
      isWebWorkers = true,
      isDebug = false;

  if(!Modernizr.webworkers) {
    isWebWorkers = false;
  }

  if(checkVersion()) {
    isSlowBrowser = true;
  }

  if(location.hash.indexOf('debug') != -1)
    isDebug = true;

  App.initialize(window.AppData.CITIES[city]);

  // TODO: 404.html
} else {
  document.location = "/oldbrowsers.html";
}
