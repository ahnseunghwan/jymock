import { Alert, Image } from 'antd';
import { commonAxios } from 'api/common';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Root,
  TitleTypo,
  ContentInput,
  ContentContainer,
  ContentInputContainer,
  ContentInputColumnContainer,
  ContentSelect,
  ContentSelectOption,
  ContentImageContainer,
  ContentImage,
  ContentButton,
  ContentButtonTypo,
  ContentDatePicker,
  ContentInputColumnButtonContainer,
} from './styled';

const today = new Date();

const StudentRegister = () => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [englishName, setEnglishName] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [birth, setBirth] = useState<any>(today);
  const [type, setType] = useState<string>('');
  const [parentName, setParentName] = useState<string>('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [profileImg, setProfileImg] = useState<any>();
  const [profileSrc, setProfileSrc] = useState<any>();

  const onReset = () => {
    window.location.reload();
  };

  const onSubmit = () => {
    if (name === '') {
      setErrorMessage('이름을 입력해주세요.');
      return;
    }
    if (id === '') {
      setErrorMessage('아이디를 입력해주세요.');
      return;
    }
    if (password === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('password', password);
    formData.append('username', id);
    formData.append('name', name);
    formData.append('parent_name', parentName);
    formData.append('parent_phone_number', parentPhoneNumber);
    formData.append('english_name', englishName);
    formData.append('reason_for_application', reason);
    formData.append('student_phone_number', phoneNumber);
    formData.append('school_name', schoolName);
    formData.append('grade', grade);
    formData.append('birth', dayjs(birth).format('YYYY-MM-DD'));
    formData.append('address', address);
    formData.append('student_type', type);
    if (profileImg) {
      formData.append('profile_image', profileImg);
    }

    commonAxios({
      url: 'students/',
      method: 'POST',
      data: formData,
    }).then((res) => {
      console.log({ res });
      if (res.status >= 200 && res.status < 300) {
        alert('원생 등록에 성공하였습니다.');
        window.location.reload();
      } else {
        setErrorMessage('원생 등록에 실패하였습니다. (서버 문제)');
      }
    });
  };

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

  return (
    <Root>
      <TitleTypo level={2}> 원생 등록</TitleTypo>
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
              addonBefore='이름 *'
              required={true}
              placeholder='이름을 입력하세요.'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ContentInput
              addonBefore='아이디 *'
              required={true}
              placeholder='아이디를 입력하세요.'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <ContentInput
              addonBefore='비밀번호 *'
              required={true}
              placeholder='비밀번호를 입력하세요.'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <ContentSelect placeholder='클래스 선택'>
              <ContentSelectOption value={1}>파닉스</ContentSelectOption>
              <ContentSelectOption value={2}>파닉스1</ContentSelectOption>
              <ContentSelectOption value={3}>파닉스2</ContentSelectOption>
              <ContentSelectOption value={4}>파닉스3</ContentSelectOption>
            </ContentSelect> */}
            <ContentInput
              addonBefore='영어 이름'
              placeholder='영어 이름을 입력하세요.'
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
            />
            <ContentInput
              addonBefore='지원 동기'
              placeholder='지원 동기를 입력하세요.'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <ContentInput
              addonBefore='학생 HP'
              placeholder='학생 전화번호를 입력하세요.'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <ContentInput
              addonBefore='학교 명'
              placeholder='학교 명을 입력하세요.'
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
            <ContentSelect
              placeholder='학년 선택'
              value={grade}
              onChange={(value: any) => setGrade(value)}
            >
              <ContentSelectOption value={1}>1학년</ContentSelectOption>
              <ContentSelectOption value={2}>2학년</ContentSelectOption>
              <ContentSelectOption value={3}>3학년</ContentSelectOption>
              <ContentSelectOption value={4}>4학년</ContentSelectOption>
              <ContentSelectOption value={5}>5학년</ContentSelectOption>
              <ContentSelectOption value={6}>6학년</ContentSelectOption>
            </ContentSelect>
            <ContentDatePicker
              placeholder='생일을 입력하세요.'
              value={moment(birth)}
              onChange={(e) => setBirth(moment(e))}
            />
            <ContentSelect
              placeholder='유형 선택'
              value={type}
              onChange={(value: any) => setType(value)}
            >
              <ContentSelectOption value={'elementary-school'}>
                초등
              </ContentSelectOption>
              <ContentSelectOption value={'middle-school'}>
                중등
              </ContentSelectOption>
              <ContentSelectOption value={'high-school'}>
                고등
              </ContentSelectOption>
              <ContentSelectOption value={'office-worker'}>
                일반인
              </ContentSelectOption>
            </ContentSelect>
            {/* <ContentSelect placeholder='교과 등록'>
              <ContentSelectOption value={1}>1학년</ContentSelectOption>
            </ContentSelect> */}
            <ContentInput
              addonBefore='학부모 이름'
              placeholder='학부모 이름을 입력하세요.'
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />
            <ContentInput
              addonBefore='학부모 HP'
              placeholder='학부모 전화번호를 입력하세요.'
              value={parentPhoneNumber}
              onChange={(e) => setParentPhoneNumber(e.target.value)}
            />
            <ContentInput
              addonBefore='주소'
              placeholder='주소를 입력하세요'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <ContentInputColumnButtonContainer>
              <ContentButton type='primary' onClick={onReset}>
                <ContentButtonTypo style={{ color: 'white' }}>
                  취소
                </ContentButtonTypo>
              </ContentButton>
              <ContentButton onClick={onSubmit}>
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

export default StudentRegister;
