import dotKey from 'dot-key';

export default function createActions(mountPoint='playlist') {
  const HIT_BREAKPOINT = `${mountPoint}/HIT_BREAKPOINT`;
  function hitBreakpoint() {
    return function hitBreakpointThunk(dispatch, getState) {
      const state = dotKey(mountPoint, getState());
      let afterBreakPoint = state.current + 1;
      if(afterBreakPoint >= state.tracks.length) {
        afterBreakPoint = state.current;
      }

      dispatch({
        type: HIT_BREAKPOINT,
        payload: {
          current: afterBreakPoint
        }
      });
    }
  }

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
    HIT_BREAKPOINT,
    hitBreakpoint,
    nextOrStop,
    prevOrStop,
    SET_CURRENT,
    setCurrent,
    SET_TRACKS,
    setTracks
  };
}
