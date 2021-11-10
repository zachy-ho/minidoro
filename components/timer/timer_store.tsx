import { makeAutoObservable } from 'mobx';

type TimerState = 'stopped' | 'running' | 'paused';

type TimerProps = {
  duration: number,
  state?: TimerState;
}

export class Timer {

  duration: number;
  state: TimerState;

  constructor({ duration, state }: TimerProps) {
    this.duration = duration;
    this.state = state ?? 'stopped';
    makeAutoObservable(this);
  }

  get seconds() {
    return this.duration % 60;
  }
}

export class TimerStore {
  /* Duration in seconds */
  timer: Timer;

  constructor(timer: Timer) {
    this.timer = timer;
    makeAutoObservable(this)
  }
}
