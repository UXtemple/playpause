import * as playlist from '../playlist';
import { actions as tracksActions, Component as Track } from './tracks';
import { connect } from 'react-redux';
import React from 'react';

export const actions = playlist.createActions();
export const reducer = playlist.createReducer(actions, tracksActions);

const Playlist = props => (
  <div>
    {props.tracks.map((id, i) => <Track id={id} isCurrent={props.current === i} key={i} />)}

    playlist {props.isPlaying ? 'playing' : 'paused'}

    <button disabled={props.current === 0}
      onClick={() => props.dispatch(actions.prevOrStop())}>prev</button>
    <button disabled={props.current === props.tracks.length - 1}
      onClick={() => props.dispatch(actions.nextOrStop())}>next</button>

    {props.isPlaying ?
      <button onClick={() => props.dispatch(tracksActions.pause(props.tracks[props.current]))}>pause</button> :
      <button onClick={() => props.dispatch(tracksActions.play(props.tracks[props.current]))}>play</button>}
  </div>
);

function mapStateToProps(state, props) {
  return state.playlist;
}

export const Component = connect(mapStateToProps)(Playlist);
