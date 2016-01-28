import { stub, spy } from 'sinon';

export default function mockNodes() {
  const load = spy();
  const jump = stub().returns(true);
  const pause = spy();
  const play = spy();
  const stop = function() {
    pause();
    jump('works');
  }

  return {
    load,
    jump,
    pause,
    play,
    stop
  };
}
