import createAudioContext from 'ios-safe-audio-context';
import createNode from './create-media-element-node';

const context = createAudioContext();
const nodes = {};
const ONE_SECOND_IN_MS = 1000;

export function jump(id, to) {
  let ok = false;

  if (to >= 0 && to < nodes[id].audio.duration) {
    nodes[id].audio.currentTime = to;
    ok = true;
  }

  return ok;
}

export function load({id, onEnd, src}) {
  function finalOnEnd() {
    stopTicking(id);

    if (typeof onEnd === 'function') {
      onEnd();
    }
  }

  return createNode({context, onEnd: finalOnEnd, src})
    .then(node => nodes[id] = node)
    .then(node => ({
      duration: node.audio.duration
    }));
}

export function pause(id) {
  stopTicking(id);
  nodes[id].audio.pause();
}

export function play(id, tick) {
  nodes[id].audio.play();

  if (typeof tick === 'function') {
    startTicking(id, tick);
  }
}

export function stop(id) {
  pause(id);
  jump(id, 0);
}

function startTicking(id, tick) {
  nodes[id].ticker = setInterval(function tickInterval() {
    tick(nodes[id].audio.currentTime);
  }, ONE_SECOND_IN_MS);
}

function stopTicking(id) {
  const { ticker, ...rest } = nodes[id];
  if (ticker) {
    clearInterval(ticker);
    nodes[id] = rest;
  }
}
