import { UploadOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import { commonAxios } from 'api/common';
import React, { useState } from 'react';
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
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [pdfFile, setPdfFile] = useState<any>();
  const [profileImg, setProfileImg] = useState<any>();
  const [profileSrc, setProfileSrc] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const encodeFileToBase64 = (fileBlob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setProfileSrc(reader.result);
        resolve(() => {});
      };
    });
  };

  const onClickCancel = () => {
    window.location.reload();
  };

  const onClickSubmit = () => {
    if (name === '') {
      setErrorMessage('이름을 입력해주세요.');
      return;
    }
    if (!pdfFile) {
      setErrorMessage('교재 파일을 입력해주세요.');
      return;
    }
    if (!profileImg) {
      setErrorMessage('교재 썸네일을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', name);
    formData.append('description', description);
    formData.append('thumbnail', profileImg);
    formData.append('file', pdfFile);

    commonAxios({
      url: 'material/upload',
      method: 'POST',
      data: formData,
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        alert('성공');
        window.location.reload();
      } else {
        alert('실패');
      }
    });
  };

  return (
    <Root>
      <TitleTypo level={2}> 교재 등록</TitleTypo>
      <ContentContainer>
        {errorMessage !== '' && (
          <Alert
            type='error'
            message={errorMessage}
            showIcon={true}
            style={{ marginBottom: '20px' }}
          />
        )}
        <ContentInputContainer>
          <ContentInputColumnContainer>
            <ContentInput
              addonBefore='교재명 *'
              required={true}
              placeholder='교재명을 입력하세요.'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ContentInput
              addonBefore='설명'
              required={true}
              placeholder='설명을 입력하세요.'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type='file'
              accept='application/pdf'
              onChange={(e: any) => setPdfFile(e.target.files[0])}
            />
            <ContentInputColumnButtonContainer>
              <ContentButton type='primary' onClick={onClickCancel}>
                <ContentButtonTypo style={{ color: 'white' }}>
                  취소
                </ContentButtonTypo>
              </ContentButton>
              <ContentButton onClick={onClickSubmit}>
                <ContentButtonTypo>저장</ContentButtonTypo>
              </ContentButton>
            </ContentInputColumnButtonContainer>
          </ContentInputColumnContainer>
          <ContentImageContainer>
            <ContentImage src={profileSrc} />
            <input
              type='file'
              accept='image/jpg,impge/png,image/jpeg,image/gif'
              onChange={(e: any) => {
                setProfileImg(e.target.files[0]);
                encodeFileToBase64(e.target.files[0]);
              }}
            />
          </ContentImageContainer>
        </ContentInputContainer>
      </ContentContainer>
    </Root>
  );
};

export default LearningMaterialRegister;
