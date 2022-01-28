import { makeAutoObservable } from 'mobx';
import { convertMinutesToMilliseconds } from 'base/time_converter';

type TimerState = 'stopped' | 'running' | 'paused';

export type Session = {
  type: 'work' | 'break';
  minutes: number;
}

export class TimerStore {

  private _startingMilliseconds: number;

  private _remainingMilliseconds: number;

  private _state: TimerState;

  private _interval: NodeJS.Timer | null;

  constructor(minutes: number) {
    this._startingMilliseconds = convertMinutesToMilliseconds(minutes);
    this._remainingMilliseconds = this._startingMilliseconds;
    this._state = 'stopped';
    this._interval = null;
    makeAutoObservable(this);
  }

  get startingMilliseconds() {
    return this._startingMilliseconds;
  }

  set startingMilliseconds(milliseconds: number) {
    this._startingMilliseconds = milliseconds;
  }

  get remainingMilliseconds() {
    return this._remainingMilliseconds;
  }

  set remainingMilliseconds(milliseconds: number) {
    this._remainingMilliseconds = milliseconds;
  }

  get state() {
    return this._state;
  }

  set state(newState: TimerState) {
    this._state = newState;
  }

  get interval() {
    return this._interval;
  }

  set interval(newInterval: NodeJS.Timer | null) {
    this._interval = newInterval;
  }

  get fullDurationCompleted() {
    return this.remainingMilliseconds <= 0 && this.interval === null && this.state === 'stopped';
  }

  get remainingMinutes() {
    return Math.floor((this._remainingMilliseconds/1000) / 60);
  }

  get remainingSeconds() {
    return (this._remainingMilliseconds/1000) % 60;
  }

  get startingSeconds() {
     return (this._startingMilliseconds/1000) % 60;
  }
}

export class TimerPresenter {
  constructor() {
    makeAutoObservable(this);
  }

  setStartingMilliseconds = ({
    timer,
    milliseconds,
  }: {
    timer: TimerStore;
    milliseconds: number;
  }): void => {
    timer.startingMilliseconds = milliseconds;
    timer.remainingMilliseconds = milliseconds;
  };

  toggleTimer = (timer: TimerStore): void => {
    switch (timer.state) {
      case 'stopped':
        this.startTimer(timer);
        break;
      case 'paused':
        this.continueTimer(timer);
        break;
      case 'running':
        this.pauseTimer(timer);
        break;
    }
  };

  pauseTimer = (timer: TimerStore): void => {
    timer.state = 'paused';
  };

  startTimer = (timer: TimerStore): void => {
    if (timer.remainingMilliseconds <= 0) return;
    timer.state = 'running';

    let startTime = performance.now();

    // Interval at every second
    timer.interval = setInterval(() => {
      const endTime  = performance.now();
      const elapsed = endTime - startTime;
      if (timer.state === 'running') {
        timer.remainingMilliseconds -= elapsed;
        if (timer.remainingMilliseconds <= 0) {
          this.stopTimer(timer);
        }
      }
      startTime = performance.now();
    }, 1000);
  };

  continueTimer = (timer: TimerStore) : void => {
    if (timer.remainingMilliseconds <= 0) return;
    timer.state = 'running';
  }

  stopTimer = (timer: TimerStore): void => {
    if (timer.interval) {
      clearInterval(timer.interval);
      timer.interval = null;
    }
    timer.state = 'stopped';

    timer.remainingMilliseconds = 0;
  };

  resetTimer = (timer: TimerStore): void => {
    timer.remainingMilliseconds = timer.startingMilliseconds;
  }
}
