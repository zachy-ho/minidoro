import { makeAutoObservable } from 'mobx';
import type { Timer } from './timer_store';

interface TimerPresenterProps {
  setStartingDurationSeconds: ({
    timer,
    durationSeconds,
  }: {
    timer: Timer;
    durationSeconds: number;
  }) => void;
  toggleTimer: (timer: Timer) => void;
  pauseTimer: (timer: Timer) => void;
  runTimer: (timer: Timer) => void;
  runSingleIteration: (timer: Timer) => void;
  stopTimer: (timer: Timer) => void;
}

export class TimerPresenter implements TimerPresenterProps {
  constructor() {
    makeAutoObservable(this)
  }

  setStartingDurationSeconds = ({
    timer,
    durationSeconds,
  }: {
    timer: Timer;
    durationSeconds: number;
  }): void => {
    timer.startingDuration = durationSeconds * 1000;
    timer.remainingDuration = timer.startingDuration;
  };

  toggleTimer = (timer: Timer): void => {
    switch (timer.state) {
      case 'stopped':
        this.runTimer(timer)
        break;
      case 'paused':
        this.pauseTimer(timer);
        break;
      case 'running':
        this.runTimer(timer);
        break;
    }
  };

  pauseTimer = (timer: Timer): void => {
    timer.state = 'paused';
  };

  runTimer = (timer: Timer): void => {
    if (timer.remainingDuration <= 0) return;
    timer.state = 'running';

    // Interval at every second
    timer.interval = setInterval(() => this.runSingleIteration(timer), 1000)
  };

  runSingleIteration = (timer: Timer): void => {
    if (timer.state === 'running') {
      timer.remainingDuration -= 1000; 
      if (timer.remainingDuration <= 0) {
        this.stopTimer(timer);
      }
    }
  }

  stopTimer = (timer: Timer): void => {
    timer.interval && clearInterval(timer.interval);
    timer.state = 'stopped';

    timer.remainingDuration = 0;
    timer.startingDuration = 0;
  };
}
