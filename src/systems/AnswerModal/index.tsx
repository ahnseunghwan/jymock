import React from 'react';
import { ContentTable, Root } from './styled';

type Props = {
  visible: boolean;
  onCancel: () => void;
  result: any;
};

const AnswerModal: React.FC<Props> = ({ visible, onCancel, result }) => {
  const tableColumns = [
    {
      width: 100,
      title: '인덱스',
      dataIndex: 'number',
      key: 'number',
    },
    {
      width: 100,
      title: '내가 쓴 답',
      dataIndex: 'my_answer',
      key: 'my_answer',
    },
    {
      width: 100,
      title: '정답',
      dataIndex: 'answer',
      key: 'answer',
    },
    {
      width: 100,
      title: '정오',
      dataIndex: 'right',
      key: 'right',
    },
  ];

  const formattedResult = (() => {
    return (
      result &&
      result.map((value: any, index: number) => {
        return {
          number: `${index + 1}`,
          my_answer: value.actual,
          answer: value.expected,
          right: value.accepted ? 'O' : 'X',
        };
      })
    );
  })();

  return (
    <Root title='정오 상세' visible={visible} onCancel={onCancel} footer={null}>
      <ContentTable
        columns={tableColumns}
        dataSource={formattedResult}
        pagination={false}
      />
    </Root>
  );
};

export default AnswerModal;
