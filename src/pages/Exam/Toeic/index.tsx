import React, { useState } from 'react';
import {
  Container,
  PdfContainer,
  ResponseContainer,
  ResponseDescriptionTypo,
  ResponseTitleContainer,
  ResponseTitleTypo,
  Root,
} from './styled';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import sample1 from 'assets/pdf/sample5.pdf';
import Correct from 'components/Correct';
import ToeicCorrect from 'systems/ToeicCorrect';
import ReactAudioPlayer from 'react-audio-player';
import useTimer from 'hooks/useTimer';
import { useEffect } from 'react';
import { convertSecondToToeicTime } from 'utils/time';

const ToeicExam = () => {
  const [loading, setLoading] = useState<'PDF_LOADING' | 'LOADING' | 'NONE'>(
    'PDF_LOADING'
  );

  const onPdfLoadSuccess = () => {
    setLoading('NONE');
  };

  const [correctList, setCorrectList] = useState([...Array(200).fill(null)]);
  const onClickCorrect = (id: number) => (value: 'A' | 'B' | 'C' | 'D') => () =>
    setCorrectList((prev) =>
      prev.map((item, index) => (index === id ? value : item))
    );
  const endTime = 80;
  const { now, isPoint, timerStatus, onStart } = useTimer({
    duration: endTime,
  });

  useEffect(() => {
    onStart();
  }, []);

  useEffect(() => {
    if (timerStatus === 'END') {
      alert('시험 시간이 종료되었습니다.');
    }
  }, [timerStatus]);

  return (
    <Root>
      <Container>
        <Document file={sample1} onLoadSuccess={onPdfLoadSuccess}>
          <PdfContainer>
            <Page width={720} pageNumber={2} />
            <Page width={720} pageNumber={3} />
          </PdfContainer>
        </Document>
        <ResponseContainer>
          <ResponseTitleContainer>
            <ResponseTitleTypo>토익 Actual test OMR 답안지</ResponseTitleTypo>
            <ResponseDescriptionTypo isPoint={isPoint} onClick={onStart}>
              {convertSecondToToeicTime(endTime - now)}
            </ResponseDescriptionTypo>
          </ResponseTitleContainer>
          {correctList.map((correctItem, index) => (
            <ToeicCorrect
              id={index}
              onClick={onClickCorrect(index)}
              value={correctItem}
              key={`correct_list_${index}`}
            />
          ))}
        </ResponseContainer>
      </Container>
    </Root>
  );
};

export default ToeicExam;
