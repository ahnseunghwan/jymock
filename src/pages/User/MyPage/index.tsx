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
  const [data, setData] = useState<any>();

  const onClickSubmit = () => {
    commonAxios({
      url: `available-exams`,
      method: 'POST',
      data: { username: id, password },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        message.error('등록되지 않은 유저입니다.');
      });
  };

  const onClickButton =
    (type: 'ASSIGNMNET' | 'EXAM' | 'MOCKEXAM' | 'TOEIC', id: string) => () => {
      if (type === 'ASSIGNMNET') {
        window.open('/assignment/viewer/?id=' + id);
        return;
      }
      if (type === 'EXAM') {
        window.open('/exam/viewer/?id=' + id);
        return;
      }
      if (type === 'MOCKEXAM') {
        window.open('/mock_exam/viewer/?id=' + id);
        return;
      }
      if (type === 'TOEIC') {
        window.open('/toeic_exam/viewer/?id=' + id);
        return;
      }
    };

  return (
    <Root>
      <Container>
        {!!data ? (
          <>
            <ContentTypo.Title level={2}>숙제</ContentTypo.Title>
            {data?.assignments?.map((value: any) => (
              <ContentButton onClick={onClickButton('ASSIGNMNET', value?.id)}>
                {value.material_name}
              </ContentButton>
            ))}
            <ContentTypo.Title level={2}>시험</ContentTypo.Title>
            {data?.exams?.map((value: any) => (
              <ContentButton onClick={onClickButton('EXAM', value?.id)}>
                {value.material_name}
              </ContentButton>
            ))}
            <ContentTypo.Title level={2}>토익 시험</ContentTypo.Title>
            {data?.toeic_exams?.map((value: any) => (
              <ContentButton onClick={onClickButton('TOEIC', value?.id)}>
                {value.material_name}
              </ContentButton>
            ))}
            <ContentTypo.Title level={2}>모의 시험</ContentTypo.Title>
            {data?.toeic_mock_exams?.map((value: any) => (
              <ContentButton onClick={onClickButton('MOCKEXAM', value?.id)}>
                {value.material_name}
              </ContentButton>
            ))}
          </>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </Root>
  );
};

export default UserMyPage;
