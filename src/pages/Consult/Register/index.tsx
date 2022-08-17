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
    if (!selectedStudent) {
      message.error('학생을 선택해주세요.');
      return;
    }
    if (!selectedLecturer) {
      message.error('선생님을 선택해주세요.');
      return;
    }
    const data = {
      content,
      student: selectedStudent,
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
        <ContentSelect
          placeholder='학생 선택'
          onChange={(value) => setSelectedStudent(value)}
        >
          {studentList.map((student, index) => (
            <ContentSelectOption
              value={student.id}
              key={`student_${student.id}`}
            >
              {student.name}
            </ContentSelectOption>
          ))}
        </ContentSelect>
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
          ))}
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
