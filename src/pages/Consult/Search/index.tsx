import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';
import { ContentContainer, ContentTable, Root, TitleTypo } from './styled';

const ConsultSearch = () => {
  const [consultList, setConsultList] = useState<any[]>();

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
      <ContentContainer>
        <ContentTable columns={tableColumns} dataSource={consultList} />
      </ContentContainer>
    </Root>
  );
};

export default ConsultSearch;
