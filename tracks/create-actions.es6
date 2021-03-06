import dotKey from 'dot-key';

export default function createActions(nodes, mountPoint='tracks') {
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
      const track = dotKey(mountPoint, getState())[id];

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
  function load(trackDetails) {
    return function loadThunk(dispatch, getState) {
      const track = dotKey(mountPoint, getState())[trackDetails.src];

      if (typeof track === 'undefined') {
        dispatch({
          type: LOAD,
          payload: nodes.load({ trackDetails, onEnd: () => dispatch(end(trackDetails.src)) }),
          meta: {
            id: trackDetails.src
          }
        });
      }
    };
  }

  const MUTE = `${mountPoint}/MUTE`;
  function mute(id) {
    return function muteThunk(dispatch, getState) {
      const track = dotKey(mountPoint, getState())[id];

      if (track && track.isReady && track.isPlaying) {
        nodes.mute(id);

        dispatch({
          type: MUTE,
          payload: {
            id
          }
        });
      }
    }
  }

  const PAUSE = `${mountPoint}/PAUSE`;
  function pause(id) {
    return function pauseThunk(dispatch, getState) {
      const track = dotKey(mountPoint, getState())[id];

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
      const track = dotKey(mountPoint, getState())[id];

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

  const STOP = `${mountPoint}/STOP`;
  function stop(id) {
    return function stopThunk(dispatch, getState) {
      const track = dotKey(mountPoint, getState())[id];

      if (track && track.isReady && track.isPlaying) {
        nodes.stop(id);

        dispatch({
          type: STOP,
          payload: {
            id
          }
        });
      }
    }
  }

  const TICK = `${mountPoint}/TICK`;
  function tick(id, time) {
    return function tickThunk(dispatch, getState) {
      const track = dotKey(mountPoint, getState())[id];

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

  const UNMUTE = `${mountPoint}/UNMUTE`;
  function unMute(id) {
    return function unMuteThunk(dispatch, getState) {
      const track = dotKey(mountPoint, getState())[id];

      if (track && track.isReady && track.isPlaying) {
        nodes.unMute(id);

        dispatch({
          type: UNMUTE,
          payload: {
            id
          }
        });
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
    MUTE,
    mute,
    PAUSE,
    pause,
    PLAY,
    play,
    STOP,
    stop,
    TICK,
    tick,
    UNMUTE,
    unMute
  };
}
