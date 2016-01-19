import test from 'tape';
import createReducer from '../create-reducer';

const PLAY = 'PLAY';
const PAUSE = 'PAUSE';
const STOP = 'STOP';
const END = 'END';
const SET_CURRENT = 'SET_CURRENT';
const SET_TRACKS = 'SET_TRACKS';
const SET_OBJ = {SET_CURRENT, SET_TRACKS};
const FUNCTIONS_OBJ = {END, PAUSE, PLAY, STOP};

const reducerThunk = createReducer(SET_OBJ, FUNCTIONS_OBJ);

const LIST_OF_TRAX = ['file1', 'file2', 'file3'];

const PLAYING_STATE = {
  current: 2,
  isPlaying: true,
  tracks: LIST_OF_TRAX
};

test('playlist.create-reducer', t => {
  t.is(typeof createReducer, 'function', `createReducer is a function`);

  t.end();
});


test('playlist.create-reducer - SET_TRACKS', t => {

  const INIT_STATE = {
    current: 0,
    isPlaying: false,
    tracks: []
  };
  const TEST_ACTION = {
    type: SET_TRACKS,
    payload: {
      tracks: LIST_OF_TRAX
    }
  }

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    ...INIT_STATE,
    tracks: LIST_OF_TRAX
  }, 'SET_TRACKS action correctly sets the tracks state when no current audio and default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    ...INIT_STATE,
    tracks: LIST_OF_TRAX
  }, 'SET_TRACKS action correctly sets the tracks state when audio is not playing');

  t.deepEquals(reducerThunk(PLAYING_STATE, TEST_ACTION), {
    ...INIT_STATE,
    tracks: LIST_OF_TRAX
  }, 'SET_TRACKS action correctly sets the tracks state when audio is playing');

  t.end();
});

test('playlist.create-reducer - SET_CURRENT', t => {
  const NEW_CURRENT = 1;
  const INIT_STATE = {
    current: 0
  };
  const TEST_ACTION = {
    type: SET_CURRENT,
    payload: {
      current: NEW_CURRENT
    }
  }

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    ...INIT_STATE,
    current: NEW_CURRENT
  }, 'SET_CURRENT action correctly sets the tracks state when no current audio and default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    ...INIT_STATE,
    current: NEW_CURRENT
  }, 'SET_TRACKS action correctly sets the tracks state when audio is not playing');

  t.deepEquals(reducerThunk(PLAYING_STATE, TEST_ACTION), {
    ...PLAYING_STATE,
    current: NEW_CURRENT
  }, 'SET_TRACKS action correctly sets the tracks state when audio is playing');

  t.end();
});

test('playlist.create-reducer - SET_CURRENT', t => {
  const NEW_CURRENT = 1;
  const INIT_STATE = {
    current: 0
  };
  const TEST_ACTION = {
    type: SET_CURRENT,
    payload: {
      current: NEW_CURRENT
    }
  }

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    ...INIT_STATE,
    current: NEW_CURRENT
  }, 'SET_CURRENT action correctly sets the tracks state when no current audio and default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    ...INIT_STATE,
    current: NEW_CURRENT
  }, 'SET_TRACKS action correctly sets the tracks state when audio is not playing');

  t.deepEquals(reducerThunk(PLAYING_STATE, TEST_ACTION), {
    ...PLAYING_STATE,
    current: NEW_CURRENT
  }, 'SET_TRACKS action correctly sets the tracks state when audio is playing');

  t.end();
});

test('playlist.create-reducer - END', t => {
  const NEW_CURRENT = 1;
  const INIT_STATE = {
    current: 0,
    isPlaying: false,
    tracks: LIST_OF_TRAX
  };
  const TEST_ACTION = {
    type: END
  }

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    ...INIT_STATE,
    current: NEW_CURRENT
  }, 'END action correctly sets current when not playing last track');

  t.deepEquals(reducerThunk(PLAYING_STATE, TEST_ACTION), {
    ...PLAYING_STATE,
    isPlaying: false
  }, 'END action correctly sets isPlaying to false when playing last track');

  t.end();
});

test('playlist.create-reducer - PAUSE/STOP', t => {
  const CURRENT = 2;
  const STOP_TEST_ACTION = {
    type: STOP,
    payload: {
      id: LIST_OF_TRAX[CURRENT]
    }
  }
  const PAUSE_TEST_ACTION = {
    ...STOP_TEST_ACTION,
    type: PAUSE
  }

  t.deepEquals(reducerThunk(PLAYING_STATE, STOP_TEST_ACTION), {
    ...PLAYING_STATE,
    isPlaying: false
  }, 'STOP action correctly sets current when not playing last track');

  t.deepEquals(reducerThunk(PLAYING_STATE, STOP_TEST_ACTION), {
    ...PLAYING_STATE,
    isPlaying: false
  }, 'STOP action correctly sets isPlaying to false when playing last track');

  t.deepEquals(reducerThunk(PLAYING_STATE, PAUSE_TEST_ACTION), {
    ...PLAYING_STATE,
    isPlaying: false
  }, 'PAUSE action correctly sets current when not playing last track');

  t.deepEquals(reducerThunk(PLAYING_STATE, PAUSE_TEST_ACTION), {
    ...PLAYING_STATE,
    isPlaying: false
  }, 'PAUSE action correctly sets isPlaying to false when playing last track');

  t.end();
});
