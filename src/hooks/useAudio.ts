import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export const useAudio = (url: string) => {
  const audio = useRef(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [options, setOptions] = useState<EventTarget | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    playing ? audio?.current.play() : audio?.current.pause();
  }, [playing]);

  useEffect(() => {
    audio?.current.addEventListener('loadedmetadata', (e) => {
      setOptions(e.target);
      audio.current.currentTime = currentTime;
    });
    audio?.current.addEventListener('timeupdate', (e: any) => {
      setCurrentTime(e?.target?.currentTime);
    });
    audio?.current.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio?.current.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  const handleCurrentTime = (value: number) => () => {
    audio!.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolume = (value: number) => () => {
    audio!.current.volume = value;
  };

  const handleAudio = (type: 'PAUSE' | 'START' | 'TOGGLE') => () => {
    if (type === 'START') {
      setPlaying(true);
      audio?.current.play();
      return;
    }
    if (type === 'PAUSE') {
      setPlaying(false);
      audio?.current.pause();
      return;
    }
    setPlaying((prev) => !prev);
  };

  return {
    playing,
    setPlaying,
    options,
    currentTime: audio?.current.currentTime,
    handleCurrentTime,
    volume: audio?.current.volume,
    handleVolume,
    current: audio.current,
    handleAudio,
  };
};
