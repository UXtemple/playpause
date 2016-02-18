export default function createReducer({END, JUMP, LOAD, PAUSE, PLAY, STOP, TICK}) {
  return function tracksReducer(state={}, action) {
    let nextState = state;
    let id;
    let nextTrack;

    switch (action.type) {
      case END:
        id = action.payload.id;

        nextTrack = {
          ...state[id],
          didEnd: true,
          isPlaying: false
        };
        break;

      case JUMP:
      case TICK:
        id = action.payload.id;

        nextTrack = {
          ...state[id],
          time: action.payload.time
        };
        break;

      case LOAD:
        id = action.meta.id;

        if (action.sequence.type === 'start') {
          nextTrack = {
            didEnd: false,
            id,
            isLoading: true,
            isPlaying: false,
            isReady: false,
            time: 0
          };
        } else if (action.error) {
          nextTrack = {
            ...state[id],
            error: true,
            isLoading: false,
            message: action.payload.message
          };
        } else {
          nextTrack = {
            ...state[id],
            duration: action.payload.duration,
            isLoading: false,
            isReady: true
          };
        }
        break;

      case PAUSE:
        id = action.payload.id;

        nextTrack = {
          ...state[id],
          isPlaying: false
        };
        break;

      case STOP:
        id = action.payload.id;

        nextTrack = {
          ...state[id],
          didEnd: true,
          isPlaying: false,
          time: 0
        };
        break;

      case PLAY:
        id = action.payload.id;

        nextTrack = {
          ...state[id],
          isPlaying: true
        };
        break;

      default: break;
    }

    if (id && nextTrack) {
      nextState = {
        ...state,
        [id]: nextTrack
      };
    }

    return nextState;
  }
}
