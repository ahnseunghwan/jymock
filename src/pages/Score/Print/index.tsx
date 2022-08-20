import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  CommentContainer,
  Container,
  InfoContainer,
  Root,
  TestContainer,
  TitleContainer,
  TitleLogoImg,
  TitleTypo,
} from './styled';
import logo from 'assets/images/logo.png';
import { commonAxios } from 'api/common';
import { useLocation } from 'react-router-dom';
import useWindowDimensions from 'hooks/useWindowSize';
import { Table } from 'antd';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let today = new Date();

const ScorePrint = () => {
  const location = useLocation();
  const id = location.search.split('?id=')[1];
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    commonAxios({ url: `attendees/${id}/report`, method: 'GET' }).then(
      (res) => {
        console.log(res.data);
      }
    );
  }, []);

  const infoData = [
    {
      key: '1',
      koreanName: 'John',
      englishName: 'Brown',
      className: 'boot camp 2',
      lecturerName: 'Hazel',
      attendanceCount: '9일',
    },
  ];

  const testData = [
    {
      date: '2022-08-20',
      materialName: '단어 테스트(08.20)',
      score: 9,
    },
    {
      date: '2022-08-19',
      materialName: '단어 테스트(08.19)',
      score: 7,
    },
    {
      date: '2022-08-18',
      materialName: '단어 테스트(08.18)',
      score: 10,
    },
    {
      date: '2022-08-17',
      materialName: '단어 테스트(08.17)',
      score: 12,
    },
    {
      date: '2022-08-16',
      materialName: '단어 테스트(08.16)',
      score: 9,
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May'];

  const data = {
    labels,
    datasets: [
      {
        label: '본인',
        data: [9, 7, 10, 12, 9],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '반평균',
        data: [10, 10.2, 8, 9, 9],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const commentData = [
    {
      key: '1',
      comment1: '듣기 집중력',
      comment1Score: 8,
      comment2: '단어 인지도',
      comment2Score: 8,
      comment3: '수업 태도',
      comment3Score: 10,
    },
    {
      key: '2',
      comment1: '발음 구사력',
      comment1Score: 7,
      comment2: '단어 적합성',
      comment2Score: 10,
      comment3: '숙제 완수 정도',
      comment3Score: 8,
    },
    {
      key: '3',
      comment1: '답변 정확도',
      comment1Score: 10,
      comment2: '문장 이해도',
      comment2Score: 8,
      comment3: '학원 규칙 준수',
      comment3Score: 10,
    },
    {
      key: '4',
      comment1: '문장 완성도',
      comment1Score: 7,
      comment2: '철자 정확도',
      comment2Score: 10,
      comment3: '감정 전달',
      comment3Score: 9,
    },
    {
      key: '5',
      comment1: '지시사항 이해도',
      comment1Score: 9,
      comment2: '문법 정확도',
      comment2Score: 10,
      comment3: '독립적 학습 태도',
      comment3Score: 6,
    },
  ];

  const lecturerData = [
    {
      key: '1',
      lecturerName: 'Hazel',
      lecturerOpinion:
        '1-2월 동안 Fundamental Reading Plus 1 그리고 Grammar Vista 2 을 배웠습니다. 채연이는 성실한 학생이며 문법에 대한 이해가 전에 비해 향상 되었습니다. 지금처럼 꾸준히 숙제 및 복습이 이루어진다면 영어 실력이 더 발전할 학생입니다. 또한 어휘 공부 및 문장 읽기 연습을 실천한다면 더욱 발전할 학생입니다.',
    },
    {
      key: '2',
      lecturerName: '아드리엘',
      lecturerOpinion:
        'Hello, my name is Adrienne Teacher and I teach English Communications 1. In class, we have had discussions about appearance, clothes, abilities and skills, requirements, the past and past actions, past activities, and making plans and suggestions. Chaeyeon practices the dialogues well and participates in speaking activities. She listens during lessons and has a good understanding of the vocabulary and grammar. She is kind to everyone and always does her best. Good job, Chaeyeon!',
    },
  ];

  return (
    <Root>
      <Container style={{ width: width > 600 ? '600px' : width }}>
        <TitleContainer>
          <TitleLogoImg src={logo} />
          <TitleTypo level={4}>
            {'<'} 성적 통지표 {'>'}
          </TitleTypo>
        </TitleContainer>
        <InfoContainer>
          <Table
            dataSource={infoData}
            style={{ width: width > 600 ? '600px' : width }}
            pagination={false}
          >
            <ColumnGroup title='이름'>
              <Column title='한글' dataIndex='koreanName' key='koreanName' />
              <Column title='영어' dataIndex='englishName' key='englishName' />
            </ColumnGroup>
            <Column title='반' dataIndex='className' key='className' />
            <Column
              title='선생님'
              dataIndex='lecturerName'
              key='lecturerName'
            />
            <ColumnGroup title='학원 출석일'>
              <Column
                title={`${moment(today).format('M')}월`}
                dataIndex='attendanceCount'
                key='attendanceCount'
              />
            </ColumnGroup>
          </Table>
        </InfoContainer>
        <TestContainer>
          <TitleContainer>
            <TitleTypo level={4}>
              {'<'} Test Report {'>'}
            </TitleTypo>
          </TitleContainer>
          <Table
            dataSource={testData}
            style={{ width: width > 600 ? '600px' : width }}
            pagination={false}
          >
            <Column title='날짜' dataIndex='date' key='date' />
            <Column title='교재' dataIndex='materialName' key='materialName' />
            <Column title='점수' dataIndex='score' key='score' />
          </Table>
          <Line options={options} data={data} />
        </TestContainer>
        <CommentContainer>
          <Table
            dataSource={commentData}
            style={{ width: width > 600 ? '600px' : width }}
            pagination={false}
          >
            <Column title='듣기 / 말하기' dataIndex='comment1' key='comment1' />
            <Column
              title='점수'
              dataIndex='comment1Score'
              key='comment1Score'
            />
            <Column title='읽기 / 쓰기' dataIndex='comment2' key='comment2' />
            <Column
              title='점수'
              dataIndex='comment2Score'
              key='comment2Score'
            />
            <Column title='학습 태도' dataIndex='comment3' key='comment3' />
            <Column
              title='점수'
              dataIndex='comment3Score'
              key='comment3Score'
            />
          </Table>
          <Table
            dataSource={lecturerData}
            style={{ width: width > 600 ? '600px' : width }}
            pagination={false}
          >
            <ColumnGroup title='선생님 의견'>
              <Column
                width={100}
                title='이름'
                dataIndex='lecturerName'
                key='leturerName'
              />
              <Column
                title='의견'
                dataIndex='lecturerOpinion'
                key='lecturerOpinion'
              />
            </ColumnGroup>
          </Table>
        </CommentContainer>
      </Container>
    </Root>
  );
};

export default ScorePrint;
