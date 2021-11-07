import { observer } from 'mobx-react-lite';
import styles from './timer.module.css';
import type { TimerStore } from 'components/timer/timer_store';

type TimerProps = {
  timerStore: TimerStore
}

export const Timer = observer(({ timerStore }: TimerProps) => (
    <div className={styles.timerContainer}>
      <span className={styles.seconds}>{timerStore.seconds}</span>
    </div>
))
