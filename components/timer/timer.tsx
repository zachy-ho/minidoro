import { observer } from 'mobx-react';
import styles from './timer.module.css';
import type { Timer } from 'components/timer/timer_store';

type TimerViewProps = {
  timer: Timer
}

export const TimerView = observer(({ timer }: TimerViewProps) => {
  const padDigits = (
    duration: number,
  ): string => {
    const rounded = Math.round(duration);
    return rounded.toString().length === 1
      ? `0${rounded.toString()}`
      : rounded.toString();
  }

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.minutes}>{padDigits(timer.remainingMinutes)}</span>
        <span>:</span>
        <span className={styles.seconds}>{padDigits(timer.remainingSeconds)}</span>
      </div>
    </div>
  )
})
