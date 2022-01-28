import { useState } from 'react';
import { observer } from 'mobx-react';
import Image from 'next/image';
import styles from './session_controls.module.css';
import coffeeIcon from 'public/images/coffee.svg';
import monitorIcon from 'public/images/monitor.svg';
import type { SessionManagerStore } from 'components/session/session_manager';
import type { SessionType } from 'components/session/session_config_presenter';

export const SessionControls = observer(
  ({
    sessionManager,
    onSessionSelect
  }:{
      sessionManager: SessionManagerStore,
      onSessionSelect: (session: SessionType) => void
    }) => {
    // Render single icon based on session type
    // If an icon is clicked, have a local useState to track that
    // and render both icons with each having its own onClick to manage
    let [isSelectingSession, setIsSelectingSession] = useState(false);

    const selectSession = (session: SessionType) => {
      setIsSelectingSession(false);
      onSessionSelect(session);
    };

    let icon;
    if (sessionManager.current === 'work') {
      icon = monitorIcon;
    } else {
      icon = coffeeIcon;
    }

    const controls = isSelectingSession ? (
      <>
        <button className={styles.sessionBtn} onClick={() => selectSession('work')}>
          <Image src={monitorIcon} alt="Session" />
        </button>
        <span>/</span>
        <button className={styles.sessionBtn} onClick={() => selectSession('break')}>
          <Image src={coffeeIcon} alt="Session" />
        </button>
      </>
    ) : (
      <button className={styles.sessionBtn} onClick={() => setIsSelectingSession(true)}>
        <Image src={icon} alt="Session" />
      </button>
    );

    return (
      <div className={styles.container}>
        {controls}
      </div>
    );
  }
);
