import dotKey from 'dot-key';

export default function dj(store, mountPoint='playlist', tracksActions) {
  let state = dotKey(mountPoint, store.getState());

  return store.subscribe(function() {
    const next = dotKey(mountPoint, store.getState());

    if (state.current !== next.current && state.current !== 'undefined' && state.isPlaying) {
      store.dispatch(tracksActions.pause(state.tracks[state.current]));
      store.dispatch(tracksActions.play(state.tracks[next.current]));
    }

    state = next;
  });
}
