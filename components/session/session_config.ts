const DEFAULT_WORK_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 25;

interface SessionConfiguration {
  type: 'break' | 'work';
  minutes: number;
}

class WorkSessionConfiguration implements SessionConfiguration {

  type: 'work';

  minutes: number;

  constructor() {
    this.type = 'work';
    this.minutes = DEFAULT_WORK_MINUTES;
  }
}

class BreakSessionConfiguration implements SessionConfiguration {

  type: 'break';

  minutes: number;

  constructor() {
    this.type = 'break';
    this.minutes = DEFAULT_BREAK_MINUTES;
  }
}

export const initializeSessionConfigurations = (): {
  workSessionConfig: WorkSessionConfiguration,
  breakSessionConfig: BreakSessionConfiguration,
} => {
  const workSessionConfig = new WorkSessionConfiguration();
  const breakSessionConfig = new BreakSessionConfiguration();
  return {
    workSessionConfig,
    breakSessionConfig
  }
}
