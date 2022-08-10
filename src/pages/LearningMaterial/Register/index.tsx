import { UploadOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React from 'react';
import {
  Root,
  TitleTypo,
  ContentContainer,
  ContentInputContainer,
  ContentInputColumnContainer,
  ContentInput,
  ContentSelect,
  ContentSelectOption,
  ContentDatePicker,
  ContentInputColumnButtonContainer,
  ContentButton,
  ContentButtonTypo,
  ContentImageContainer,
  ContentImage,
  ContentUpload,
} from './styled';

const LearningMaterialRegister = () => {
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },

    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} 파일 업로드에 성공했습니다.`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 파일 업로드에 실패했습니다.`);
      }
    },
  };
  return (
    <Root>
      <TitleTypo level={2}> 교재 등록</TitleTypo>
      <ContentContainer>
        <Alert
          type='error'
          message='교재명을 입력해주세요.'
          showIcon={true}
          style={{ marginBottom: '20px' }}
        />
        <ContentInputContainer>
          <ContentInputColumnContainer>
            <ContentInput
              addonBefore='교재명 *'
              required={true}
              placeholder='교재명을 입력하세요.'
            />
            <ContentInput
              addonBefore='아이디 *'
              required={true}
              placeholder='아이디를 입력하세요.'
            />

            <ContentUpload {...props}>
              <ContentButton icon={<UploadOutlined />}>
                교재 업로드
              </ContentButton>
            </ContentUpload>
            <ContentInputColumnButtonContainer>
              <ContentButton type='primary'>
                <ContentButtonTypo style={{ color: 'white' }}>
                  취소
                </ContentButtonTypo>
              </ContentButton>
              <ContentButton>
                <ContentButtonTypo>저장</ContentButtonTypo>
              </ContentButton>
            </ContentInputColumnButtonContainer>
          </ContentInputColumnContainer>
          <ContentImageContainer>
            <ContentImage src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />
            <ContentButton style={{ width: '100%' }}>
              <ContentButtonTypo>표지 선택</ContentButtonTypo>
            </ContentButton>
          </ContentImageContainer>
        </ContentInputContainer>
      </ContentContainer>
    </Root>
  );
};

export default LearningMaterialRegister;
