import { makeAutoObservable } from "mobx";

export const workDurationOptions = [25, 30, 35, 40, 45, 50];
export const breakDurationOptions = [5, 10, 15];

export type SessionType = 'work' | 'break';

export class Session {
  type: SessionType;

  constructor() {
    this.type = 'work';
    makeAutoObservable(this);
  }

  next() {
    if (this.type === 'work') {
      this.type = 'break';
    } else {
      this.type = 'work';
    }
  }
}

export class SessionConfigStore {

  private _work: number;

  private _break: number;

  constructor() {
    this._work = workDurationOptions[0];
    this._break = breakDurationOptions[0];
    makeAutoObservable(this);
  }

  get work() {
    return this._work;
  }

  set work(minutes: number) {
    this._work = minutes;
  }

  get break() {
    return this._break;
  }

  set break(minutes: number) {
    this._break = minutes;
  }
}

export class SessionConfigPresenter {
  constructor() {
  }

  setWorkMinutes({ sessionConfig, minutes }:{ sessionConfig: SessionConfigStore, minutes: number }): void {
    sessionConfig.work = minutes;
  }

  setBreakMinutes({ sessionConfig, minutes }:{ sessionConfig: SessionConfigStore, minutes: number }): void {
    sessionConfig.break = minutes;
  }
}

