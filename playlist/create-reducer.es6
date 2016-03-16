export default function createReducer({HIT_BREAKPOINT, SET_CURRENT, SET_TRACKS}, {END, PAUSE, PLAY, STOP}) {
  return function playlistReducer(state={tracks: []}, action) {
    let nextState = state;
    let nextCurrent;

    switch (action.type) {
    case END:
      nextCurrent = state.current + 1;

      if (nextCurrent < state.tracks.length) {
        nextState = {
          ...state,
          current: nextCurrent
        };
      } else {
        nextState = {
          ...state,
          isPlaying: false
        };
      }
      break;

    case PAUSE:
    case STOP:
      const pausedIndex = state.tracks.indexOf(action.payload.id);

      if (pausedIndex === state.current) {
        nextState = {
          ...state,
          isPlaying: false
        };
      }
      break;

    case PLAY:
      nextCurrent = state.tracks.indexOf(action.payload.id);

      if (nextCurrent !== -1) {
        nextState = {
          ...state,
          current: nextCurrent,
          isPlaying: true
        };
      }
      break;

    // TODO - this may need looking at
    case HIT_BREAKPOINT:
      nextState = {
        ...state,
        current: action.payload.current,
        isPlaying: false
      };
      break;


    case SET_CURRENT:
      nextState = {
        ...state,
        current: action.payload.current
      };
      break;

    case SET_TRACKS:
      nextState = {
        current: 0,
        isPlaying: false,
        tracks: action.payload.tracks
      };
      break;

    default: break;
    }

    return nextState;
  }
}
