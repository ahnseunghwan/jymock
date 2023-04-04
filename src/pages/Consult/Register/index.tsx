import { Input } from 'antd';
import { message } from 'antd';
import { commonAxios } from 'api/common';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ContentButton,
  ContentButtonTypo,
  ContentContainer,
  ContentInput,
  ContentInputColumnContainer,
  ContentInputContainer,
  Root,
  TitleTypo,
  ContentInputArea,
  ContentSelect,
  ContentSelectOption,
} from './styled';

const today = new Date();

const ConsultRegister = () => {
  const [content, setContent] = useState<string>('');
  const [studentList, setStudentList] = useState<any[]>([]);
  const [lecturerList, setLecturerList] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>();
  const [selectedLecturer, setSelectedLecturer] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    commonAxios({ url: 'students/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setStudentList(res.data);
      } else {
        alert('서버 오류');
      }
    });
    commonAxios({ url: 'lecturers/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setLecturerList(res.data);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  const onClickSubmit = () => {
    if (!searchValue) {
      message.error('학생 이름을 입력하세요.');
      return;
    }
    if (!selectedLecturer) {
      message.error('선생님을 선택해주세요.');
      return;
    }
    const data = {
      content,
      student: searchValue,
      lecturer: selectedLecturer,
      consulted_at: moment(today).format('YYYY-MM-DD'),
    };
    commonAxios({ url: 'consults/create', method: 'POST', data }).then(
      (res) => {
        if (res.status >= 200 && res.status < 300) {
          alert('성공적으로 등록되었습니다.');
          window.location.reload();
        } else {
          alert('서버 오류');
        }
      }
    );
  };

  return (
    <Root>
      
      <TitleTypo level={2}>상담 기록 등록</TitleTypo>
      <ContentContainer>
      <Input
        placeholder="학생 검색"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        style={{ marginTop: `10px`, width: '10rem', textAlign: 'center' }}
      />
        <ContentSelect
          placeholder='선생님 선택'
          onChange={(value) => setSelectedLecturer(value)}
        >
          {lecturerList.map((lecture, index) => (
            <ContentSelectOption
              value={lecture.id}
              key={`lecture_${lecture.id}`}
            >
              {lecture.name}
            </ContentSelectOption>
          ))}``
        </ContentSelect>
        <ContentInputArea
          placeholder='상담 내용을 입력하세요.'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ContentButton onClick={onClickSubmit}>
          <ContentButtonTypo>등록하기</ContentButtonTypo>
        </ContentButton>
      </ContentContainer>
    </Root>
  );
};

export default ConsultRegister;
