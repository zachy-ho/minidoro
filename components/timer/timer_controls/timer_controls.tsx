import React from 'react';
import Image from 'next/image';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import styles from './timer_controls.module.css';
import playIcon from 'public/images/play.svg';
import pauseIcon from 'public/images/pause.svg';
import type { TimerStore } from 'components/timer/timer_presenter';

type TimerControlsProps = {
  timer: TimerStore;
  onPlayPause: (timer: TimerStore) => void;
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

    handlePlayPauseButtonClick = (): void => {
      const { timer, onPlayPause } = this.props;
      onPlayPause(timer);
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
