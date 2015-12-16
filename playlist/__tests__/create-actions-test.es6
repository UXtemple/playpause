// import * as actions from '../actions';
// import createTestStore from 'redux-test';
import test from 'tape';

test('TODO createReducer', t => t.end());

// test('#actions', t => {
//   t.equals(typeof actions.PAUSE, 'string', `has a PAUSE type ${actions.PAUSE}`);
//   t.deepEquals(actions.pause(), {
//     type: actions.PAUSE
//   }, `has action creator for ${actions.PAUSE}: #pause`);


//   t.equals(typeof actions.PLAY, 'string', `has a PLAY type ${actions.PLAY}`);
//   t.deepEquals(actions.play(), {
//     type: actions.PLAY
//   }, `has action creator for ${actions.PLAY}: #play`);

//   t.equals(typeof actions.SET_CURRENT, 'string', `has a SET_CURRENT type ${actions.SET_CURRENT}`);
//   t.deepEquals(actions.setCurrent(1), {
//     type: actions.SET_CURRENT,
//     payload: {
//       current: 1
//     }
//   }, `has action creator for ${actions.SET_CURRENT}: #setCurrent`);

//   t.equals(typeof actions.SET_PLAYLIST, 'string', `has a SET_PLAYLIST type ${actions.SET_PLAYLIST}`);
//   t.deepEquals(actions.setPlaylist('playlist'), {
//     type: actions.SET_PLAYLIST,
//     payload: {
//       playlist: 'playlist'
//     }
//   }, `has action creator for ${actions.SET_PLAYLIST}: #setPlaylist`);

//   const nextOrStopThunk = actions.nextOrStop();

//   t.equals(typeof nextOrStopThunk, 'function', 'has nextOrStop action that returns a thunk');

//   // when we're playing the last item on the list we should reset and pause
//   const playingLastItemStore = createTestStore({
//     playpause: {
//       current: 2,
//       isPlaying: true,
//       playlist: ['a', 'b', 'c']
//     }
//   });
//   nextOrStopThunk(playingLastItemStore.dispatch, playingLastItemStore.getState);
//   t.deepEquals(
//     playingLastItemStore.dispatch.firstCall.args[0],
//     actions.setCurrent(0),
//     'dispatch reset the current index to 0 when we reached the end of the playlist'
//   );
//   t.deepEquals(
//     playingLastItemStore.dispatch.secondCall.args[0],
//     actions.pause(),
//     'dispatch pause when we reached the end of the playlist'
//   );

//   // when we're playing somewhere in between, jump to the next index
//   const stillPlayingStore = createTestStore({
//     playpause: {
//       current: 1,
//       isPlaying: true,
//       playlist: ['a', 'b', 'c']
//     }
//   });
//   nextOrStopThunk(stillPlayingStore.dispatch, stillPlayingStore.getState);
//   t.deepEquals(
//     stillPlayingStore.dispatch.firstCall.args[0],
//     actions.setCurrent(2),
//     'dispatch the next index when there are still files to play'
//   );

//   t.end();
// });
