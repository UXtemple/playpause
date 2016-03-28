import BREAKPOINT from './breakpoint';
import dotKey from 'dot-key';

export default function dj(store, mountPoint='playlist', tracksActions, playlistActions) {
  let state = dotKey(mountPoint, store.getState());

  return store.subscribe(function() {
    const actions = [];
    const next = dotKey(mountPoint, store.getState());

    if (state.current !== next.current && state.current !== 'undefined') {
      if (state.isPlaying) {
        actions.push(tracksActions.pause(state.tracks[state.current]));
      }
      if (next.isPlaying) {
        const track = state.tracks[next.current];
        if(track === BREAKPOINT) {
          actions.push(playlistActions.hitBreakpoint());
        } else {
          actions.push(tracksActions.play(state.tracks[next.current]));
        }
      }
    }

    state = next;

    actions.forEach(a => store.dispatch(a));
  });
}
