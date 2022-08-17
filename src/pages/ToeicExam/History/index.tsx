import React, { useEffect, useState } from 'react';
import { Root, TitleTypo, ContentContainer, ContentTable } from './styled';
import testData from 'assets/json/learning_material_card.json';
import LearningMaterialCard from 'systems/LearningMaterialCard';
import { commonAxios } from 'api/common';
import moment from 'moment';

const ToeicExamHistory = () => {
  const [toeicExams, setToeicExams] = useState<any[]>([]);
  const [historys, setHistorys] = useState<any[]>([]);

  useEffect(() => {
    commonAxios({ url: 'toeic-exams/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setToeicExams(res.data);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  useEffect(() => {
    toeicExams.forEach((toeicExam) => {
      commonAxios({
        url: `toeic-exams/${toeicExam.id}/submissions`,
        method: 'GET',
      }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setHistorys(
            res.data.map((value: any) => {
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
                exam_id: value.toeic_exam.material_name,
                date: moment(value.created_at).format('YYYY-MM-DD'),
                ...answerList,
              };
            })
          );
        } else {
          alert('서버 오류');
        }
      });
    });
  }, [toeicExams.length]);

  const dayWidth = 6000 / 200;

  const renderAnswer = (value: any) => {
    if (value) {
      return 'o';
    }
    return 'x';
  };

  const answer = [...Array(200)].map((value, index) => {
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
      <TitleTypo level={2}>토익 응시 기록</TitleTypo>
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

export default ToeicExamHistory;
