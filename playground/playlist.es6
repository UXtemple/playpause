import * as playlist from '../playlist';
import { actions as tracksActions, Component as Track } from './tracks';
import { connect } from 'react-redux';
import React from 'react';

export const actions = playlist.createActions('playpause.playlist');
export const reducer = playlist.createReducer(actions, tracksActions);

function pause() {
  return function pauseThunk(dispatch, getState) {
    const { playlist } = getState().playpause;

    dispatch(tracksActions.pause(playlist.tracks[playlist.current]));
  }
}

function play() {
  return function playThunk(dispatch, getState) {
    const { playlist } = getState().playpause;

    dispatch(tracksActions.play(playlist.tracks[playlist.current]));
  }
}

function stop() {
  return function playThunk(dispatch, getState) {
    const { playlist } = getState().playpause;

    dispatch(tracksActions.stop(playlist.tracks[playlist.current]));
  }
}

const Playlist = props => (
  <div>
    {props.tracks.map((id, i) => <Track id={id} isCurrent={props.current === i} key={i} />)}

    playlist {props.isPlaying ? 'playing' : 'paused'}

    <button disabled={props.current === 0}
      onClick={() => props.dispatch(actions.prevOrStop())}>prev</button>
    <button disabled={props.current === props.tracks.length - 1}
      onClick={() => props.dispatch(actions.nextOrStop())}>next</button>

    {props.isPlaying ? (
      <span>
        <button onClick={() => props.dispatch(pause())}>pause</button>
        <button onClick={() => props.dispatch(stop())}>stop</button>
      </span>
    ) : <button onClick={() => props.dispatch(play())}>play</button>}
  </div>
);

function mapStateToProps(state, props) {
  return state.playpause.playlist;
}

export const Component = connect(mapStateToProps)(Playlist);
