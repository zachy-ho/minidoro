import { makeAutoObservable } from 'mobx';

type TimerState = 'stopped' | 'running' | 'paused';

type TimerProps = {
  startingMilliseconds: number;
  remainingMilliseconds: number;
  state: TimerState;
  interval: NodeJS.Timer | undefined;
}

type TimerConstructorProps = {
  startingMilliseconds: number,
  state?: TimerState;
}

export class Timer implements TimerProps {

  // In milliseconds
  startingMilliseconds: number;

  // In milliseconds
  remainingMilliseconds: number;

  state: TimerState;

  interval: NodeJS.Timer | undefined;

  constructor({ startingMilliseconds, state }: TimerConstructorProps) {
    this.startingMilliseconds = startingMilliseconds;
    this.remainingMilliseconds = startingMilliseconds;
    this.state = state ?? 'stopped';
    this.interval = undefined;
    makeAutoObservable(this);
  }

  get remainingSeconds() {
    return (this.remainingMilliseconds/1000) % 60;
  }

  get startingSeconds() {
    return (this.startingMilliseconds/1000) % 60;
  }
}
