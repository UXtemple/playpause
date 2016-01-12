import test from 'tape';
import createReducer from '../create-reducer';

const END = 'END';
const JUMP = 'JUMP';
const LOAD = 'LOAD';
const PAUSE = 'PAUSE';
const PLAY = 'PLAY';
const STOP = 'STOP';
const TICK = 'TICK';
const ACTION_OBJ = {END, JUMP, LOAD, PAUSE, PLAY, STOP, TICK};
const reducerThunk = createReducer(ACTION_OBJ);

const id = 'something';

test('tracks.create-reducer', t => {
  t.is(typeof createReducer, 'function', `createReducer is a function`);

  t.end();
});

test('tracks.create-reducer - END', t => {
  const INIT_STATE = {
    [id]: {
      didEnd: false,
      isPlaying: true
    }
  };
  const TEST_ACTION = {
    type: END,
    payload: {
      id
    }
  }

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      didEnd: true,
      isPlaying: false
    }
  }, 'END action correctly sets the playlist state when default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      didEnd: true,
      isPlaying: false
    }
  }, 'END action correctly sets the playlist state when playing state is used');

  t.end();
});

test('tracks.create-reducer - JUMP', t => {
  const INIT_STATE = {
    [id]: {
      time: 0
    }
  };
  const timeNum = 1234;
  const TEST_ACTION = {
    type: JUMP,
    payload: {
      id,
      time: timeNum
    }
  }

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      time: timeNum
    }
  }, 'JUMP action correctly sets the playlist state when default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      time: timeNum
    }
  }, 'JUMP action correctly sets the playlist state when non default state is used');

  t.end();
});

test('tracks.create-reducer - TICK', t => {
  const INIT_STATE = {
    [id]: {
      time: 0
    }
  };
  const timeNum = 1234;
  const TEST_ACTION = {
    type: TICK,
    payload: {
      id,
      time: timeNum
    }
  }

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      time: timeNum
    }
  }, 'TICK action correctly sets the playlist state when default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      time: timeNum
    }
  }, 'TICK action correctly sets the playlist state when non default state is used');

  t.end();
});


test('tracks.create-reducer - LOAD', t => {
  const INIT_STATE = {
    [id]: {
      id
    }
  };
  const timeNum = 1234;
  const TEST_ACTION = {
    type: LOAD,
    meta: {
      id
    },
    sequence: {
      type: 'start'
    }
  }
  const errorMsg = 'this is an error';
  const ERR_ACTION = {
    ...TEST_ACTION,
    error: true,
    payload: {
      message: errorMsg
    },
    sequence: {
      type: 'next'
    }
  };

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      didEnd: false,
      isLoading: true,
      isPlaying: false,
      isReady: false,
      time: 0
    }
  }, 'LOAD action correctly sets the playlist state when default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      didEnd: false,
      isLoading: true,
      isPlaying: false,
      isReady: false,
      time: 0
    }
  }, 'LOAD action correctly sets the playlist state when non default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, ERR_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      error: true,
      isLoading: false,
      message: errorMsg
    }
  }, 'LOAD action correctly sets the playlist state when handling an error action');

  t.end();
});

test('tracks.create-reducer - PAUSE', t => {
  const INIT_STATE = {
    [id]: {
      isPlaying: true
    }
  };
  const TEST_ACTION = {
    type: PAUSE,
    payload: {
      id
    }
  }

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      isPlaying: false
    }
  }, 'PAUSE action correctly sets the playlist state when default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      isPlaying: false
    }
  }, 'PAUSE action correctly sets the playlist state when playing state is used');

  t.end();
});

test('tracks.create-reducer - STOP', t => {
  const INIT_STATE = {
    [id]: {
      time: 1234,
      isPlaying: true
    }
  };
  const TEST_ACTION = {
    type: STOP,
    payload: {
      id
    }
  }

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      time: 0,
      isPlaying: false
    }
  }, 'STOP action correctly sets the playlist state when default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      time: 0,
      isPlaying: false
    }
  }, 'STOP action correctly sets the playlist state when playing state is used');

  t.end();
});

test('tracks.create-reducer - PLAY', t => {
  const INIT_STATE = {
    [id]: {
      isPlaying: false
    }
  };
  const TEST_ACTION = {
    type: PLAY,
    payload: {
      id
    }
  }

  t.deepEquals(reducerThunk({}, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      isPlaying: true
    }
  }, 'PLAY action correctly sets the playlist state when default state is used');

  t.deepEquals(reducerThunk(INIT_STATE, TEST_ACTION), {
    [id]: {
      ...INIT_STATE[id],
      isPlaying: true
    }
  }, 'PLAY action correctly sets the playlist state when playing state is used');

  t.end();
});
