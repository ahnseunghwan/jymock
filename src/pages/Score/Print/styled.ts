import { Typography } from 'antd';
import styled from 'styled-components';

const Root = styled.div`
  width: 1000px;
`;

const PrintContainer = styled.div`
  width: 800px;
  height: 1130px;
  background: #0002;
  border: 1px #000 solid;
  padding: 20px;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TitleLogoImg = styled.img`
  width: 180px;
  position: absolute;
  top: 0;
  left: 0;
`;

const TitleTypo = styled(Typography.Title)``;

const cellWidth = 94.5;
const cellHeight = 30;

const StudentInfoHeaderContainer = styled.div`
  width: 100%;
  height: ${cellHeight}px;
  display: grid;
  margin-top: 20px;
  grid-template-columns: ${cellWidth * 2}px ${cellWidth}px ${cellWidth * 2}px ${cellWidth *
    2}px ${cellWidth}px;
`;

const StudentInfoHeaderTypoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px #000 solid;
`;

const StudentInfoHeaderTypo = styled(Typography)`
  &&& {
    font-weight: bold;
  }
`;

const StudentInfoContentContainer = styled.div`
  width: 100%;
  height: ${cellHeight * 2}px;
  display: grid;
  grid-template-columns: ${cellWidth}px ${cellWidth}px ${cellWidth}px ${cellWidth}px ${cellWidth}px ${cellWidth}px ${cellWidth}px ${cellWidth}px;
`;

const StudentInfoContentTypoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StudentInfoContentTypoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px #000 solid;
`;

const StudentInfoContentTypo = styled(Typography)`
  &&& {
  }
`;

export {
  Root,
  PrintContainer,
  TitleContainer,
  TitleLogoImg,
  TitleTypo,
  StudentInfoHeaderContainer,
  StudentInfoHeaderTypoWrapper,
  StudentInfoHeaderTypo,
  StudentInfoContentContainer,
  StudentInfoContentTypoContainer,
  StudentInfoContentTypoWrapper,
  StudentInfoContentTypo,
};
