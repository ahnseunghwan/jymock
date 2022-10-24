import { commonAxios } from 'api/common';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  const [historys, setHistorys] = useState<any[]>();
  const [answerLength, setAnswerLength] = useState<number>(0);

  useEffect(() => {
    commonAxios({ url: `exams/${id}/submissions`, method: 'GET' }).then(
      (res) => {
        if (res.status >= 200 && res.status < 300) {
          setHistorys((prev: any) => [
            ...prev,
            ...res.data.map((value: any) => {
              setAnswerLength(value.result.length);
              let answerList = {};
              value.result.forEach((value2: any) => {
                answerList = {
                  ...answerList,
                  [`answer_${value2.ordering}`]: value2.accepted,
                };
              });
              return {
                name: value.student.name,
                score: value.score,
                exam_id: value.exam.material_name,
                date: moment(value.created_at).format('YYYY-MM-DD'),
                ...answerList,
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
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
        },
        {
          title: '점수',
          dataIndex: 'score',
          key: 'score',
          fixed: 'left',
          width: 100,
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
    </Root>
  );
};

export default ExamHistory;
