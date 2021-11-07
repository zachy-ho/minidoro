import React from 'react';
import styles from './home.module.css';

interface HomeProps {
  Timer: React.ComponentType;
  TimerControls: React.ComponentType;
};

// Currently not taking any args and creating shit from within
export function createHome({ Timer, TimerControls }: HomeProps) : React.ComponentType {
  return () => (
    <div className={styles.homeContainer}>
      <div className={styles.timerContainer}>
        <Timer />
        <TimerControls />
      </div>
    </div>
  )
};

