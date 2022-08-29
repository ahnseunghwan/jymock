import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';
import {
  ContentContainer,
  ContentSelect,
  ContentSelectOption,
  ContentTable,
  Root,
  TitleTypo,
} from './styled';

const ConsultSearch = () => {
  const [consultList, setConsultList] = useState<any[]>();
  const [studentList, setStudentList] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>();

  useEffect(() => {
    commonAxios({ url: 'students/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setStudentList(res.data);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  useEffect(() => {
    commonAxios({ url: 'consults/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setConsultList(
          res.data.map((value: any) => {
            return {
              student: value.student.name,
              lecturer: value.lecturer.name,
              consulted_at: value.consulted_at,
              content: value.content,
            };
          })
        );
      } else {
        alert('서버 오류');
      }
    });
  }, []);
  const tableColumns = [
    {
      title: '학생',
      width: 100,
      dataIndex: 'student',
      key: 'student',
      sorter: (a: any, b: any) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    },
    {
      title: '선생님',
      width: 100,
      dataIndex: 'lecturer',
      key: 'lecturer',
    },
    {
      title: '상담 일',
      dataIndex: 'consulted_at',
      key: 'consulted_at',
      width: 120,
      sorter: (a: any, b: any) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    },
    {
      title: '상담 내용',
      dataIndex: 'content',
      key: 'content',
      width: 680,
    },
  ];

  return (
    <Root>
      <TitleTypo level={2}>상담 조회</TitleTypo>
      <ContentSelect
        placeholder='학생 선택'
        onChange={(value) => {
          setSelectedStudent(value);
        }}
        style={{ marginTop: '20px' }}
      >
        {studentList.map((student, index) => (
          <ContentSelectOption
            value={student.name}
            key={`student_${student.id}`}
          >
            {student.name}
          </ContentSelectOption>
        ))}
      </ContentSelect>
      <ContentContainer style={{ marginTop: '40px' }}>
        <ContentTable
          columns={tableColumns}
          dataSource={
            selectedStudent
              ? consultList?.filter(
                  (value) => value.student === selectedStudent
                )
              : consultList
          }
        />
      </ContentContainer>
    </Root>
  );
};

export default ConsultSearch;
