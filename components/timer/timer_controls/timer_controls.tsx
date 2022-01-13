import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import styles from './timer_controls.module.css';
import playIcon from 'public/images/play.svg';
import pauseIcon from 'public/images/pause.svg';
import type { TimerPresenter } from 'components/timer/timer_presenter';
import type { Timer } from 'components/timer/timer_store';

type TimerControlsProps = {
  timer: Timer;
  timerPresenter: TimerPresenter;
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

    handlePlayPauseButtonClick = (): void => {
      const { timer, timerPresenter } = this.props;
      timerPresenter.toggleTimer(timer);
    }

    render() {
      const { timer } = this.props;

      return (
        <div className={styles.container}>
          <button
            className={styles.playBtn}
            onClick={this.handlePlayPauseButtonClick}
          >
            <Image
              src={timer.state === 'running' ? pauseIcon : playIcon}
              alt="Play"
            />
          </button>
        </div>
      );
    }
  }
);
