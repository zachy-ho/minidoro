import React from 'react';
import { observer } from 'mobx-react';
import styles from './pomodoro_settings.module.css';

export const createPomodoroSettings = (): () => JSX.Element => {
  return () => <PomodoroSettingsView />
}

const PomodoroSettingsView = observer(
  class PomodoroSettingsView extends React.Component {
    render() {
      return (
        <div className={styles.pomodoroSettingsContainer}>
          <input className="workDuration" type="number"></input>
          <input className="shortBreakDuration" type="number"></input>
          <input className="longBreakDuration" type="number"></input>
          <input className="intervals" type="number"></input>
      </div>
      )
    }
  }
)
