import Correct from 'components/Correct';
import React from 'react';
import { NumberWrapper, Root } from './styled';

type Props = {
  id: number;
  value: 'A' | 'B' | 'C' | 'D' | null;
  onClick: (value: 'A' | 'B' | 'C' | 'D') => () => void;
};

const ToeicCorrect: React.FC<Props> = ({ id, value, onClick }) => {
  const toeicCorrect: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return (
    <Root>
      <NumberWrapper>{id + 1}</NumberWrapper>
      {toeicCorrect.map((item, index) => (
        <Correct
          value={item}
          isChecked={item === value}
          onClick={onClick(item)}
          key={`toeic_correct_${index}`}
        />
      ))}
    </Root>
  );
};

export default ToeicCorrect;
