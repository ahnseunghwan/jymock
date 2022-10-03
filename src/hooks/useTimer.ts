import { useEffect, useRef, useState } from 'react';

type Props = {
  duration: number;
};

const useTimer = ({ duration }: Props) => {
  const [now, setNow] = useState<number>(0);
  const [timerDuration, setTimerDuration] = useState<number>(duration);
  const [isPoint, setIsPoint] = useState<boolean>(false);
  const [timerStatus, setTimerStatus] = useState<
    'INIT' | 'START' | 'PAUSE' | 'END'
  >('INIT');
  const timer = useRef<any>();

  const onStart = () => {
    setTimerStatus('START');
    timer.current = setInterval(() => {
      setNow((prev) => prev + 1);
    }, 1000);
  };

  const onPause = () => {
    clearInterval(timer.current);
    setTimerStatus('PAUSE');
  };

  const onEndReached = () => {
    setNow(0);
    clearInterval(timer.current);
    setTimerStatus('END');
    alert('타이머가 종료되었습니다.');
  };

  const setDuration = (value: number) => {
    setTimerDuration(value);
  };

  useEffect(() => {
    if (now === timerDuration) {
      onEndReached();
    }
    if (timerDuration - now < 300) {
      setIsPoint(true);
    }
  }, [now]);

  return { now, isPoint, timerStatus, onStart, onPause, setDuration };
};

export default useTimer;
