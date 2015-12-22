import * as playlist from './playlist';
import * as tracks from './tracks';

const {END, JUMP, LOAD, PAUSE, PLAY, TICK} = tracks.actions;
const {SET_CURRENT, SET_TRACKS} = playlist.actions;

const DEFAULT = {
  playlist: playlist.reducer(undefined, {type: '@@redux/INIT'}),
  tracks: tracks.reducer(undefined, {type: '@@redux/INIT'})
};

export default function playpauseReducer(state=DEFAULT, action) {
  let nextState = state;

  switch (action.type) {
    case JUMP:
    case LOAD:
    case TICK:
      nextState = {
        ...state,
        tracks: tracks.reducer(state.tracks, action)
      };
      break;

    case SET_CURRENT:
    case SET_TRACKS:
      nextState = {
        ...state,
        playlist: playlist.reducer(state.playlist, action)
      };
      break;

    case END:
    case PAUSE:
    case PLAY:
      nextState = {
        ...state,
        playlist: playlist.reducer(state.playlist, action),
        tracks: tracks.reducer(state.tracks, action)
      };
      break;

    default: break;
  }

  return nextState;
}
