import { message } from 'antd';
import { commonAxios } from 'api/common';
import React, { useState } from 'react';
import {
  Container,
  ContentButton,
  ContentInput,
  ContentTypo,
  Root,
} from './styled';

const UserMyPage = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onClickSubmit = () => {
    commonAxios({
      url: `available-exams`,
      method: 'POST',
      data: { username: id, password },
    })
      .then((res) => {})
      .catch(() => {
        message.error('등록되지 않은 유저입니다.');
      });
  };

  return (
    <Root>
      <Container>
        <ContentTypo.Title level={2}>숙제, 시험 목록</ContentTypo.Title>
        <ContentInput
          placeholder='아이디'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <ContentInput
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ContentButton type='primary' onClick={onClickSubmit}>
          로그인
        </ContentButton>
      </Container>
    </Root>
  );
};

export default UserMyPage;
