import { TimerControlsView } from './timer_controls_view';
import type { TimerPresenter } from 'components/timer/timer_presenter';

export function createTimerControls({ 
  timerPresenter 
}: {
  timerPresenter: TimerPresenter
}): () => JSX.Element {
  return () => (
    <TimerControlsView
      onSetButtonClick={timerPresenter.setDuration}
      onPlayPauseButtonClick={timerPresenter.toggleTimer}
      onStopButtonClick={timerPresenter.stopTimer}
    />
  );
}
