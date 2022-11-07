import { message } from 'antd';
import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';
import {
  Container,
  ContentButton,
  ContentInput,
  ContentTypo,
  Root,
} from './styled';

const UserToeic = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    commonAxios({ url: 'toeic-exams/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setData(res.data);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

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
        <ContentTypo.Title level={2}>토익 시험</ContentTypo.Title>
        {data?.map((value: any) => (
          <ContentButton onClick={onClickButton('TOEIC', value?.id)}>
            {value.material_name}
          </ContentButton>
        ))}
      </Container>
    </Root>
  );
};

export default UserToeic;
