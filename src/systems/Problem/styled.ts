import { Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 475px;
  border: 1px #0003 solid;
  box-sizing: border-box;
  padding: 20px 30px;
`;

export const TitleTypo = styled(Typography.Title)``;

export const DescriptionTypo = styled(Typography)`
  &&& {
    font-size: 24px;
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
