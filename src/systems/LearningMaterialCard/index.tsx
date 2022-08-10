import { EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import React from 'react';
import { LearningMaterialType } from 'type/common';
import { CardMeta, Root } from './styled';

type Props = {} & LearningMaterialType;

const LearningMaterialCard: React.FC<Props> = ({
  audio_list,
  description,
  id,
  title,
  thumbnail,
}) => {
  return (
    <Root
      style={{
        width: 300,
      }}
      cover={<img alt='example' src={thumbnail} />}
      actions={[<FilePdfOutlined key='setting' />, <EditOutlined key='edit' />]}
    >
      <CardMeta title={title} description={description} />
    </Root>
  );
};

export default LearningMaterialCard;
