import { observer } from 'mobx-react-lite';
import { Timer, TimerStore } from './timer_store';
import { TimerView } from './timer_view';
import { TimerPresenter } from './timer_presenter';
import { createTimerControls } from './timer_controls/create';

export function createTimer(): () => JSX.Element {
  const timerStore = new TimerStore(new Timer({ duration: 59 }));
  const timerPresenter = new TimerPresenter();

  const TimerControlsView = createTimerControls({ timerPresenter: timerPresenter });

  return observer(() => (
      <>
        <TimerView timer={timerStore.timer} />
        <TimerControlsView />
      </>
    )
  );
}
