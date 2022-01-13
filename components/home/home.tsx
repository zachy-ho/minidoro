import React from 'react';
import styles from './home.module.css';
import { installTimer } from 'components/timer/install';
import { Settings } from 'components/settings/settings';
import { SessionControls } from 'components/session/session_controls/session_controls';
import { initializeSessionConfigurations } from 'components/session/session_config';

export const Home = () => {

  const { workSessionConfig, breakSessionConfig } = initializeSessionConfigurations();
  const { Timer, TimerControls } = installTimer();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pomodoroContainer}>
        <Settings />
        <SessionControls />
        <Timer />
        <TimerControls />
      </div>
    </div>
  )
}
