import Image from 'next/image';
import coffeeIcon from 'public/images/coffee.svg';
import styles from './session_controls.module.css';

export const SessionControls = () => {
  return (
    <div className={styles.container}>
      <button className={styles.sessionBtn}>
        <Image
          src={coffeeIcon}
          alt="Session"
        />
      </button>
    </div>
  )
}
