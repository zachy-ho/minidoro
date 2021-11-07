import React from 'react';
import { createHome } from 'components/home/home';
import { createTimer } from 'components/timer/create';
import { createTimerControls } from 'components/timer/timer_controls/create';

export const Page = () => {
  const Timer = createTimer();
  const TimerControls = createTimerControls();
  const Home = createHome({ 
    Timer,
    TimerControls
  });
  return <Home />
}
