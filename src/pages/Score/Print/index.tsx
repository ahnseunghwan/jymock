import React, { useEffect, useRef, useState } from 'react';
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
  const id = location.search.split('?id=')[1].split('&')[0];
  const classId = location.search.split('&class_id=')[1];
  const { height, width } = useWindowDimensions();
  const [attendee, setAttendee] = useState<any>();
  const [cName, setCName] = useState<string>('');
  const [lecturerName, setLecturerName] = useState<string>('');
  const [scoreList, setScoreList] = useState<any[]>([]);
  const [middleScoreList, setMiddleScoreList] = useState<any[]>([]);

  useEffect(() => {
    commonAxios({
      url: `class-divisions/${classId}/attendees`,
      method: 'GET',
    }).then((res) => {
      setCName(`${res.data.curriculum.name} ${res.data.name}`);
      setLecturerName(res.data.lecturer.name);
      let newScoreList: any[] = [];
      let newMiddleScoreList: any[] = [];
      let newMiddleScoreList2: any = {};
      res.data.attendees.forEach((attendeeItem: any) => {
        let count = 0;
        if (attendeeItem.id === +id) {
          setAttendee(attendeeItem);
          attendeeItem.student.exam_submissions.forEach((submission: any) => {
            newScoreList.push(submission.score);
          });
        }
        attendeeItem.student.exam_submissions.forEach((submission: any) => {
          newMiddleScoreList.push({
            id: submission.exam.id,
            score: submission.score,
            ordering: count,
            include: attendeeItem.id === +id,
          });
          count++;
        });
      });

      newMiddleScoreList.forEach((newMiddleScore) => {
        if (newMiddleScoreList2[newMiddleScore.id]) {
          newMiddleScoreList2[newMiddleScore.id] = {
            ...newMiddleScoreList2[newMiddleScore.id],
            score:
              newMiddleScoreList2[newMiddleScore.id].score +
              newMiddleScore.score,
            count: newMiddleScoreList2[newMiddleScore.id].count + 1,
            include: newMiddleScoreList2[newMiddleScore.id].include
              ? true
              : newMiddleScore.include,
          };
        } else {
          newMiddleScoreList2[newMiddleScore.id] = {
            score: newMiddleScore.score,
            count: 1,
            ordering: newMiddleScore.ordering,
            include: newMiddleScore.include,
          };
        }
      });

      newMiddleScoreList = Object.values(newMiddleScoreList2)
        .filter((value: any) => value.include)
        .sort((a: any, b: any) => b.ordering - a.ordering)
        .reverse()
        .map((value: any) => {
          return value.score / value.count;
        });

      setScoreList(newScoreList);
      setMiddleScoreList(newMiddleScoreList);
    });
  }, []);

  const infoData = attendee
    ? [
        {
          key: '1',
          koreanName: `${attendee.student.name}`,
          englishName: `${attendee.student.english_name}`,
          className: `${cName}`,
          lecturerName: `${lecturerName}`,
          attendanceCount: `${attendee.attendances.length}일`,
        },
      ]
    : [];

  const testData = attendee
    ? attendee.student.exam_submissions.map((submission: any) => ({
        key: `submission_${submission.id}`,
        date: `${moment(submission).format('YYYY-MM-DD')}`,
        materialName: `${submission.exam.material_name}`,
        score: submission.score,
      }))
    : [];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const data = {
    labels: [...new Array(middleScoreList.length).fill('')],
    datasets: [
      {
        label: '본인',
        data: scoreList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '반평균',
        data: middleScoreList,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const commentData = [
    {
      key: '1',
      comment1: '듣기 집중력',
      comment1Score: attendee?.report.scores.verbal_concentration_score,
      comment2: '단어 인지도',
      comment2Score: attendee?.report.scores.reading_word_awareness_score,
      comment3: '수업 태도',
      comment3Score: attendee?.report.scores.attitude_class_score,
    },
    {
      key: '2',
      comment1: '발음 구사력',
      comment1Score: attendee?.report.scores.verbal_pronunciation_score,
      comment2: '단어 적합성',
      comment2Score: attendee?.report.scores.reading_word_fit_score,
      comment3: '숙제 완수 정도',
      comment3Score: attendee?.report.scores.attitude_assignment_score,
    },
    {
      key: '3',
      comment1: '답변 정확도',
      comment1Score: attendee?.report.scores.verbal_accuracy_score,
      comment2: '문장 이해도',
      comment2Score: attendee?.report.scores.reading_comprehension_score,
      comment3: '학원 규칙 준수',
      comment3Score: attendee?.report.scores.attitude_followership_score,
    },
    {
      key: '4',
      comment1: '문장 완성도',
      comment1Score: attendee?.report.scores.verbal_completeness_score,
      comment2: '철자 정확도',
      comment2Score: attendee?.report.scores.reading_spelling_score,
      comment3: '감정 전달',
      comment3Score: attendee?.report.scores.attitude_emotion_score,
    },
    {
      key: '5',
      comment1: '지시사항 이해도',
      comment1Score: attendee?.report.scores.verbal_comprehension_score,
      comment2: '문법 정확도',
      comment2Score: attendee?.report.scores.reading_syntax_score,
      comment3: '독립적 학습 태도',
      comment3Score: attendee?.report.scores.attitude_self_studying_score,
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
            dataSource={attendee?.report?.lecturer_opinions ?? []}
            style={{ width: width > 600 ? '600px' : width }}
            pagination={false}
          >
            <ColumnGroup title='선생님 의견'>
              <Column width={100} title='이름' dataIndex='name' key='name' />
              <Column title='의견' dataIndex='opinion' key='opinion' />
            </ColumnGroup>
          </Table>
        </CommentContainer>
      </Container>
    </Root>
  );
};

export default ScorePrint;
