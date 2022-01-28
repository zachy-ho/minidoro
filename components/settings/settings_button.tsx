import Image from 'next/image';
import styles from './settings_button.module.css';
import settingsIcon from 'public/images/settings.svg';

export type SettingsButtonProps = {
  onButtonClick?: () => void
}

export const SettingsButton: React.ComponentType<SettingsButtonProps> = ({
  onButtonClick
}:{
    onButtonClick?: () => void
  }) => {
  return (
    <div className={styles.container}>
      <button className={styles.settingsBtn} onClick={onButtonClick}>
        <Image
          src={settingsIcon}
          alt='Settings'
        />
      </button>
    </div>
  );
};
