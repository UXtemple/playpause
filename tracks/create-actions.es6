export default function createActions(nodes, {mountPoint='tracks'}={}) {
  const END = `${mountPoint}/END`;
  function end(id) {
    return {
      type: END,
      payload: {
        id
      }
    };
  }

  const JUMP = `${mountPoint}/JUMP`;
  function jump(id, to) {
    return function jumpThunk(dispatch, getState) {
      const track = getState()[mountPoint][id];

      if (track && track.isReady) {
        if (nodes.jump(id, to)) {
          dispatch({
            type: JUMP,
            payload: {
              id,
              time: to
            }
          });
        }
      }
    };
  }

  const LOAD = `${mountPoint}/LOAD`;
  function load(id, src=id) {
    return function loadThunk(dispatch, getState) {
      const track = getState()[mountPoint][id];

      if (typeof track === 'undefined') {
        dispatch({
          type: LOAD,
          payload: nodes.load({
            id,
            onEnd: () => dispatch(end(id)),
            src
          }),
          meta: {
            id
          }
        });
      }
    };
  }

  const PAUSE = `${mountPoint}/PAUSE`;
  function pause(id) {
    return function pauseThunk(dispatch, getState) {
      const track = getState()[mountPoint][id];

      if (track && track.isReady && track.isPlaying) {
        nodes.pause(id);

        dispatch({
          type: PAUSE,
          payload: {
            id
          }
        });
      }
    }
  }

  const PLAY = `${mountPoint}/PLAY`;
  function play(id) {
    return function playThunk(dispatch, getState) {
      const track = getState()[mountPoint][id];

      if (track && track.isReady && !track.isPlaying) {
        nodes.play(id, time => dispatch(tick(id, time)));

        dispatch({
          type: PLAY,
          payload: {
            id
          }
        });
      }
    };
  }

  const TICK = `${mountPoint}/TICK`;
  function tick(id, time) {
    return function tickThunk(dispatch, getState) {
      const track = getState()[mountPoint][id];

      if (track && track.isReady) {
        dispatch({
          type: TICK,
          payload: {
            id,
            time
          }
        })
      }
    }
  }

  return {
    END,
    end,
    JUMP,
    jump,
    LOAD,
    load,
    PAUSE,
    pause,
    PLAY,
    play,
    TICK,
    tick
  };
}
