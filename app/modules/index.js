define('mediator', [], function () {
  'use strict';

  var channels = new Map();
  var idProvider = 0;

  function spliceArray(arr, index) {
    if (index < (arr.length - 1)) {
      arr[index] = arr.pop();
    } else {
      arr.pop()
    }
  }

  function publish(name, data) {
    var channel = channels.get(name);
    
    if (! channel) return;

    for (var i = 0, il = channel.length; i < il; i++) {
      channel[i](data);
    }
  }

  function subscribe(name, func) {
    func.id = ++idProvider;

    if (! channels.has(name)) {
      channels.set(name, []);
    }

    channels.get(name).push(func);

    return idProvider;
  }

  function unsubscribe() {
    var channel = channels.get(name);
    var result = false;

    if (! channel) {
      throw new Error('No channel to unsubscribe from.');
    }

    for (var i = 0, il = channel.length; i < il; i++) {
      if (channel[i].id === id) {
        spliceArray(channel, i);
        result = true;
        break;
      }
    }

    if (! result) {
      throw new Error('No listener was unsubscribed.');
    }
  }

  return {
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };
});
