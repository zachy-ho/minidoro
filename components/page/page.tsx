import React from 'react';
import { createHome } from 'components/home/home';
import { createTimer } from 'components/timer/create';

export const Page = () => {
  const Timer = createTimer();
  const Home = createHome({ 
    Timer,
  });
  return <Home />
}
