import React from 'react';
import { convertMinutesToMilliseconds } from 'base/time_converter';
import { Timer as TimerStore } from 'components/timer/timer_store';
import { Timer } from 'components/timer/timer';
import { TimerControlsView } from 'components/timer/timer_controls/timer_controls';
import { TimerPresenter } from 'components/timer/timer_presenter';

interface TimerController {
  setStartingMinutes: (minutes: number) => void;
}

type Props = {
  Timer: React.ComponentType,
  TimerControls: React.ComponentType,
  TimerController: TimerController
}

export const installTimer = (): Props => {
  const timer = new TimerStore();
  const timerPresenter = new TimerPresenter();

  const TimerView = () => <Timer timer={timer} />
  const TimerControlsViewImpl = () => <TimerControlsView timer={timer} timerPresenter={timerPresenter} />

  const setStartingMinutes = (minutes: number) => {
    timerPresenter.setStartingMilliseconds({ timer, milliseconds: convertMinutesToMilliseconds(minutes) });
  }

  return {
    Timer: TimerView,
    TimerControls: TimerControlsViewImpl,
    TimerController: { setStartingMinutes }
  };
}

