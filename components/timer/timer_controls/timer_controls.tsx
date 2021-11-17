import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { makeObservable, observable } from 'mobx';
import styles from './timer_controls.module.css';
import type { TimerPresenter } from 'components/timer/timer_presenter';
import type { Timer } from 'components/timer/timer_store';

export const createTimerControls = ({
  timer,
  timerPresenter
}: {
  timer: Timer,
  timerPresenter: TimerPresenter
}): () => JSX.Element => {

  const handlePlayPauseButtonClick = (): void => {
    timerPresenter.toggleTimer(timer);
  }

  const handleStopButtonClick = (): void => {
    timerPresenter.stopTimer(timer);
  }

  const handleResetButtonClick = (): void => {
    timerPresenter.resetTimer(timer);
  }

  return () => (
    <TimerControlsView
      timer={timer}
      onPlayPauseButtonClick={handlePlayPauseButtonClick}
      onStopButtonClick={handleStopButtonClick}
      onResetButtonClick={handleResetButtonClick}
    />
  );
}

type TimerControlsProps = {
  timer: Timer;
  onPlayPauseButtonClick: () => void;
  onStopButtonClick: () => void;
  onResetButtonClick: () => void;
};

export const TimerControlsView = observer(
  class TimerControlsView extends React.Component<TimerControlsProps> {
    timerDurationInputValue: number;

    constructor(props: TimerControlsProps) {
      super(props);

      this.timerDurationInputValue = props.timer.startingSeconds;

      makeObservable(this, {
        timerDurationInputValue: observable.ref,
      });
    }

    onTimerDurationInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        this.timerDurationInputValue = 0;
      }
      this.timerDurationInputValue = parseInt(e.target.value);
    };

    render() {
      const { onPlayPauseButtonClick, onStopButtonClick, onResetButtonClick } = this.props;

      return (
        <div className={styles.timerControlsContainer}>
          <button
            className={styles.playButton}
            onClick={onPlayPauseButtonClick}
          >
            Start
          </button>
          <button className={styles.stopButton} onClick={onStopButtonClick}>
            Stop
          </button>
          <button className={styles.stopButton} onClick={onResetButtonClick}>
            Reset
          </button>
        </div>
      );
    }
  }
);
