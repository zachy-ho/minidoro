import React from 'react';
import styles from './home.module.css';
import { installTimer } from 'components/timer/install';
import { Settings } from 'components/settings/settings';
import { SessionControls } from 'components/timer/session_controls/session_controls';

export const Home = () => {
  const { TimerView, TimerControlsView } = installTimer();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pomodoroContainer}>
        <Settings />
        <SessionControls />
        <TimerView />
        <TimerControlsView />
      </div>
    </div>
)
}
