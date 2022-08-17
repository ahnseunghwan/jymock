import { commonAxios } from 'api/common';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ContentButton,
  ContentButtonTypo,
  ContentContainer,
  ContentTable,
  Root,
  TitleTypo,
} from './styled';

const ProblemSearch = () => {
  const [problemList, setProblemList] = useState<any[]>([]);

  useEffect(() => {
    commonAxios({ url: 'problems/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setProblemList(
          res.data.map((value: any) => ({
            ...value,
            created_at: moment(value.created_at).format('YYYY-MM-DD'),
          }))
        );
      } else {
        alert('서버 에러');
      }
    });
  }, []);

  const tableColumns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    },
    {
      title: '생성일',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a: any, b: any) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    },
    {
      title: '수정',
      dataIndex: 'edit',
      key: 'edit',
      render: (a: any, b: any) => {
        return (
          <ContentButton onClick={() => window.open(`/problem/edit/${b.id}`)}>
            <ContentButtonTypo>수정</ContentButtonTypo>
          </ContentButton>
        );
      },
    },
  ];

  return (
    <Root>
      <TitleTypo level={2}>문제 조회</TitleTypo>
      <ContentContainer>
        <ContentTable columns={tableColumns} dataSource={problemList} />
      </ContentContainer>
    </Root>
  );
};

export default ProblemSearch;
