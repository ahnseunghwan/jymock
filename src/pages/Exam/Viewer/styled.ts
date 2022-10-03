import { Button, DatePicker, Image, Input, Select, Typography } from 'antd';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 50px;
`;

const TitleTypo = styled(Typography.Title)`
  &&& {
    color: #14449a;
  }
`;

const MenuButton = styled(Button)``;

const MenuButtonTypo = styled(Typography)``;

const MenuContainer = styled.div`
  width: 340px;
  height: 100vh;
  background: #0002;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
`;

const MenuAudioContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const MenuTimerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

type MenuTimerTypoProps = {
  isPoint: boolean;
};

const MenuTimerTypo = styled(Typography)<MenuTimerTypoProps>`
  &&& {
    font-size: 24px;
    font-weight: bold;
    ${(props) => props.isPoint && `color: #f00;`}
  }
`;

const AnswerRoot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin-top: 20px;
`;

const AnswerContainer = styled.div`
  width: 290px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

type AnswerButtonProps = {
  isPoint: boolean;
};

const AnswerButton = styled(Button)<AnswerButtonProps>`
  &&& {
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    ${(props) => props.isPoint && `background: #000;`}
  }
`;

const AnswerButtonTypo = styled(Typography)`
  &&& {
    font-size: 24px;
    font-weight: bold;
  }
`;

const SubmitButtonContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`;

const SubmitButton = styled(Button)`
  &&& {
    width: 100%;
    height: 40px;
  }
`;

const SubmitButtonTypo = styled(Typography)`
  &&& {
    font-size: 18px;
  }
`;

const MenuOpenContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin-bottom: 50px;
`;

export {
  Root,
  TitleTypo,
  MenuContainer,
  MenuButton,
  MenuButtonTypo,
  MenuAudioContainer,
  MenuTimerContainer,
  MenuTimerTypo,
  AnswerContainer,
  AnswerButton,
  AnswerButtonTypo,
  AnswerRoot,
  SubmitButtonContainer,
  SubmitButton,
  SubmitButtonTypo,
  MenuOpenContainer,
  ContentContainer,
};
