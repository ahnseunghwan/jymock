import { message } from 'antd';
import { commonAxios } from 'api/common';
import useAdminLogin from 'hooks/useAdminLogin';
import React, { useEffect, useState } from 'react';
import {
  LoginContainer,
  LoginInput,
  Root,
  SubmitButton,
  SubmitButtonTypo,
  TitleTypo,
} from './styled';

const AdminLoginModal = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { login } = useAdminLogin();

  return (
    <Root
      visible={true}
      closable={false}
      footer={
        <SubmitButton onClick={login({ username, password })}>
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
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호를 입력해주세요.'
        />
      </LoginContainer>
    </Root>
  );
};

export default AdminLoginModal;
