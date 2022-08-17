import { message } from 'antd';
import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';
import {
  LoginContainer,
  LoginInput,
  Root,
  SubmitButton,
  SubmitButtonTypo,
  TitleTypo,
} from './styled';

const LoginModal = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onClickSubmit = () => {
    commonAxios({
      url: `auth/login`,
      method: 'POST',
      data: { username, password },
    })
      .then((res) => {
        localStorage.setItem('user_id', res.data.user.id);
        window.location.reload();
      })
      .catch(() => {
        message.error('등록되지 않은 유저입니다.');
      });
  };

  return (
    <Root
      visible={true}
      closable={false}
      footer={
        <SubmitButton onClick={onClickSubmit}>
          <SubmitButtonTypo>로그인하기</SubmitButtonTypo>
        </SubmitButton>
      }
    >
      <TitleTypo level={2}>로그인</TitleTypo>
      <LoginContainer>
        <LoginInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='아이디를 입력해주세요.'
        />
        <LoginInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호를 입력해주세요.'
        />
      </LoginContainer>
    </Root>
  );
};

export default LoginModal;
