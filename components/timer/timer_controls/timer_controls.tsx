import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { makeObservable, observable } from 'mobx';
import styles from './timer_controls.module.css';
import { Timer } from '../timer_store';

type TimerControlsProps = {
  timer: Timer;
  onSetButtonClick: (duration: number) => void;
  onPlayPauseButtonClick: () => void;
  onStopButtonClick: () => void;
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

    onSetButtonClick = (): void => {
      this.props.onSetButtonClick(this.timerDurationInputValue);
    };

    render() {
      const { timer, onPlayPauseButtonClick, onStopButtonClick } = this.props;

      return (
        <div className={styles.timerControlsContainer}>
          <input
            id="timerDurationInput"
            className={styles.durationSetter}
            type="number"
            value={this.timerDurationInputValue}
            onChange={this.onTimerDurationInputChange}
            disabled={timer.state !== 'stopped'}
          />
          <button
            className={styles.setButton}
            onClick={this.onSetButtonClick}
            disabled={timer.state !== 'stopped'}
          >
            Set
          </button>
          <button
            className={styles.playButton}
            onClick={onPlayPauseButtonClick}
          >
            Start
          </button>
          <button className={styles.stopButton} onClick={onStopButtonClick}>
            Stop
          </button>
        </div>
      );
    }
  }
);
