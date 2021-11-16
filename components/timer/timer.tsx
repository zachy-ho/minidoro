import { observer } from 'mobx-react';
import styles from './timer.module.css';
import type { Timer } from 'components/timer/timer_store';

type TimerViewProps = {
  timer: Timer
}

export const TimerView = observer(({ timer }: TimerViewProps) => (
    <div className={styles.timerContainer}>
      <span className={styles.seconds}>{timer.remainingSeconds}</span>
    </div>
))


export const createTimer = ({ 
  timer,
} : {
  timer: Timer,
}): () => JSX.Element => {

  return observer(() => (
      <>
        <TimerView timer={timer} />
      </>
    )
  );
}
