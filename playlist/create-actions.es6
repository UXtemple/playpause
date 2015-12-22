import dotKey from 'dot-key';

export default function createActions(mountPoint='playlist') {
  function nextOrStop() {
    return function nextOrStopThunk(dispatch, getState) {
      const state = dotKey(mountPoint, getState());
      const nextIndex = state.current + 1;

      if (nextIndex < state.tracks.length) {
        dispatch(setCurrent(nextIndex));
      }
    }
  }

  function prevOrStop() {
    return function prevOrStopThunk(dispatch, getState) {
      const state = dotKey(mountPoint, getState());
      const prevIndex = state.current - 1;

      if (prevIndex >= 0) {
        dispatch(setCurrent(prevIndex));
      }
    }
  }

  const SET_CURRENT = `${mountPoint}/SET_CURRENT`;
  function setCurrent(current) {
    return function setCurrentThunk(dispatch, getState) {
      const state = dotKey(mountPoint, getState());

      if (current >= 0 && current < state.tracks.length) {
        dispatch({
          type: SET_CURRENT,
          payload: {
            current
          }
        });
      }
    }
  }

  const SET_TRACKS = `${mountPoint}/SET_TRACKS`;
  function setTracks(tracks) {
    return {
      type: SET_TRACKS,
      payload: {
        tracks
      }
    }
  }

  return {
    nextOrStop,
    prevOrStop,
    SET_CURRENT,
    setCurrent,
    SET_TRACKS,
    setTracks
  };
}
