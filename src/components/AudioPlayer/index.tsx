import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useAudio } from 'hooks/useAudio';
import React, { useEffect } from 'react';
import { Root } from './styled';

type Props = {
  src: string;
  name: string;
};

const AudioPlayer: React.FC<Props> = ({ src, name }) => {
  const { playing, handleAudio } = useAudio(src);

  useEffect(() => {
    return () => handleAudio('PAUSE')();
  }, []);

  return (
    <Root onClick={handleAudio('TOGGLE')}>
      {!playing ? (
        <PlayCircleOutlined style={{ fontSize: 40 }} />
      ) : (
        <PauseCircleOutlined style={{ fontSize: 40 }} />
      )}
      <Typography>{name}</Typography>
    </Root>
  );
};

export default AudioPlayer;
