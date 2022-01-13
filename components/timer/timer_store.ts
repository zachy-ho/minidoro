import { makeAutoObservable } from 'mobx';
import { convertMinutesToMilliseconds } from 'base/time_converter';

type TimerState = 'stopped' | 'running' | 'paused';

export type Session = {
  type: 'work' | 'break';
  minutes: number;
}

type TimerProps = {
  session: Session;
  startingMilliseconds: number;
  remainingMilliseconds: number;
  state: TimerState;
  interval: NodeJS.Timer | undefined;
}

export class Timer implements TimerProps {

  session: Session

  startingMilliseconds: number;

  remainingMilliseconds: number;

  state: TimerState;

  interval: NodeJS.Timer | undefined;

  constructor() {
    this.session = {
      type: 'work',
      minutes: 25
    }
    this.startingMilliseconds = convertMinutesToMilliseconds(this.session.minutes);
    this.remainingMilliseconds = this.startingMilliseconds;
    this.state = 'stopped';
    this.interval = undefined;
    makeAutoObservable(this);
  }

  get remainingMinutes() {
    return Math.floor((this.remainingMilliseconds/1000) / 60);
  }

  get remainingSeconds() {
    return (this.remainingMilliseconds/1000) % 60;
  }

  get startingSeconds() {
     return (this.startingMilliseconds/1000) % 60;
  }
}
