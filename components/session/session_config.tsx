import Image from 'next/image';
import { observer } from 'mobx-react';
import styles from './session_config.module.css';
import monitorIcon from 'public/images/monitor.svg';
import coffeeIcon from 'public/images/coffee.svg';
import { SessionConfigStore, workDurationOptions, breakDurationOptions } from 'components/session/session_config_presenter';

export const SessionConfig = observer(({
  sessionConfig,
  handleWorkDurationChanged,
  handleBreakDurationChanged
}:{
    sessionConfig: SessionConfigStore,
    handleWorkDurationChanged: (duration: number) => void,
    handleBreakDurationChanged: (duration: number) => void
  }) => {
  const workDurationSelectOptions = workDurationOptions.map((i) => (
    <option key={i.toString()} value={i.toString()}>{i.toString()}</option>
  ));

  const breakDurationSelectOptions = breakDurationOptions.map((i) => (
    <option key={i.toString()} value={i.toString()}>{i.toString()}</option>
  ));

  const onWorkDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const duration = parseInt(e.target.value);
      console.log(sessionConfig.work);
      handleWorkDurationChanged(duration);
  };

  const onBreakDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const duration = parseInt(e.target.value);
      handleBreakDurationChanged(duration);
  };

  return (
    <>
      <div className={styles.workConfig}>
        <Image width={30} height={30} src={monitorIcon} alt="work icon"/>
        <select
            id="workDurationSelect"
            className={styles.durationSelect}
            name="Work Duration"
            onChange={onWorkDurationChange}
            value={sessionConfig.work.toString()}
            >
          {workDurationSelectOptions}
        </select>
      </div>
      <div className={styles.breakConfig}>
        <Image width={30} height={30} src={coffeeIcon} alt="break icon"/>
        <select
            id="breakDurationSelect"
            className={styles.durationSelect}
            name="Break Duration"
            onChange={onBreakDurationChange}
            value={sessionConfig.break.toString()}
          >
          {breakDurationSelectOptions}
        </select>
      </div>
    </>
  );
});
