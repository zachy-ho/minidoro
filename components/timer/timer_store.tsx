import { makeAutoObservable } from 'mobx';

type TimerState = 'stopped' | 'running' | 'paused';

export class TimerStore {
  /* Duration in seconds */
  private _duration: number;

  private _state: TimerState = 'stopped';

  constructor(duration: number) {
    this._duration = duration;
    makeAutoObservable(this)
  }

  get seconds() {
    return this._duration % 60;
  }

  get duration() {
    return this._duration;
  }

  set duration(newDuration: number) {
    this._duration = newDuration;
  }

  get state() {
    return this._state;
  }

  set state(newState: TimerState) {
    this._state = newState;
  }
}
