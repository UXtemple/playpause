import * as nodes from './nodes';
import * as tracks from '../tracks';
import { connect } from 'react-redux';
import createKnockKnockGo from 'knock-knock-go';
import React, { Component as ReactComponent } from 'react';

export const actions = tracks.createActions(nodes, 'playpause.tracks');
export const reducer = tracks.createReducer(actions);

class Track extends ReactComponent {
  render() {
    const { props } = this;

    return (
      <div style={{fontWeight: props.isCurrent ? 'bold' : 'normal'}}>
        track {props.id}
        {props.isPlaying ?
          <button onClick={() => props.dispatch(actions.pause(props.id))}>pause</button> :
          <button onClick={() => props.dispatch(actions.play(props.id))}>play</button>}

        {Math.floor(props.time % 60)}s
        <input
          max={props.duration}
          min={0}
          onChange={() => props.dispatch(actions.jump(props.id, this.refs.time.value))}
          ref='time'
          step={1}
          type='range'
          value={props.time} />
        {Math.floor(props.duration)}s
      </div>
    );
  }
}

const knockKnockGo = createKnockKnockGo();

const KnockKnockTrack = knockKnockGo(
  props => props.isLoading && !props.isReady,
  props => props.error,
  Track,
  props => !(props.isLoading || props.isReady) && props.dispatch(actions.load(props.id))
);

function mapStateToProps(state, props) {
  return state.playpause.tracks[props.id] || {};
}

export const Component = connect(mapStateToProps)(KnockKnockTrack);
