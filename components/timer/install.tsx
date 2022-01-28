import React from 'react';
import { convertMinutesToMilliseconds } from 'base/time_converter';
import { Timer } from 'components/timer/timer';
import { TimerControlsView } from 'components/timer/timer_controls/timer_controls';
import { TimerStore, TimerPresenter } from 'components/timer/timer_presenter';

export interface TimerController {
  setStartingMinutes: (minutes: number) => void;
  toggleTimer: () => void;
  stopTimer: () => void;
}

export const installTimer = (minutes: number): ({
  timerStore: TimerStore,
  Timer: React.ComponentType,
  timerController: TimerController
}) => {
  const timer = new TimerStore(minutes);
  const timerPresenter = new TimerPresenter();

  const TimerView = () => <Timer timer={timer} />;

  const setStartingMinutes = (minutes: number) => {
    timerPresenter.setStartingMilliseconds({ timer, milliseconds: convertMinutesToMilliseconds(minutes) });
  };

  const toggleTimer = () => {
    timerPresenter.toggleTimer(timer);
  };

  const stopTimer = () => {
    timerPresenter.stopTimer(timer);
  };

  return {
    timerStore: timer,
    Timer: TimerView,
    timerController: {
      setStartingMinutes,
      toggleTimer,
      stopTimer
    }
  };
};

export const installTimerControls = ({
  timer,
  timerController
}:{
  timer: TimerStore
  timerController: TimerController
}): ({
  TimerControls: React.ComponentType
}) => {
  const TimerControlsViewImpl = () => <TimerControlsView timer={timer} onPlayPause={timerController.toggleTimer} />;

  return {
    TimerControls: TimerControlsViewImpl
  };
};
