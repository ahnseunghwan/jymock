import { Button, Input, Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1890ff22;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vw;
`;

export const TitleTypo = styled(Typography)`
  &&& {
    font-size: 4.5vw;
  }
`;

export const TitleImg = styled.img`
  width: 25vw;
  margin-right: 2vw;
`;

export const InputContainer = styled.div`
  margin-top: 5vw;
`;

export const ContentInput = styled(Input)`
  &&& {
    width: 70vw;
    height: 15vh;
    font-size: 4vw;
    padding: 1vw 5vw;
  }
`;

export const SubmitButton = styled(Button)`
  width: 70vw;
  height: 15vh;
`;

export const SubmitButtonTypo = styled(Typography)`
  &&& {
    font-size: 4vw;
  }
`;
export const KeyboardContainer = styled.div`
  width: 70vw;
  height: 15vh;
`;
