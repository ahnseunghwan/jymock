import { commonAxios } from 'api/common';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AnswerModal from 'systems/AnswerModal';
import { convertSecondToToeicTime } from 'utils/time';
import {
  ContentButton,
  ContentButtonTypo,
  ContentContainer,
  ContentTable,
  Root,
  TitleTypo,
} from './styled';

const ExamHistory = () => {
  const location = useLocation();
  const id = location.search.split('?id=')[1];

  const [historys, setHistorys] = useState<any[]>([]);
  const [answerLength, setAnswerLength] = useState<number>(0);
  const [results, setResults] = useState<any[]>([]);
  const [answerModalVisible, setAnswerModalVisible] = useState<boolean>(false);
  const [answerModalResult, setAnswerModalResult] = useState<any[]>();

  const onAnswerModalOpen = (index: number) => () => {
    setAnswerModalResult(results[index]?.result);
    setAnswerModalVisible(true);
  };

  const onAnswerModalCancel = () => {
    setAnswerModalVisible(false);
  };

  useEffect(() => {
    commonAxios({ url: `exams/${id}/submissions`, method: 'GET' }).then(
      (res) => {
        if (res.status >= 200 && res.status < 300) {
          setResults((prev) => [...prev, ...res.data]);
          setHistorys((prev: any) => [
            ...prev,
            ...res.data.map((value: any, index: number) => {
              setAnswerLength(value.result.length);
              let answerList = {};
              value.result.forEach((value2: any) => {
                answerList = {
                  ...answerList,
                  [`answer_${value2.ordering}`]: value2.accepted,
                };
              });
              let answerNumberList: any[] = [];
              value.result.forEach((value2: any) => {
                value2.accepted &&
                  (answerNumberList = [...answerNumberList, value2.ordering]);
              });
              return {
                index: prev.length + index,
                name: value.student.name,
                score: value.score,
                duration: value.duration,
                exam_id: value.exam.material_name,
                date: moment(value.created_at).format('YYYY-MM-DD'),
                ...answerList,
                answerNumberList,
              };
            }),
          ]);
        } else {
          alert('서버 오류');
        }
      }
    );
  }, []);

  const dayWidth = 80;

  const renderAnswerNumber = (value: any) => {
    if (value) {
      let a = '';
      value.forEach((value2: any, index: number) => {
        if (index === 0) {
          a = value2;
        } else {
          a += `, ${value2}`;
        }
      });
      return a;
    }
    return '';
  };

  const renderAnswer = (value: any) => {
    if (value) {
      return 'o';
    }
    return 'x';
  };

  const answer = [...Array(answerLength)].map((value, index) => {
    return {
      title: `${index + 1}번`,
      width: dayWidth,
      dataIndex: `answer_${index + 1}`,
      key: `answer_${index + 1}`,
      render: renderAnswer,
    };
  });

  const tableColumns = [
    {
      title: '학생 정보',
      dataIndex: 'info',
      key: 'info',
      children: [
        {
          title: '이름',
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
          width: 100,
          sorter: (a: any, b: any) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
        },
        {
          title: '시험 이름',
          dataIndex: 'exam_id',
          key: 'exam_id',
          fixed: 'left',
          width: 100,
          sorter: (a: any, b: any) =>
            a.exam_id < b.exam_id ? -1 : a.exam_id > b.exam_id ? 1 : 0,
        },
        {
          title: '점수',
          dataIndex: 'score',
          key: 'score',
          fixed: 'left',
          width: 100,
        },
        {
          title: '응시 시간',
          dataIndex: 'duration',
          key: 'duration',
          fixed: 'left',
          width: 100,
          render: (value: number) => convertSecondToToeicTime(value),
        },
        {
          title: '정오 상세',
          dataIndex: 'answer_modal',
          key: 'answer_modal',
          fixed: 'left',
          width: 120,
          render: (a: any, b: any) => {
            return (
              <ContentButton onClick={onAnswerModalOpen(b?.index)}>
                정오 상세
              </ContentButton>
            );
          },
        },
        {
          title: '날짜',
          dataIndex: 'date',
          key: 'date',
          fixed: 'left',
          width: 120,
          sorter: (a: any, b: any) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
        },
      ],
    },
    {
      title: '맞은 문제',
      dataIndex: `answerNumberList`,
      key: `answerNumberList`,
      render: renderAnswerNumber,
    },
    {
      title: '정오표',
      children: answer,
    },
  ];
  return (
    <Root>
      <TitleTypo level={2}>시험 응시 기록</TitleTypo>
      <ContentContainer>
        <ContentTable
          columns={tableColumns}
          dataSource={historys}
          scroll={{
            x: '1000px',
          }}
        />
      </ContentContainer>
      <AnswerModal
        visible={answerModalVisible}
        onCancel={onAnswerModalCancel}
        result={answerModalResult}
      />
    </Root>
  );
};

export default ExamHistory;
