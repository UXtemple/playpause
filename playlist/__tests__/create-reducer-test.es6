// import { PAUSE, PLAY, SET_CURRENT, SET_PLAYLIST } from '../actions';
// import reducer from '../reducer';
import test from 'tape';

test('TODO createReducer', t => t.end());

// const playlist = [
//   'file-1',
//   'file-2',
//   'file-3'
// ];

// test('#reducer', t => {
//   t.deepEquals(
//     reducer(undefined, {}), {
//       isPlaying: false,
//       playlist: []
//     },
//     'by default the playlist is empty and it\'s not playing'
//   );

//   const { current } = reducer({
//     current: 1
//   }, {
//     type: SET_CURRENT,
//     payload: {
//       current: 0
//     }
//   });
//   t.equals(current, 0, `handles ${SET_CURRENT}`);

//   t.deepEquals(reducer({
//     current: 2,
//     isPlaying: true,
//     playlist: ['1','2','3']
//   }, {
//     type: SET_PLAYLIST,
//     payload: {
//       playlist
//     }
//   }), {
//     current: 0,
//     isPlaying: false,
//     playlist
//   }, `handles ${SET_PLAYLIST}:
//       - current is reset to the first element,
//       - isPlaying is set to false, and
//       - the playlist is set`);

//   const { isPlaying: shouldBePaused } = reducer({
//     isPlaying: true
//   }, {
//     type: PAUSE
//   });
//   t.notOk(shouldBePaused, `handles ${PAUSE}`);

//   const { isPlaying: shouldBePlaying } = reducer({
//     isPlaying: false
//   }, {
//     type: PLAY
//   });
//   t.ok(shouldBePlaying, `handles ${PLAY}`);

//   t.end();
// });
