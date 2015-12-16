import { audio as createAudio } from 'simple-media-element';

export default function createMediaElementNode({context, middleware, src, onEnd}) {
  return new Promise(function(resolve, reject) {
    // create the audio media element
    const audio = createAudio(src);
    // create the node node that the web audio api needs
    const node = context.createMediaElementSource(audio);

    // bind onEnd dispatcher
    audio.addEventListener('ended', onEnd);

    // connect to the output
    let destination = context.destination;
    // but apply middleware if it exists
    if (typeof middleware === 'function') {
      destination = middleware(context, node);
    }
    node.connect(destination);

    // On most browsers the loading begins immediately. However, on iOS 9.2 Safari,
    // you need to call load() for events to be triggered.
    audio.load();

    function onReady() {
      resolve({
        audio,
        node
      });
    }

    if (audio.readyState >= audio.HAVE_ENOUGH_DATA) {
      onReady();
    } else {
      audio.addEventListener('canplay', function onReadyToPlay() {
        audio.removeEventListener('canplay', onReadyToPlay);
        onReady();
      });

      audio.addEventListener('error', function onError() {
        audio.removeEventListener('error', onError);
        reject();
      });
    }
  });
}
