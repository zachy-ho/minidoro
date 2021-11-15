import React from 'react';
import { Home } from 'components/home/home';
import { createTimer } from 'components/timer/create';

export const PomodoroHomePage = () => {
  const Timer = createTimer();
  return <Home
    Timer={Timer}
    StatsSection={() => <div></div>}
    PomodoroSettings={() => <div></div>}
    />
}
