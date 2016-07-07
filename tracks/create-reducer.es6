export default function createReducer({END, JUMP, LOAD, MUTE, PAUSE, PLAY, STOP, TICK, UNMUTE}) {
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

      case MUTE:
        id = action.payload.id;

        nextTrack = {
          ...state[id],
          isMuted: true
        };
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

      case UNMUTE:
        id = action.payload.id;

        nextTrack = {
          ...state[id],
          isMuted: false
        };
        break;
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
