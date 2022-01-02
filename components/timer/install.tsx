import React from 'react';
import { convertSecondsToMilliseconds } from 'base/time_converter';
import { Timer } from 'components/timer/timer_store';
import { TimerView } from 'components/timer/timer';
import { TimerControlsView } from 'components/timer/timer_controls/timer_controls';
import { TimerPresenter } from 'components/timer/timer_presenter';

type Props = {
  TimerView: React.ComponentType,
  TimerControlsView: React.ComponentType
}

export const installTimer = (): Props => {
  const timer = new Timer({ startingMilliseconds: convertSecondsToMilliseconds(65) });
  const timerPresenter = new TimerPresenter();

  const TimerViewImpl = () => <TimerView timer={timer} />
  const TimerControlsViewImpl = () => <TimerControlsView timer={timer} timerPresenter={timerPresenter} />

  return {
    TimerView: TimerViewImpl,
    TimerControlsView: TimerControlsViewImpl
  };
}

