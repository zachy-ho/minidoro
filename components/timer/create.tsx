import { observer } from 'mobx-react-lite';
import { Timer } from './timer_store';
import { TimerView} from './timer';
import { TimerPresenter } from './timer_presenter';
import { createTimerControls } from './timer_controls/create';

export function createTimer(): () => JSX.Element {
  const timerStore = new Timer({ durationInSeconds: 5 });
  const timerPresenter = new TimerPresenter();

  const TimerControls = createTimerControls({ timer: timerStore, timerPresenter: timerPresenter });

  return observer(() => (
      <>
        <TimerView timer={timerStore} />
        <TimerControls />
      </>
    )
  );
}
