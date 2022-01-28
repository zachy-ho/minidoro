import { makeAutoObservable, reaction } from 'mobx';
import type { SessionConfigStore, SessionType } from 'components/session/session_config_presenter';
import type { TimerStore } from 'components/timer/timer_presenter';
import { TimerController } from 'components/timer/install';

export type SessionManagerController = {
  onSessionSelect: (session: SessionType) => void;
}

export class SessionManagerStore {

  private _current: SessionType;

  constructor() {
    this._current = 'work';
    makeAutoObservable(this);
  }

  get current() {
    return this._current;
  }

  set current(newSession: SessionType) {
    this._current = newSession;
  }
}

class SessionManagerPresenter {

  constructor() {
    makeAutoObservable(this);
  }

  prepareSession({
    store,
    session,
    timerController,
    sessionConfig
  }:{
      store: SessionManagerStore,
      session: SessionType,
      timerController: TimerController,
      sessionConfig: SessionConfigStore
    }) {
      store.current = session;
      switch (session) {
        case 'work':
          timerController.setStartingMinutes(sessionConfig.work);
          break;
        case 'break':
          timerController.setStartingMinutes(sessionConfig.break);
          break;
        default:
          break;
      }
  }
}

export const installSessionManager = ({
  timerStore,
  timerController,
  sessionConfig
}:{
  timerStore: TimerStore,
  timerController: TimerController,
  sessionConfig: SessionConfigStore
}): {
  sessionManager: SessionManagerStore
  sessionManagerController: SessionManagerController
} => {

  // Install timer here
  const sessionManagerStore = new SessionManagerStore();
  const sessionManagerPresenter = new SessionManagerPresenter();

  // Track when timer runs a full duration
  reaction(
    () => timerStore.fullDurationCompleted,
    (fullDurationCompleted) => {
      if (fullDurationCompleted) {
        const session = sessionManagerStore.current === 'work' ? 'break' : 'work';
        sessionManagerPresenter.prepareSession({
          store: sessionManagerStore,
          session,
          timerController,
          sessionConfig
        });
      }
    }
  );

  // Changes work timer duration when work session config is changed
  reaction(
    () => sessionConfig.work,
    (workDuration) => {
      if (sessionManagerStore.current === 'work') {
        timerController.setStartingMinutes(workDuration);
      }
    }
  );

  // Changes break timer duration when break session config is changed
  reaction(
    () => sessionConfig.break,
    (breakDuration) => {
      if (sessionManagerStore.current === 'break') {
        timerController.setStartingMinutes(breakDuration);
      }
    }
  );

  const onSessionSelect = (session: SessionType) => {
    // Stop the timer/interval then prepare session
    timerController.stopTimer();

    sessionManagerPresenter.prepareSession({
      store: sessionManagerStore,
      session,
      timerController,
      sessionConfig
    });
  };

  return {
    sessionManager: sessionManagerStore,
    sessionManagerController: {
      onSessionSelect
    }
  };
};

