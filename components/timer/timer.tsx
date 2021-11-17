import { observer } from 'mobx-react';
import styles from './timer.module.css';
import type { Timer } from 'components/timer/timer_store';

type TimerViewProps = {
  timer: Timer
}

export const TimerView = observer(({ timer }: TimerViewProps) => {
  const displayDurationWithTwoDigits = ( 
    duration: number, 
  ): string => {
    const initialLength = duration.toString().length;
    return initialLength === 1 
      ? `0${duration.toString()}` 
      : duration.toString();
  }

  return (
    <div className={styles.timerContainer}>
      <span className={styles.minutes}>{displayDurationWithTwoDigits(timer.remainingMinutes)}</span>
      :
      <span className={styles.seconds}>{displayDurationWithTwoDigits(timer.remainingSeconds)}</span>
    </div>
  )
})


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
