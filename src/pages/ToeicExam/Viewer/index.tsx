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

type AnswerType = 'A' | 'B' | 'C' | 'D' | 'NONE';

const ToeicExamViewer = () => {
  const location = useLocation();
  const [answer, setAnswer] = useState<AnswerType[]>(
    [...Array(200)].fill('NONE')
  );
  const { isPoint, now, onPause, onStart, timerStatus } = useTimer({
    duration: 7200,
  });
  const [cardList, setCardList] = useState<any[]>([]);
  const [numPages, setNumPages] = useState<number>(1);
  const [pdfFileUrl, setPdfFileUrl] = useState<string>('');
  const [audioFile, setAudioFile] = useState<string>('');
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const { height, width } = useWindowDimensions();

  const [open, setOpen] = useState<boolean>(false);

  const handleMenuOpen = (type: 'OPEN' | 'CLOSE' | 'TOGGLE') => {
    if (type === 'OPEN') {
      setMenuOpen(true);
      return;
    }
    if (type === 'CLOSE') {
      setMenuOpen(false);
      return;
    }
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const id = location.search.split('?id=')[1];
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    commonAxios({ url: `toeic-exams/${id}`, method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setPdfFileUrl(res.data.problem_sheet);
        setAudioFile(res.data.audio_file);
      } else {
        alert('오류');
      }
    });
    onStart();
  }, []);

  const onClickAnswer = (id: number, answer: AnswerType) => () => {
    setAnswer((prev) =>
      prev.map((value, index) => (id === index ? answer : value))
    );
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

  return (
    <Root>
      {pdfFileUrl !== '' && (
        <>
          <Document
            file={sample}
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
                      <AnswerButtonTypo>A</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === 'B'}
                      onClick={onClickAnswer(index, 'B')}
                    >
                      <AnswerButtonTypo>B</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === 'C'}
                      onClick={onClickAnswer(index, 'C')}
                    >
                      <AnswerButtonTypo>C</AnswerButtonTypo>
                    </AnswerButton>
                    <AnswerButton
                      isPoint={value === 'D'}
                      onClick={onClickAnswer(index, 'D')}
                    >
                      <AnswerButtonTypo>D</AnswerButtonTypo>
                    </AnswerButton>
                  </AnswerContainer>
                ))}
              </AnswerRoot>
              <SubmitButtonContainer>
                <SubmitButton>
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

export default ToeicExamViewer;
