import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLocation } from 'react-router-dom';
import {
  AnswerButton,
  AnswerButtonTypo,
  AnswerContainer,
  AnswerRoot,
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

type AnswerType = 'A' | 'B' | 'C' | 'D' | 'E' | 'NONE';

const MockExamViewer = () => {
  const location = useLocation();
  const [answer, setAnswer] = useState<AnswerType[]>(
    [...Array(0)].fill('NONE')
  );
  const { isPoint, now, onPause, onStart, timerStatus, setDuration } = useTimer(
    {
      duration: 7200,
    }
  );
  const { isLogin } = useLoginCheck();
  const [cardList, setCardList] = useState<any[]>([]);
  const [numPages, setNumPages] = useState<number>(1);
  const [problemsCount, setProblemsCount] = useState<number>(0);
  const [pdfFileUrl, setPdfFileUrl] = useState<string>('');
  const [audioFile, setAudioFile] = useState<string>('');
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }
  const { height, width } = useWindowDimensions();
  const [open, setOpen] = useState<boolean>(true);

  const id = location.search.split('?id=')[1];
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    commonAxios({ url: `toeic-mock-exams/${id}`, method: 'GET' }).then(
      (res) => {
        if (res.status >= 200 && res.status < 300) {
          setDuration(res.data.duration * 60);
          setPdfFileUrl(res.data.problem_sheet);
          setAudioFile(res.data.audio_file);
          setAnswer([...Array(res.data.problems_count)].fill('NONE'));
        } else {
          alert('오류');
        }
      }
    );
    onStart();
    const legacyAnswer = localStorage.getItem(`toeic_exam_${id}`);
    if (!!legacyAnswer) {
      let result = window.confirm(
        '기존에 시험을 본 이력이 있습니다. 정보를 가져오시겠습니까? 시험 시간은 불러오지 못합니다.'
      );
      if (result) {
        setAnswer(JSON.parse(legacyAnswer));
      } else {
        localStorage.removeItem(`toeic_exam_${id}`);
      }
    }
  }, []);

  const onClickAnswer = (index2: number, answer: AnswerType) => () => {
    setAnswer((prev) => {
      const newAnswer = prev.map((value, index) =>
        index2 === index ? answer : value
      );
      localStorage.removeItem(`toeic_exam_${id}`);
      localStorage.setItem(`toeic_exam_${id}`, JSON.stringify(newAnswer));
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
    const newAnswer = answer.map((value, index) => ({
      answer: value === 'NONE' ? '' : value,
      ordering: index + 1,
    }));
    commonAxios({
      url: `toeic-mock-exams/${id}/submit`,
      method: 'POST',
      data: { student: +userId, submitted_answer: newAnswer, duration: now },
    }).then((res) => {
      alert(`시험 결과 : ${res.data.score}점`);
      localStorage.removeItem(`toeic_exam_${id}`);
      window.location.reload();
    });
  };

  return (
    <Root>
      {pdfFileUrl !== '' && (
        <>
          <Document
            file={`https://cors-proxy-jy-english.herokuapp.com/${pdfFileUrl}`}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
          >
            {[...Array(numPages)].map((value, index) => (
              <Page
                pageNumber={index + 1}
                key={`page_${index}`}
                width={width > 1000 ? 1000 : width}
              />
            ))}
          </Document>
          {open ? (
            <MenuContainer>
              <MenuButton onClick={handleOpen('CLOSE')}>
                <MenuButtonTypo>메뉴 접기</MenuButtonTypo>
              </MenuButton>
              <MenuButton onClick={onClickLogout} style={{ marginTop: '5px' }}>
                <MenuButtonTypo>로그아웃</MenuButtonTypo>
              </MenuButton>
              <MenuTimerContainer>
                <MenuTimerTypo isPoint={isPoint}>
                  {convertSecondToToeicTime(now)}
                </MenuTimerTypo>
              </MenuTimerContainer>
              <MenuAudioContainer>
                <AudioPlayer src={audioFile} name='음성 파일' />
              </MenuAudioContainer>
              <AnswerRoot>
                {answer.map((value, index) => (
                  <AnswerContainer key={`answer_${index}`}>
                    <AnswerButtonTypo
                      style={{
                        width: '55px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginRight: '10px',
                      }}
                    >
                      {index + 1}.
                    </AnswerButtonTypo>
                    <AnswerButton
                      isPoint={value === 'A'}
                      onClick={onClickAnswer(index, 'A')}
                    >
                      <AnswerButtonTypo>1</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === 'B'}
                      onClick={onClickAnswer(index, 'B')}
                    >
                      <AnswerButtonTypo>2</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === 'C'}
                      onClick={onClickAnswer(index, 'C')}
                    >
                      <AnswerButtonTypo>3</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === 'D'}
                      onClick={onClickAnswer(index, 'D')}
                    >
                      <AnswerButtonTypo>4</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === 'E'}
                      onClick={onClickAnswer(index, 'E')}
                    >
                      <AnswerButtonTypo>5</AnswerButtonTypo>
                    </AnswerButton>
                  </AnswerContainer>
                ))}
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
      )}
    </Root>
  );
};

export default MockExamViewer;
