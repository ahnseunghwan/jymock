import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLocation } from 'react-router-dom';
import {
  AnswerButton,
  AnswerButtonTypo,
  AnswerContainer,
  AnswerRoot,
  ContentContainer,
  MenuAudioContainer,
  MenuButton,
  MenuButtonTypo,
  MenuContainer,
  MenuOpenContainer,
  MenuTimerContainer,
  MenuTimerTypo,
  Root,
  SubmitButton,
  SubmitButtonContainer,
  SubmitButtonTypo,
  TitleTypo,
} from './styled';
import sample from 'assets/pdf/sample6.pdf';
import AudioPlayer from 'components/AudioPlayer';
import useTimer from 'hooks/useTimer';
import { convertSecondToToeicTime } from 'utils/time';
import useWindowDimensions from 'hooks/useWindowSize';
import useLoginCheck from 'hooks/useLoginCheck';
import LoginModal from 'systems/LoginModal';
import { onClickLogout } from 'utils/default';
import Problem from 'systems/Problem';

type AnswerType = 'A' | 'B' | 'C' | 'D' | 'NONE';

const ExamViewer = () => {
  const location = useLocation();
  const [answer, setAnswer] = useState<any[]>([]);
  const { isPoint, now, onPause, onStart, timerStatus } = useTimer({
    duration: 7200,
  });
  const { isLogin } = useLoginCheck();
  const [open, setOpen] = useState<boolean>(true);
  const [problemList, setProblemList] = useState<any[]>([]);
  const { height, width } = useWindowDimensions();

  const id = location.search.split('?id=')[1];
  useEffect(() => {
    const legacyAnswer = localStorage.getItem(`exam_${id}`);
    let newAnswer: any[] = [];
    commonAxios({ url: `exams/${id}`, method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setProblemList(res.data.problems);
        if (res.data.problems) {
          newAnswer = res.data.problems.map((problem: any) => [
            ...Array(problem.subproblems.length).fill('NONE'),
          ]);
          if (!!legacyAnswer) {
            let result = window.confirm(
              '기존에 시험을 본 이력이 있습니다. 정보를 가져오시겠습니까?'
            );
            if (result) {
              setAnswer(JSON.parse(legacyAnswer));
            } else {
              setAnswer(newAnswer);
              localStorage.removeItem(`exam_${id}`);
            }
          } else {
            setAnswer(newAnswer);
          }
        }
      } else {
        alert('오류');
      }
    });
    onStart();
  }, []);

  const onClickAnswer = (index2: number, index3: number, answer: any) => () => {
    setAnswer((prev) => {
      let newAnswer = [...prev];
      newAnswer[index2][index3] = answer;
      localStorage.removeItem(`exam_${id}`);
      localStorage.setItem(`exam_${id}`, JSON.stringify(newAnswer));
      return newAnswer;
    });
  };

  const handleOpen = (value: 'OPEN' | 'CLOSE' | 'TOGGLE') => () => {
    if (value === 'OPEN') {
      setOpen(true);
      return;
    }
    if (value === 'CLOSE') {
      setOpen(false);
      return;
    }
    setOpen((prev) => !prev);
    return;
  };

  if (!isLogin) {
    return <LoginModal />;
  }

  const onClickSubmit = () => {
    const userId = localStorage.getItem('user_id') as any;
    let newAnswer: any[] = [];
    let count = 1;

    answer.forEach((value, index) => {
      value.forEach((value2: any) => {
        newAnswer.push({
          answer: value === 'NONE' ? '' : value2,
          ordering: count,
        });
        count++;
      });
    });

    commonAxios({
      url: `exams/${id}/submit`,
      method: 'POST',
      data: { student: +userId, submitted_answer: newAnswer },
    }).then((res) => {
      alert(`시험 결과 : ${res.data.score}점`);
      localStorage.removeItem(`exam_${id}`);
      window.location.reload();
    });
  };

  return (
    <Root>
      <>
        <ContentContainer style={{ width: width > 1000 ? '1000px' : width }}>
          {problemList.map((problemData, index: number) => (
            <Problem {...problemData} no={index + 1} key={`problem_${index}`} />
          ))}
        </ContentContainer>
        {open ? (
          <MenuContainer>
            <MenuButton onClick={handleOpen('CLOSE')}>
              <MenuButtonTypo>메뉴 접기</MenuButtonTypo>
            </MenuButton>
            <MenuButton onClick={onClickLogout} style={{ marginTop: '5px' }}>
              <MenuButtonTypo>로그아웃</MenuButtonTypo>
            </MenuButton>
            {/* <MenuTimerContainer>
                <MenuTimerTypo isPoint={isPoint}>
                  {convertSecondToToeicTime(now)}
                </MenuTimerTypo>
              </MenuTimerContainer> */}
            {/* <MenuAudioContainer>
                <AudioPlayer src={audioFile} name='음성 파일' />
              </MenuAudioContainer> */}
            <AnswerRoot>
              {answer.map((submissions, index) =>
                submissions.map((value: any, index2: number) => (
                  <AnswerContainer key={`answer_${index}_${index2}`}>
                    <AnswerButtonTypo
                      style={{
                        width: '75px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginRight: '10px',
                      }}
                    >
                      {index + 1}-{index2 + 1}.
                    </AnswerButtonTypo>
                    <AnswerButton
                      isPoint={value === '1'}
                      onClick={onClickAnswer(index, index2, '1')}
                    >
                      <AnswerButtonTypo>1</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === '2'}
                      onClick={onClickAnswer(index, index2, '2')}
                    >
                      <AnswerButtonTypo>2</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === '3'}
                      onClick={onClickAnswer(index, index2, '3')}
                    >
                      <AnswerButtonTypo>3</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === '4'}
                      onClick={onClickAnswer(index, index2, '4')}
                    >
                      <AnswerButtonTypo>4</AnswerButtonTypo>
                    </AnswerButton>
                  </AnswerContainer>
                ))
              )}
            </AnswerRoot>
            <SubmitButtonContainer>
              <SubmitButton onClick={onClickSubmit}>
                <SubmitButtonTypo>제출하기</SubmitButtonTypo>
              </SubmitButton>
            </SubmitButtonContainer>
          </MenuContainer>
        ) : (
          <MenuOpenContainer>
            <MenuButton onClick={handleOpen('OPEN')}>
              <MenuButtonTypo>메뉴 열기</MenuButtonTypo>
            </MenuButton>
          </MenuOpenContainer>
        )}
      </>
    </Root>
  );
};

export default ExamViewer;
