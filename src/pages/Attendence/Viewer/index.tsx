import React, { useState } from 'react';
import {
  ContentInput,
  InputContainer,
  KeyboardContainer,
  Root,
  SubmitButton,
  SubmitButtonTypo,
  TitleContainer,
  TitleImg,
  TitleTypo,
} from './styled';
import logo from 'assets/images/logo.png';
import { commonAxios } from 'api/common';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const AttendenceViewer = () => {
  const [username, setUsername] = useState<string>('');

  const onSubmit = () => {
    commonAxios({ url: `students/${username}/exit`, method: 'PATCH' })
      .then((res) => {
        alert('하원 처리가 완료되었습니다.');
        window.location.reload();
      })
      .catch((err) => {
        if (
          err.response.data &&
          err.response.data[0] === '등원하지 않은 학생입니다.'
        ) {
          commonAxios({
            url: `students/${username}/entry`,
            method: 'PATCH',
          })
            .then((res2) => {
              alert('등원 처리가 완료되었습니다.');
              window.location.reload();
            })
            .catch((err2) => {});
        }
      });
  };

  const onChange = (input: any) => {
    setUsername(input);
  };

  const onKeyPress = (button: any) => {
    console.log('Button pressed', button);
  };

  return (
    <Root>
      <TitleContainer>
        <TitleImg src={logo} />
        <TitleTypo>출결 관리</TitleTypo>
      </TitleContainer>
      <InputContainer>
        <ContentInput
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='아이디를 입력해주세요.'
          disabled
        />
      </InputContainer>
      {/* <SubmitButton onClick={onSubmit}>
        <SubmitButtonTypo>출석 확인</SubmitButtonTypo>
      </SubmitButton> */}
      <KeyboardContainer>
        <Keyboard
          value={username}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </KeyboardContainer>
    </Root>
  );
};

export default AttendenceViewer;
