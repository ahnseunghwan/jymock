import { message } from 'antd';
import { commonAxios } from 'api/common';
import React, { useState } from 'react';
import {
  ContentButton,
  ContentContainer,
  ContentInput,
  InputContainer,
  Root,
  TitleTypo,
} from './styled';

const StudentGroupRegister = () => {
  const defaultData = { name: '', id: '', password: '' };
  const [data, setData] = useState<any[]>([
    { ...defaultData },
    { ...defaultData },
  ]);

  const onClickAdd = () => {
    setData((prev) => [...prev, { ...defaultData }]);
  };

  const onChange =
    (type: 'name' | 'id' | 'password', index: number) => (e: any) => {
      setData((prev) =>
        prev.map((value, index2) =>
          index2 === index ? { ...value, [type]: e.target.value } : value
        )
      );
    };

  const onSubmit = () => {
    data.forEach((value, index: number) => {
      const formData = new FormData();
      formData.append('password', value.password);
      formData.append('username', value.id);
      formData.append('name', value.name);

      commonAxios({
        url: 'students/',
        method: 'POST',
        data: formData,
      })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            message.info('원생 등록에 성공하였습니다.');
          } else {
            message.error('원생 등록에 실패하였습니다.');
          }
        })
        .catch((err) => {
          message.error(
            `${index + 1} 번째 ${JSON.stringify(err.response.data)}`
          );
        });
    });
  };

  return (
    <Root>
      <TitleTypo level={2}> 원생 단체 등록</TitleTypo>
      <ContentContainer>
        {data?.map((value, index) => {
          return (
            <InputContainer key={`input_container_${index}`}>
              <ContentInput
                onChange={onChange('name', index)}
                value={value.name}
                addonBefore='이름'
              />
              <ContentInput
                onChange={onChange('id', index)}
                value={value.id}
                addonBefore='아이디'
              />
              <ContentInput
                onChange={onChange('password', index)}
                value={value.password}
                addonBefore='비밀번호'
              />
            </InputContainer>
          );
        })}
        <ContentButton onClick={onClickAdd}>인원 추가</ContentButton>
        <ContentButton onClick={onSubmit} type='primary'>
          저장
        </ContentButton>
      </ContentContainer>
    </Root>
  );
};

export default StudentGroupRegister;
