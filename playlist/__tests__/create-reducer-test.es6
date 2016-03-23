import test from 'tape';
import BREAKPOINT from '../breakpoint';
import createReducer from '../create-reducer';

const PLAY = 'PLAY';
const PAUSE = 'PAUSE';
const STOP = 'STOP';
const END = 'END';
const HIT_BREAKPOINT = 'HIT_BREAKPOINT';
const SET_CURRENT = 'SET_CURRENT';
const SET_TRACKS = 'SET_TRACKS';
const SET_OBJ = {HIT_BREAKPOINT, SET_CURRENT, SET_TRACKS};
const FUNCTIONS_OBJ = {END, PAUSE, PLAY, STOP};

const reducerThunk = createReducer(SET_OBJ, FUNCTIONS_OBJ);

const LIST_OF_TRAX = ['file1', 'file2', BREAKPOINT, 'file3', 'file4'];

test('playlist.create-reducer', t => {
  t.is(typeof createReducer, 'function', `createReducer is a function`);

  t.end();
});

test('playlist.create-reducer - HIT_BREAKPOINT', t => {
  const BREAKPOINT_CURRENT = LIST_OF_TRAX.indexOf(BREAKPOINT);

  const PLAYING_STATE = {
    current: BREAKPOINT_CURRENT,
    isPlaying: true,
    tracks: LIST_OF_TRAX
  };
  const TEST_ACTION = {
    type: HIT_BREAKPOINT,
    payload: {
      current: BREAKPOINT_CURRENT + 1
    }
  };

  t.deepEquals(reducerThunk(PLAYING_STATE, TEST_ACTION), {
    ...PLAYING_STATE,
    isPlaying: false,
    current: BREAKPOINT_CURRENT + 1
  }, 'HIT_BREAKPOINT action correctly sets isPlaying to false and changes current');

  t.end();
});

test('playlist.create-reducer - SET_TRACKS', t => {

  const INIT_STATE = {
    current: 0,
    isPlaying: false,
    tracks: []
  };
  const PLAYING_STATE = {
    ...INIT_STATE,
    isPlaying: true,
    tracks: LIST_OF_TRAX
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
  const PLAYING_STATE = {
    ...INIT_STATE,
    isPlaying: true,
    tracks: LIST_OF_TRAX
  };
  const TEST_ACTION = {
    type: SET_CURRENT,
    payload: {
      current: NEW_CURRENT
    }
  };

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
  const PLAYING_STATE = {
    ...INIT_STATE,
    isPlaying: true,
    tracks: LIST_OF_TRAX
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
  const PLAYING_LAST_STATE = {
    ...INIT_STATE,
    current: LIST_OF_TRAX.length - 1,
    isPlaying: true
  };
  const TEST_ACTION = {
    type: END
  }

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    ...INIT_STATE,
    current: NEW_CURRENT
  }, 'END action correctly sets current when not playing last track');

  t.deepEquals(reducerThunk(PLAYING_LAST_STATE, TEST_ACTION), {
    ...PLAYING_LAST_STATE,
    isPlaying: false
  }, 'END action correctly sets isPlaying to false when playing last track');

  t.end();
});

test('playlist.create-reducer - PAUSE/STOP', t => {
  const CURRENT = 2;
  const LAST_TRACK = LIST_OF_TRAX.length - 1;
  const PLAYING_STATE = {
    current: CURRENT,
    isPlaying: true,
    tracks: LIST_OF_TRAX
  };
  const PLAYING_LAST_STATE = {
    ...PLAYING_STATE,
    current: LAST_TRACK
  };
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
  const STOP_TEST_ACTION_LAST = {
    ...STOP_TEST_ACTION,
    payload: {
      id: LIST_OF_TRAX[LAST_TRACK]
    }
  }
  const PAUSE_TEST_ACTION_LAST = {
    ...STOP_TEST_ACTION_LAST,
    type: PAUSE
  }

  t.deepEquals(reducerThunk(PLAYING_STATE, STOP_TEST_ACTION), {
    ...PLAYING_STATE,
    isPlaying: false
  }, 'STOP action correctly sets current when not playing last track');

  t.deepEquals(reducerThunk(PLAYING_LAST_STATE, STOP_TEST_ACTION_LAST), {
    ...PLAYING_LAST_STATE,
    isPlaying: false
  }, 'STOP action correctly sets isPlaying to false when playing last track');

  t.deepEquals(reducerThunk(PLAYING_STATE, PAUSE_TEST_ACTION), {
    ...PLAYING_STATE,
    isPlaying: false
  }, 'PAUSE action correctly sets current when not playing last track');

  t.deepEquals(reducerThunk(PLAYING_LAST_STATE, PAUSE_TEST_ACTION_LAST), {
    ...PLAYING_LAST_STATE,
    isPlaying: false
  }, 'PAUSE action correctly sets isPlaying to false when playing last track');

  t.end();
});
