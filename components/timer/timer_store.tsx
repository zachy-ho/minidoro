import { makeAutoObservable } from 'mobx';

type TimerState = 'stopped' | 'running' | 'paused';

type TimerProps = {
  startingDuration: number;
  remainingDuration: number;
  state: TimerState;
  interval: NodeJS.Timer | undefined;
}

type TimerConstructorProps = {
  durationInSeconds: number,
  state?: TimerState;
}

export class Timer implements TimerProps {

  // In milliseconds
  startingDuration: number;

  // In milliseconds
  remainingDuration: number;

  state: TimerState;

  interval: NodeJS.Timer | undefined;

  constructor({ durationInSeconds, state }: TimerConstructorProps) {
    this.startingDuration = durationInSeconds * 1000;
    this.remainingDuration = durationInSeconds * 1000;
    this.state = state ?? 'stopped';
    this.interval = undefined;
    makeAutoObservable(this);
  }

  get remainingSeconds() {
    return (this.remainingDuration/1000) % 60;
  }

  get startingSeconds() {
    return (this.startingDuration/1000) % 60;
  }
}
