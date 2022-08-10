import React, { useRef } from 'react';
import {
  PrintContainer,
  Root,
  StudentInfoContentContainer,
  StudentInfoContentTypo,
  StudentInfoContentTypoContainer,
  StudentInfoContentTypoWrapper,
  StudentInfoHeaderContainer,
  StudentInfoHeaderTypo,
  StudentInfoHeaderTypoWrapper,
  TitleContainer,
  TitleLogoImg,
  TitleTypo,
} from './styled';
import ReactToPrint from 'react-to-print';
import { Button } from 'antd';
import logo from 'assets/images/logo.png';

const ScorePrint = () => {
  const printRef = useRef<any>();

  return (
    <Root>
      <ReactToPrint
        trigger={() => <Button>프린트하기</Button>}
        content={() => printRef.current}
      />
      <PrintContainer ref={printRef}>
        <TitleContainer>
          <TitleLogoImg src={logo} />
          <TitleTypo level={2}>
            {'<'} 성적 통지표 {'>'}
          </TitleTypo>
        </TitleContainer>
        <StudentInfoHeaderContainer>
          <StudentInfoHeaderTypoWrapper>
            <StudentInfoHeaderTypo>이름</StudentInfoHeaderTypo>
          </StudentInfoHeaderTypoWrapper>
          <StudentInfoHeaderTypoWrapper>
            <StudentInfoHeaderTypo>반</StudentInfoHeaderTypo>
          </StudentInfoHeaderTypoWrapper>
          <StudentInfoHeaderTypoWrapper>
            <StudentInfoHeaderTypo>선생님</StudentInfoHeaderTypo>
          </StudentInfoHeaderTypoWrapper>
          <StudentInfoHeaderTypoWrapper>
            <StudentInfoHeaderTypo>학원 출석일</StudentInfoHeaderTypo>
          </StudentInfoHeaderTypoWrapper>
          <StudentInfoHeaderTypoWrapper>
            <StudentInfoHeaderTypo>성적표 발송일</StudentInfoHeaderTypo>
          </StudentInfoHeaderTypoWrapper>
        </StudentInfoHeaderContainer>
        <StudentInfoContentContainer>
          <StudentInfoContentTypoWrapper>
            <StudentInfoContentTypo>박채연</StudentInfoContentTypo>
          </StudentInfoContentTypoWrapper>
          <StudentInfoContentTypoWrapper>
            <StudentInfoContentTypo>Chae-yeon</StudentInfoContentTypo>
          </StudentInfoContentTypoWrapper>
          <StudentInfoContentTypoWrapper>
            <StudentInfoContentTypo>M영어A2</StudentInfoContentTypo>
          </StudentInfoContentTypoWrapper>
          <StudentInfoContentTypoContainer>
            <StudentInfoContentTypoWrapper>
              <StudentInfoContentTypo>한국인</StudentInfoContentTypo>
            </StudentInfoContentTypoWrapper>
            <StudentInfoContentTypoWrapper>
              <StudentInfoContentTypo>김국자</StudentInfoContentTypo>
            </StudentInfoContentTypoWrapper>
          </StudentInfoContentTypoContainer>
          <StudentInfoContentTypoContainer>
            <StudentInfoContentTypoWrapper>
              <StudentInfoContentTypo>원어민</StudentInfoContentTypo>
            </StudentInfoContentTypoWrapper>
            <StudentInfoContentTypoWrapper>
              <StudentInfoContentTypo>James</StudentInfoContentTypo>
            </StudentInfoContentTypoWrapper>
          </StudentInfoContentTypoContainer>
          <StudentInfoContentTypoContainer>
            <StudentInfoContentTypoWrapper>
              <StudentInfoContentTypo>1월</StudentInfoContentTypo>
            </StudentInfoContentTypoWrapper>
            <StudentInfoContentTypoWrapper>
              <StudentInfoContentTypo>9일</StudentInfoContentTypo>
            </StudentInfoContentTypoWrapper>
          </StudentInfoContentTypoContainer>
          <StudentInfoContentTypoContainer>
            <StudentInfoContentTypoWrapper>
              <StudentInfoContentTypo>2월</StudentInfoContentTypo>
            </StudentInfoContentTypoWrapper>
            <StudentInfoContentTypoWrapper>
              <StudentInfoContentTypo>10일</StudentInfoContentTypo>
            </StudentInfoContentTypoWrapper>
          </StudentInfoContentTypoContainer>
          <StudentInfoContentTypoWrapper>
            <StudentInfoContentTypo>2022.07.26</StudentInfoContentTypo>
          </StudentInfoContentTypoWrapper>
        </StudentInfoContentContainer>
      </PrintContainer>
    </Root>
  );
};

export default ScorePrint;
