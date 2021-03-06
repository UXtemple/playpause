import * as tracks from './tracks';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Component as Playlist, actions as playlistActions } from './playlist';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createLogger from 'redux-logger';
import dj from '../playlist/dj';
import playpauseReducer from './playpause-reducer';
import promiseMiddleware from 'redux-promise';
import React from 'react';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => action.type !== tracks.actions.TICK,
  collapsed: true,
  level: 'info',
  logger: console
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware,
  loggerMiddleware
)(createStore);

const rootReducer = combineReducers({
  playpause: playpauseReducer
});

const store = createStoreWithMiddleware(rootReducer, {
  playpause: {
    playlist: {
      current: 0,
      isPlaying: false,
      tracks: [
        '/audio-1.mp3',
        '/audio-2.mp3',
        '/audio-3.mp3',
      ]
    },
    tracks: {}
  }
});

const unsubscribeDj = dj(store, 'playpause.playlist', tracks.actions, playlistActions);

window.$p = {
  store
};

render(
  <Provider store={store}>
    <Playlist />
  </Provider>,
  document.getElementById('root')
);
