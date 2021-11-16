import { observer } from 'mobx-react';
import React from 'react';

export const createPomodoroSettings = (): () => JSX.Element => {
  return () => <PomodoroSettingsView />
}

const PomodoroSettingsView = observer(
  class PomodoroSettingsView extends React.Component {
    render() {
      return <h1>hi</h1>
    }
  }
)
