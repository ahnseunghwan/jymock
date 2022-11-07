import { Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 475px;
  border: 1px #0003 solid;
  box-sizing: border-box;
  padding: 20px 30px;
`;

export const TitleTypo = styled(Typography.Title)``;

export const DescriptionContainer = styled(Typography)`
  &&& {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1.5px black solid;
    margin-top: 10px;
  }
`;

export const DescriptionTypo = styled(Typography)`
  &&& {
    font-size: 18px;
  }
`;

export const SubproblemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const SubproblemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SubproblemTitleTypo = styled(Typography)`
  &&& {
    font-size: 20px;
  }
`;

export const SubproblemDescriptionTypo = styled(Typography)`
  &&& {
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export const SubproblemCandidateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
`;

export const SubproblemCandidateTypo = styled(Typography)`
  &&& {
    font-size: 14px;
  }
`;

export const AudioContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ProblemImg = styled.img`
  width: 100%;
`;

export const Blank = styled.span`
  width: 80px;
  height: 20px;
  border: 1px #333 solid;
`;

export const Inline = styled.span`
  display: inline;
`;
