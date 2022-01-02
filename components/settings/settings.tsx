import Image from 'next/image';
import styles from './settings.module.css';
import settingsIcon from 'public/images/settings.svg';

export const Settings = () => {
  return (
    <div className={styles.container}>
      <button className={styles.settingsBtn}>
        <Image
          src={settingsIcon}
          alt='Settings'
        />
      </button>
    </div>
  )
}
