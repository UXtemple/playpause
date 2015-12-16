import * as tracks from './tracks';
import * as playlist from './playlist';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createLogger from 'redux-logger';
import dj from './dj';
import promiseMiddleware from 'redux-promise';
import React from 'react';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger({
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
  playlist: playlist.reducer,
  tracks: tracks.reducer
});

const store = createStoreWithMiddleware(rootReducer, {
  playlist: {
    current: 0,
    isPlaying: false,
    tracks: [
      '/audio-1.mp3',
      '/audio-2.mp3',
      '/audio-3.mp3',
    ]
  }
});

const unsubscribeDj = dj(store);

window.$p = {
  playlist,
  tracks,
  store
};

render(
  <Provider store={store}>
    <playlist.Component />
  </Provider>,
  document.getElementById('root')
);
