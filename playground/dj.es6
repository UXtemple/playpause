import { actions as tracksActions }  from './tracks';

export default function dj(store) {
  let state = store.getState().playlist;

  return store.subscribe(function() {
    const next = store.getState().playlist;

    if (state.current !== next.current && state.current !== 'undefined' && state.isPlaying) {
      store.dispatch(tracksActions.pause(state.tracks[state.current]));
      store.dispatch(tracksActions.play(state.tracks[next.current]));
    }

    state = next;
  });
}
