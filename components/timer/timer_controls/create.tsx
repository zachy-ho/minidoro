import { TimerControlsView } from './timer_controls';
import type { TimerPresenter } from 'components/timer/timer_presenter';
import type { Timer } from 'components/timer/timer_store';

export function createTimerControls({ 
  timer,
  timerPresenter 
}: {
  timer: Timer,
  timerPresenter: TimerPresenter
}): () => JSX.Element {

  const handleSetButtonClick = (durationSeconds: number): void => {
    timerPresenter.setStartingDurationSeconds({ timer, durationSeconds });
  }

  const handlePlayPauseButtonClick = (): void => {
    timerPresenter.toggleTimer(timer);
  }

  const handleStopButtonClick = (): void => {
    timerPresenter.stopTimer(timer);
  }

  return () => (
    <TimerControlsView
      timer={timer}
      onSetButtonClick={handleSetButtonClick}
      onPlayPauseButtonClick={handlePlayPauseButtonClick}
      onStopButtonClick={handleStopButtonClick}
    />
  );
}
