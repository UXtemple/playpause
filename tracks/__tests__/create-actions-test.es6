import { stub, spy } from 'sinon';
import test from 'tape';
import createActions from '../create-actions';
import nodesMock from './nodes-mock';

const defaultMountpoint = 'tracks';
const id = 'something';
const stateObj = {
    playlist: {
      current: 0,
      isPlaying: false,
      tracks: [id]
    },
    [defaultMountpoint]: {
      [id]: {
        didEnd: false,
        duration: 30,
        id: id,
        isLoading: false,
        isPlaying: false,
        isReady: true,
        time: 0
      }
    }
};
const playingState = {
  ...stateObj,
  playlist: {
    ...stateObj.playlist,
    isPlaying: true
  },
  [defaultMountpoint]: {
    [id]: {
      ...stateObj[defaultMountpoint][id],
      isPlaying: true
    }
  }
}

test('tracks.create-actions', t => {
  t.is(typeof createActions, 'function', `createActions is a function`);

  t.end();
});

test('invoke tracks.create-actions with no args', t => {
  const actions = createActions();

  t.is(typeof actions.end, 'function', 'actions.end is a function');
  t.is(typeof actions.jump, 'function', 'actions.jump is a function');
  t.is(typeof actions.load, 'function', 'actions.load is a function');
  t.is(typeof actions.pause, 'function', 'actions.pause is a function');
  t.is(typeof actions.play, 'function', 'actions.play is a function');
  t.is(typeof actions.stop, 'function', 'actions.stop is a function');
  t.is(typeof actions.tick, 'function', 'actions.tick is a function');
  t.is(typeof actions.END, 'string', 'actions.END is a string');
  t.is(typeof actions.JUMP, 'string', 'actions.JUMP is a string');
  t.is(typeof actions.LOAD, 'string', 'actions.LOAD is a string');
  t.is(typeof actions.PAUSE, 'string', 'actions.PAUSE is a string');
  t.is(typeof actions.PLAY, 'string', 'actions.PLAY is a string');
  t.is(typeof actions.STOP, 'string', 'actions.STOP is a string');
  t.is(typeof actions.TICK, 'string', 'actions.TICK is a string');
  t.is(actions.TICK, `${defaultMountpoint}/TICK`, 'default mountpoint is correct');

  t.end();
});

test('invoke tracks.create-actions with mountpoint arg', t => {
  const mountpoint = 'somethingElse';
  const nodes = nodesMock()
  const actions = createActions(nodes, mountpoint);

  t.is(actions.TICK, `${mountpoint}/TICK`, 'mountpoint argument is valid');

  t.end();
});

test('tracks.create-actions.end', t => {
  const nodes = nodesMock();
  const actions = createActions(nodes);
  const id = 'something';
  t.deepEquals(actions.end(id), {
    type: actions.END,
    payload: {
      id: id
    },
  }, 'returns correct object');

  t.end();
});


test('tracks.create-actions.jump', t => {
  const nodes = nodesMock();
  const actions = createActions(nodes);
  const dispatch = spy();
  const to = 20; // arbitrary number
  const getState = stub().returns(stateObj);
  const thunk = actions.jump(id, to);

  thunk(dispatch, getState);

  t.is(typeof thunk, 'function', 'calling actions.jump returns a function');
  t.is(dispatch.firstCall.args[0].type, actions.JUMP, 'dispatch is called with the correct action type');
  t.is(dispatch.firstCall.args[0].payload.id, id, 'calls dispatch with the correct action payload id')

  t.end();
});

test('tracks.create-actions.load', t => {
  const nodes = nodesMock();
  const actions = createActions(nodes);
  const dispatch = spy();
  const otherId = 'somethingElse';
  const getState = stub().returns(stateObj);
  const thunk = actions.load(otherId);

  thunk(dispatch, getState);

  t.is(typeof thunk, 'function', 'calling actions.load returns a function');
  t.is(dispatch.firstCall.args[0].type, actions.LOAD, 'dispatch is called with the correct action type');
  t.is(dispatch.firstCall.args[0].meta.id, otherId, 'calls dispatch with the correct action meta id')

  t.end();
});

test('tracks.create-actions.pause', t => {
  const nodes = nodesMock();
  const actions = createActions(nodes);
  const dispatch = spy();
  const getState = stub().returns(playingState);
  const thunk = actions.pause(id);

  thunk(dispatch, getState);

  t.is(typeof thunk, 'function', 'calling actions.pause returns a function');
  t.is(dispatch.firstCall.args[0].type, actions.PAUSE, 'dispatch is called with the correct action type');
  t.is(dispatch.firstCall.args[0].payload.id, id, 'calls dispatch with the correct action payload id')

  t.end();
});

test('tracks.create-actions.play', t => {
  const nodes = nodesMock();
  const actions = createActions(nodes);
  const dispatch = spy();
  const getState = stub().returns(stateObj);
  const thunk = actions.play(id);

  thunk(dispatch, getState);

  t.is(typeof thunk, 'function', 'calling actions.play returns a function');
  t.is(dispatch.firstCall.args[0].type, actions.PLAY, 'dispatch is called with the correct action type');
  t.is(dispatch.firstCall.args[0].payload.id, id, 'calls dispatch with the correct action payload id')

  t.end();
});

test('tracks.create-actions.stop', t => {
  const nodes = nodesMock();
  const actions = createActions(nodes);
  const dispatch = spy();
  const getState = stub().returns(playingState);
  const thunk = actions.stop(id);

  thunk(dispatch, getState);

  t.is(typeof thunk, 'function', 'calling actions.stop returns a function');
  t.is(dispatch.firstCall.args[0].type, actions.STOP, 'dispatch is called with the correct action type');
  t.is(dispatch.firstCall.args[0].payload.id, id, 'calls dispatch with the correct action payload id')

  t.end();
});

test('tracks.create-actions.tick', t => {
  const nodes = nodesMock();
  const actions = createActions(nodes);
  const dispatch = spy();
  const getState = stub().returns(stateObj);
  const time = 1234;
  const thunk = actions.tick(id, time);

  thunk(dispatch, getState);

  t.is(typeof thunk, 'function', 'calling actions.tick returns a function');
  t.is(dispatch.firstCall.args[0].type, actions.TICK, 'dispatch is called with the correct action type');
  t.is(dispatch.firstCall.args[0].payload.id, id, 'calls dispatch with the correct action payload id')

  t.end();
});
