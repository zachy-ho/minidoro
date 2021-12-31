import React from 'react';
import styles from './home.module.css';
import { convertSecondsToMilliseconds } from 'base/time_converter';
import { createTimer } from 'components/timer/timer';
import { Timer } from 'components/timer/timer_store';
import { TimerPresenter } from 'components/timer/timer_presenter';
import { createTimerControls } from 'components/timer/timer_controls/timer_controls';

export const Home = () => {
  const timer = new Timer({ startingMilliseconds: convertSecondsToMilliseconds(65) });
  const timerPresenter = new TimerPresenter();
  const TimerView = createTimer({
    timer,
  });
  const TimerControls = createTimerControls({ timer, timerPresenter });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pomodoroContainer}>
        <TimerView />
        <TimerControls />
      </div>
    </div>
)
}
