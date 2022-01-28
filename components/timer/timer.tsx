import { observer } from 'mobx-react';
import styles from './timer.module.css';
import type { TimerStore } from 'components/timer/timer_presenter';

export const Timer = observer(({ timer }: { timer: TimerStore }) => {
  const padDigits = (
    duration: number,
  ): string => {
    const rounded = Math.round(duration);
    return rounded.toString().length === 1
      ? `0${rounded.toString()}`
      : rounded.toString();
  };

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.minutes}>{padDigits(timer.remainingMinutes)}</span>
        <span>:</span>
        <span className={styles.seconds}>{padDigits(timer.remainingSeconds)}</span>
      </div>
    </div>
  );
});
