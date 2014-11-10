define('mediator', [],
function () {
  'use strict';

  var channels = {};

  function subscribe (channel, fn) {
    if (! channels[channel]) {
      channels[channel] = [];
    }

    channels[channel].push({ context : this, callback : fn });
    return this;
  }

  function publish (channel, args) {
    if (! channels[channel]) {
      return false;
    }

    var subscription;
    var i = channels[channel].length;

    while (i-- > 0) {
      subscription = channels[channel][i];
      subscription.callback.call(subscription.context, args);
    }

    return this;
  }

  return {
    publish   : publish,
    subscribe : subscribe
  };
});
