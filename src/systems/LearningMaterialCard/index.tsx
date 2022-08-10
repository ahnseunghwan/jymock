import { EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import React from 'react';
import { LearningMaterialType } from 'type/common';
import { CardMeta, Root } from './styled';

type Props = {
  onClick: () => void;
} & LearningMaterialType;

const LearningMaterialCard: React.FC<Props> = ({
  audio_list,
  description,
  id,
  title,
  thumbnail,
  onClick,
}) => {
  return (
    <Root
      onClick={onClick}
      style={{
        width: 300,
      }}
      cover={<img alt='example' src={thumbnail} />}
      // actions={[<FilePdfOutlined key='setting' />, <EditOutlined key='edit' />]}
    >
      <CardMeta title={title} description={description} />
    </Root>
  );
};

export default LearningMaterialCard;
