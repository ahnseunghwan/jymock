import { Alert, Image } from 'antd';
import React from 'react';
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

const StudentRegister = () => {
  return (
    <Root>
      <TitleTypo level={2}> 원생 등록</TitleTypo>
      <ContentContainer>
        <Alert
          type='error'
          message='이름을 입력해주세요.'
          showIcon={true}
          style={{ marginBottom: '20px' }}
        />
        <ContentInputContainer>
          <ContentInputColumnContainer>
            <ContentInput
              addonBefore='이름 *'
              required={true}
              placeholder='이름을 입력하세요.'
            />
            <ContentInput
              addonBefore='아이디 *'
              required={true}
              placeholder='아이디를 입력하세요.'
            />
            <ContentInput
              addonBefore='비밀번호 *'
              required={true}
              placeholder='비밀번호를 입력하세요.'
            />
            <ContentSelect placeholder='클래스 선택'>
              <ContentSelectOption value={1}>파닉스</ContentSelectOption>
              <ContentSelectOption value={2}>파닉스1</ContentSelectOption>
              <ContentSelectOption value={3}>파닉스2</ContentSelectOption>
              <ContentSelectOption value={4}>파닉스3</ContentSelectOption>
            </ContentSelect>
            <ContentInput
              addonBefore='영어 이름'
              placeholder='영어 이름을 입력하세요.'
            />
            <ContentInput
              addonBefore='지원 동기'
              placeholder='지원 동기를 입력하세요.'
            />
            <ContentInput
              addonBefore='학생 HP'
              placeholder='학생 전화번호를 입력하세요.'
            />
            <ContentInput
              addonBefore='학교 명'
              placeholder='학교 명을 입력하세요.'
            />
            <ContentSelect placeholder='학년 선택'>
              <ContentSelectOption value={1}>1학년</ContentSelectOption>
              <ContentSelectOption value={2}>2학년</ContentSelectOption>
              <ContentSelectOption value={3}>3학년</ContentSelectOption>
              <ContentSelectOption value={4}>4학년</ContentSelectOption>
              <ContentSelectOption value={5}>5학년</ContentSelectOption>
              <ContentSelectOption value={6}>6학년</ContentSelectOption>
            </ContentSelect>
            <ContentDatePicker placeholder='생일을 입력하세요.' />
            <ContentSelect placeholder='유형 선택'>
              <ContentSelectOption value={1}>초등</ContentSelectOption>
              <ContentSelectOption value={2}>중등</ContentSelectOption>
              <ContentSelectOption value={3}>고등</ContentSelectOption>
              <ContentSelectOption value={4}>일반인</ContentSelectOption>
            </ContentSelect>
            <ContentSelect placeholder='교과 등록'>
              <ContentSelectOption value={1}>1학년</ContentSelectOption>
            </ContentSelect>
            <ContentInput
              addonBefore='학부모 이름'
              placeholder='학부모 이름을 입력하세요.'
            />
            <ContentInput
              addonBefore='학부모 HP'
              placeholder='학부모 전화번호를 입력하세요.'
            />
            <ContentInput addonBefore='주소' placeholder='주소를 입력하세요.' />
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
              <ContentButtonTypo>사진 선택</ContentButtonTypo>
            </ContentButton>
          </ContentImageContainer>
        </ContentInputContainer>
      </ContentContainer>
    </Root>
  );
};

export default StudentRegister;
