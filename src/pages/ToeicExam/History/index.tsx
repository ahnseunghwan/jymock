import React, { useEffect, useState } from 'react';
import {
  Root,
  TitleTypo,
  ContentContainer,
  ContentTable,
  ContentButton,
} from './styled';
import { commonAxios } from 'api/common';
import moment from 'moment';
import { convertSecondToToeicTime } from 'utils/time';
import AnswerModal from 'systems/AnswerModal';
import { useLocation } from 'react-router-dom';
import { JsonToExcel } from 'react-json-to-excel';

const ToeicExamHistory = () => {
  const [toeicExams, setToeicExams] = useState<any[]>([]);
  const [historys, setHistorys] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [answerModalVisible, setAnswerModalVisible] = useState<boolean>(false);
  const [answerModalResult, setAnswerModalResult] = useState<any[]>();
  const location = useLocation();
  const id = location.search.split('?id=')[1];
  const [excelData, setExcelData] = useState<any[]>([]);
  const [listExcelData, setListExcelData] = useState<any[]>([]);

  const onAnswerModalOpen = (index: number) => () => {
    setAnswerModalResult(results[index]?.result);
    setAnswerModalVisible(true);
  };

  const onAnswerModalCancel = () => {
    setAnswerModalVisible(false);
  };

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
    commonAxios({
      url: `toeic-exams/${id}/submissions`,
      method: 'GET',
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setResults((prev) => [...prev, ...res.data]);
        const listExcelDataCandidate = (res.data.map((entry: any) => {
          let gradingTable: any = {}
          entry.result.forEach((val: any) => {
            gradingTable[`pb ${val.ordering}`] = val.actual
          })

          return ({
            name: entry.student.name,
            etc: entry.etc,
            ...(gradingTable)
          })
        }));

        if (listExcelDataCandidate.length > 0) {
          let answer: any = {...listExcelDataCandidate[0]}
          answer.name = '정답'
          answer.etc = ''
          res.data[0].result.forEach((val: any) => {
            answer[`pb ${val.ordering}`] = val.expected
          })
          setListExcelData([answer, ...listExcelDataCandidate])
        } else {
          setListExcelData(listExcelDataCandidate)
        }
        let newData: any[] = [];
        res.data.forEach((value2: any) => {
          let part1 = 0;
          let part2 = 0;
          let part3 = 0;
          let part4 = 0;
          let part5 = 0;
          let part6 = 0;
          let part7 = 0;
          let grade = '';
          let gradeClass = '';
          if (value2.etc.split('/')[1]) {
            grade = value2.etc.split('/')[0];
            gradeClass = value2.etc.split('/')[1];
          }

          value2.result.forEach((value3: any, index: number) => {
            if (index >= 0 && index < 6) {
              part1 += value3.accepted ? 5 : 0;
            } else if (index >= 6 && index < 31) {
              part2 += value3.accepted ? 5 : 0;
            } else if (index >= 31 && index < 70) {
              part3 += value3.accepted ? 5 : 0;
            } else if (index >= 70 && index < 100) {
              part4 += value3.accepted ? 5 : 0;
            } else if (index >= 100 && index < 130) {
              part5 += value3.accepted ? 5 : 0;
            } else if (index >= 130 && index < 146) {
              part6 += value3.accepted ? 5 : 0;
            } else if (index >= 146 && index < 200) {
              part7 += value3.accepted ? 5 : 0;
            }
          });

          newData = [
            ...newData,
            {
              name: value2.student.username,
              grade,
              gradeClass,
              part1,
              part2,
              part3,
              part4,
              part5,
              part6,
              part7,
              lc: part1 + part2 + part3 + part4,
              rc: part5 + part6 + part7,
            },
          ];
        });
        setExcelData(newData);
        setHistorys((prev) => [
          ...prev,
          ...res.data.map((value: any, index: number) => {
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
              duration: value.duration,
              score: value.score,
              exam_id: value.toeic_exam.material_name,
              date: moment(value.created_at).format('YYYY-MM-DD'),
              ...answerList,
              answerNumberList,
            };
          }),
        ]);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  const dayWidth = 6000 / 200;

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
            a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
        },
      ],
    },
    {
      title: '맞은 문제',
      dataIndex: `answerNumberList`,
      key: `answerNumberList`,
      render: renderAnswerNumber,
    },
  ];

  return (
    <Root>
      <TitleTypo level={2}>토익 응시 기록</TitleTypo>
      <JsonToExcel
        title='성적표 Excel Download'
        data={excelData}
        fileName={`toeic_exam_${id}_scoreboard`}
      />
      <br/>
      <JsonToExcel
        title="응시기록 Excel Download"
        data={listExcelData}
        fileName={`toeic_exam_${id}_submissions`}
      />
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

export default ToeicExamHistory;
