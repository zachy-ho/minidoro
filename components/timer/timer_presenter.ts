import { makeAutoObservable } from 'mobx';
import type { Timer } from './timer_store';

interface TimerPresenterProps {
  setStartingMilliseconds: ({
    timer,
    milliseconds,
  }: {
    timer: Timer;
    milliseconds: number;
  }) => void;
  toggleTimer: (timer: Timer) => void;
  pauseTimer: (timer: Timer) => void;
  runTimer: (timer: Timer) => void;
  runSingleIteration: (timer: Timer) => void;
  stopTimer: (timer: Timer) => void;
  resetTimer: (timer: Timer) => void;
}

export class TimerPresenter implements TimerPresenterProps {
  constructor() {
    makeAutoObservable(this)
  }

  setStartingMilliseconds = ({
    timer,
    milliseconds,
  }: {
    timer: Timer;
    milliseconds: number;
  }): void => {
    timer.startingMilliseconds = milliseconds;
    timer.remainingMilliseconds = milliseconds;
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
    if (timer.remainingMilliseconds <= 0) return;
    timer.state = 'running';

    // Interval at every second
    timer.interval = setInterval(() => this.runSingleIteration(timer), 1000)
  };

  runSingleIteration = (timer: Timer): void => {
    if (timer.state === 'running') {
      timer.remainingMilliseconds -= 1000;
      if (timer.remainingMilliseconds <= 0) {
        this.stopTimer(timer);
      }
    }
  }

  stopTimer = (timer: Timer): void => {
    timer.interval && clearInterval(timer.interval);
    timer.state = 'stopped';

    timer.remainingMilliseconds = 0;
  };

  resetTimer = (timer: Timer): void => {
    timer.remainingMilliseconds = timer.startingMilliseconds;
  }
}
