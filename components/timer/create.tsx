import { TimerStore } from './timer_store';
import { Timer } from './timer';

export function createTimer(): () => JSX.Element {
  const timerStore = new TimerStore(59);

  return () => (
    <Timer timerStore={timerStore} />
  );
}
