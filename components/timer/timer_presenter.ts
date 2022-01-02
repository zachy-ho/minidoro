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
  startTimer: (timer: Timer) => void;
  continueTimer: (timer: Timer) => void;
  runSingleIteration: (timer: Timer, elapsedMilliseconds: number) => void;
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
        this.startTimer(timer)
        break;
      case 'paused':
        this.continueTimer(timer);
        break;
      case 'running':
        this.pauseTimer(timer);
        break;
    }
  };

  pauseTimer = (timer: Timer): void => {
    timer.state = 'paused';
  };

  startTimer = (timer: Timer): void => {
    if (timer.remainingMilliseconds <= 0) return;
    timer.state = 'running';

    let startTime = performance.now();

    // Interval at every second
    timer.interval = setInterval(() => {
      const endTime  = performance.now();
      const elapsed = endTime - startTime;
      if (timer.state === 'running') {
        this.runSingleIteration(timer, elapsed)
      }
      startTime = performance.now();
    }, 1000)
  };

  continueTimer = (timer: Timer) : void => {
    if (timer.remainingMilliseconds <= 0) return;
    timer.state = 'running';
  }

  runSingleIteration = (timer: Timer, elapsedMilliseconds: number): void => {
    timer.remainingMilliseconds -= elapsedMilliseconds;
    if (timer.remainingMilliseconds <= 0) {
      this.stopTimer(timer);
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
