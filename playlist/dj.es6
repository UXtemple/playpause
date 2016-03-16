import dotKey from 'dot-key';

export default function dj(store, mountPoint='playlist', tracksActions, playlistActions) {
  console.log('---<', playlistActions)
  let state = dotKey(mountPoint, store.getState());

  return store.subscribe(function() {
    const next = dotKey(mountPoint, store.getState());

    if (state.current !== next.current && state.current !== 'undefined') {
      if (state.isPlaying) {
        store.dispatch(tracksActions.pause(state.tracks[state.current]));
      }
      if (next.isPlaying) {
        const track = state.tracks[next.current];
        if(track === 'BREAKPOINT') {
          // TODO this seems to be constantly firing for some reason

          
          // dispatch playlist action hit BREAKPOINT
          // 1) bump current track
          // 2) isPlaying = false
          // console.log('state', state.current);
          // console.log('next', next.current);
          //store.dispatch(tracksActions.pause(state.tracks[next.current]));
          store.dispatch(playlistActions.hitBreakpoint());
        } else
        store.dispatch(tracksActions.play(state.tracks[next.current]));
      }
    }

    state = next;
  });
}
