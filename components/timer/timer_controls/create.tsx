import { TimerControls } from './timer_controls';
import { TimerPresenter } from 'components/timer/timer_presenter';
import { TimerStore } from 'components/timer/timer_store';

export function createTimerControls(): () => JSX.Element {
  const timerPresenter = new TimerPresenter();

  return () => (
    <TimerControls 
      onSetButtonClick={}
      onPlayPauseButtonClick={}
      onStopButtonClick={}
      />
  )
}
