define('mediator', [],
function () {
  'use strict';

  var channels = {};

  function subscribe (channel, fn) {
    if (! channels[channel]) {
      channels[channel] = [];
    }

    channels[channel].push({ context : this, callback : fn });
  }

  function publish (channel) {
    if (! channels[channel]) {
      return false;
    }

    var i, l;

    // Take special care of arguments, with first argument dropped.
    var argLength = arguments.length - 1;
    var args = new Array(argLength);
    for (i = 1, l = arguments.length; i < l; i++) {
      args[i - 1] = arguments[i];
    }

    // Call all subscribers
    for (i = 0, l = channels[channel].length; i < l; i++) {
      var subscription = channels[channel][i];
      subscription.callback.apply(subscription.context, args);
    }
  }

  return {
    publish   : publish,
    subscribe : subscribe
  };
});
