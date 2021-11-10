import styles from './timer_controls.module.css';

type TimerControlsProps = {
  onSetButtonClick: (duration: number) => void,
  onPlayPauseButtonClick: () => void,
  onStopButtonClick: () => void,
}

export const TimerControlsView = ({ 
  onSetButtonClick,
  onPlayPauseButtonClick,
  onStopButtonClick,
}: TimerControlsProps) => {
  return(
    <div className={styles.timerControlsContainer}>
      <input className={styles.durationSetter} type="number"></input>
      <button className={styles.setButton} onClick={(someNumber) => onSetButtonClick(someNumber)}>Set</button>
      <button className={styles.playButton} onClick={onPlayPauseButtonClick}>Play</button>
      <button className={styles.stopButton} onClick={onStopButtonClick}>Stop</button>
    </div>
  )
}
