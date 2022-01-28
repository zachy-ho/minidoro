import { SessionConfigStore, SessionConfigPresenter } from './session_config_presenter';
import { SessionConfig } from './session_config';

export const installSessionConfig = () => {
  const sessionConfig = new SessionConfigStore();
  const sessionConfigPresenter = new SessionConfigPresenter();

  const setWorkMinutes = (minutes: number): void => {
    sessionConfigPresenter.setWorkMinutes({ sessionConfig, minutes });
  };

  const setBreakMinutes = (minutes: number): void => {
    sessionConfigPresenter.setBreakMinutes({ sessionConfig, minutes });
  };

  const handleWorkDurationChanged = (minutes: number) => {
    sessionConfigPresenter.setWorkMinutes({ sessionConfig, minutes });
  };

  const handleBreakDurationChanged = (minutes: number) => {
    sessionConfigPresenter.setBreakMinutes({ sessionConfig, minutes });
  };

  const SessionConfigView = () => <SessionConfig
    sessionConfig={sessionConfig}
    handleWorkDurationChanged={handleWorkDurationChanged}
    handleBreakDurationChanged={handleBreakDurationChanged}
    />;

  return {
    sessionConfig,
    SessionConfigView,
    sessionConfigController: {
      setWorkMinutes,
      setBreakMinutes
    }
  };
};
