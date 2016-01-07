import { stub, spy } from 'sinon';
import test from 'tape';
import createActions from '../create-actions';

const defaultMountpoint = 'playlist';

test('playlist.create-actions', t => {
  t.is(typeof createActions, 'function', `createActions is a function`);

  t.end();
});

test('invoke playlist.create-actions with no args', t => {
  const actions = createActions();

  t.is(typeof actions.nextOrStop, 'function', 'actions.nextOrStop is a function');
  t.is(typeof actions.prevOrStop, 'function', 'actions.prevOrStop is a function');
  t.is(typeof actions.setCurrent, 'function', 'actions.setCurrent is a function');
  t.is(typeof actions.setTracks, 'function', 'actions.setTracks is a function');
  t.isNot(typeof actions.SET_CURRENT, 'function', 'actions.SET_CURRENT is not a function');
  t.isNot(typeof actions.SET_TRACKS, 'function', 'actions.SET_TRACKS is not a function');
  t.is(typeof actions.SET_CURRENT, 'string', 'actions.SET_CURRENT is a string');
  t.is(typeof actions.SET_TRACKS, 'string', 'actions.SET_TRACKS is a string');
  t.is(actions.SET_CURRENT, `${defaultMountpoint}/SET_CURRENT`, 'default mountpoint is playlist');

  t.end();
});

test('invoke playlist.create-actions with string arg', t => {
  const mountpoint = 'somethingElse';
  const actions = createActions(mountpoint);

  t.is(typeof actions.nextOrStop, 'function', 'actions.nextOrStop is a function');
  t.is(typeof actions.prevOrStop, 'function', 'actions.prevOrStop is a function');
  t.is(typeof actions.setCurrent, 'function', 'actions.setCurrent is a function');
  t.is(typeof actions.setTracks, 'function', 'actions.setTracks is a function');
  t.isNot(typeof actions.SET_CURRENT, 'function', 'actions.SET_CURRENT is not a function');
  t.isNot(typeof actions.SET_TRACKS, 'function', 'actions.SET_TRACKS is not a function');
  t.is(typeof actions.SET_CURRENT, 'string', 'actions.SET_CURRENT is a string');
  t.is(typeof actions.SET_TRACKS, 'string', 'actions.SET_TRACKS is a string');
  t.is(actions.SET_CURRENT, `${mountpoint}/SET_CURRENT`, 'mountpoint argument is valid');

  t.end();
});

test('playlist.create-actions.nextOrStop', t => {
  const actions = createActions();
  const dispatch = spy();
  const currentValue = 1;
  const getState = stub().returns({
    [defaultMountpoint]: {
      current: currentValue,
      isPlaying: true,
      tracks: ['tune1.mp3', 'tune2.mp3', 'tune3.pm3']
    }
  });
  const thunk = actions.nextOrStop();

  thunk(dispatch, getState);

  t.is(typeof thunk, 'function', 'calling actions.nextOrStop() returns a function');
  t.is(typeof dispatch.firstCall.args[0], 'function', 'dispatch is called with the first argument as a function');
  t.is(dispatch.firstCall.args[0].name, 'setCurrentThunk', 'calls dispatch with setCurrentThunk as first argument')

  t.end();
});

test('playlist.create-actions.prevOrStop', t => {
  const actions = createActions();
  const dispatch = spy();
  const currentValue = 1;
  const getState = stub().returns({
    [defaultMountpoint]: {
      current: currentValue,
      isPlaying: true,
      tracks: ['tune1.mp3', 'tune2.mp3', 'tune3.pm3']
    }
  });
  const thunk = actions.prevOrStop();

  thunk(dispatch, getState);

  t.is(typeof thunk, 'function', 'calling actions.prevOrStop() returns a function');
  t.is(typeof dispatch.firstCall.args[0], 'function', ' dispatch is called with the first argument as a function');
  t.is(dispatch.firstCall.args[0].name, 'setCurrentThunk', 'calls dispatch with setCurrentThunk as first argument')

  t.end();
});

test('playlist.create-actions.setCurrent', t => {
  const actions = createActions();
  const dispatch = spy();
  const currentValue = 1;
  const getState = stub().returns({
    [defaultMountpoint]: {
      current: currentValue,
      isPlaying: true,
      tracks: ['tune1.mp3', 'tune2.mp3', 'tune3.pm3']
    }
  });
  const thunk = actions.setCurrent(currentValue + 1);

  thunk(dispatch, getState);

  t.is(typeof thunk, 'function', 'calling actions.prevOrStop() returns a function');
  t.is(typeof dispatch.firstCall.args[0], 'object', ' dispatch is called with the first argument as a object');
  t.is(dispatch.firstCall.args[0].type, `${defaultMountpoint}/SET_CURRENT`, 'the set current action is dispatched');
  t.is(dispatch.firstCall.args[0].payload.current, currentValue + 1, 'the correct payload is dispatched');

  t.end();
});
