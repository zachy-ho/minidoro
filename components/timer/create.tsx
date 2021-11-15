import { observer } from 'mobx-react-lite';
import { Timer } from './timer_store';
import { TimerView} from './timer';

export const createTimer = ({ 
  timer,
} : {
  timer: Timer,
}): () => JSX.Element => {

  return observer(() => (
      <>
        <TimerView timer={timer} />
      </>
    )
  );
}
