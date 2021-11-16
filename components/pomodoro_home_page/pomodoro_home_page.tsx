import React from 'react';
import { createTimer } from 'components/timer/timer';
import { Timer } from 'components/timer/timer_store';
import { TimerPresenter } from 'components/timer/timer_presenter';
import { createTimerControls } from 'components/timer/timer_controls/timer_controls';
import styles from './pomodoro_home_page.module.css';

export const PomodoroHomePage = () => {
  const timer = new Timer({ startingMilliseconds: 5000 });
  const timerPresenter = new TimerPresenter();
  const TimerView = createTimer({
    timer,
  });
  const TimerControls = createTimerControls({ timer, timerPresenter });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pomodoroContainer}>
        <div className={styles.statsSection}></div>
        <TimerView />
        <TimerControls />
        <div className={styles.pomodoroSettings}></div>
      </div>
    </div>
)
}
