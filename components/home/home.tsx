import React, { useState, useCallback } from 'react';
import styles from './home.module.css';
import { installTimer, installTimerControls } from 'components/timer/install';
import { SettingsButton, SettingsButtonProps } from 'components/settings/settings_button';
import { installSessionControls } from 'components/session/session_controls/install';
import { installSessionConfig } from 'components/session/install';
import { installSessionManager } from 'components/session/session_manager';

export const Home = () => {

  // Sets up the session configuration, i.e. duration for different types of sessions
  const { sessionConfig, SessionConfigView } = installSessionConfig();

  // Sets up the Timer component
  const { timerStore, Timer, timerController } = installTimer(sessionConfig.work);

  // Sets up the manager component that controls the interactions between session and timer
  const { sessionManager, sessionManagerController } = installSessionManager({ timerStore, timerController, sessionConfig });

  // Sets up the SessionControls component
  const { SessionControls } = installSessionControls({
    sessionManager,
    sessionManagerController
  });

  // Sets up the TimerControls component
  const { TimerControls } = installTimerControls({ timer: timerStore, timerController });

  return (
    <HomeLayout
      SettingsButton={SettingsButton}
      SessionConfig={SessionConfigView}
      SessionControls={SessionControls}
      Timer={Timer}
      TimerControls={TimerControls}
    />);
};

const HomeLayout = ({
  SettingsButton,
  SessionConfig,
  SessionControls,
  Timer,
  TimerControls
}:{
  SettingsButton: React.ComponentType<SettingsButtonProps>,
  SessionConfig: React.ComponentType,
  SessionControls: React.ComponentType,
  Timer: React.ComponentType,
  TimerControls: React.ComponentType,
}) => {
  let [showSessionConfig, setShowSessionConfig] = useState(false);

  const handleSettingsButtonClicked = useCallback(() => {
    setShowSessionConfig(!showSessionConfig);
  }, [showSessionConfig,setShowSessionConfig]);

  const view = showSessionConfig ?
    <SessionConfig />
    :
    (
      <>
        <SessionControls />
        <Timer />
        <TimerControls />
      </>
    );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pomodoroContainer}>
        <SettingsButton onButtonClick={handleSettingsButtonClicked}/>
        <div className={styles.swappableSection}>
          {view}
        </div>
      </div>
    </div>
  );
};
