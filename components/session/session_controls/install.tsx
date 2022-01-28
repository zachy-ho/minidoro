import { SessionControls } from 'components/session/session_controls/session_controls';
import type { SessionManagerStore, SessionManagerController } from 'components/session/session_manager';

export const installSessionControls = ({
  sessionManager,
  sessionManagerController
}:{
    sessionManager: SessionManagerStore,
    sessionManagerController: SessionManagerController
  }) : {
  SessionControls: React.ComponentType
} => {
  const SessionControlsView = () => <SessionControls
    sessionManager={sessionManager}
    onSessionSelect={sessionManagerController.onSessionSelect}
  />;

  return {
    SessionControls: SessionControlsView
  };
};
