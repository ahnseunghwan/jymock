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

const ExamSearch = () => {
  const [examList, setExamList] = useState<any[]>();

  useEffect(() => {
    commonAxios({ url: 'exams/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setExamList(
          res.data.map((value: any) => {
            return {
              ...value,
              name: value.material_name,
              created_at: value.created_at,
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
      title: '시험 이름',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    },
    {
      title: '생성일',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (a: any, b: any) => {
        return moment(b).format('YYYY-MM-DD');
      },
      sorter: (a: any, b: any) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    },
    {
      title: '응시기록',
      dataIndex: 'history',
      key: 'history',
      render: (a: any, b: any) => {
        return (
          <ContentButton
            onClick={() => window.open(`/exam/history/?id=${b.id}`)}
          >
            <ContentButtonTypo>응시기록보기</ContentButtonTypo>
          </ContentButton>
        );
      },
    },
    {
      title: '응시하기',
      dataIndex: 'edit',
      key: 'edit',
      render: (a: any, b: any) => {
        return (
          <ContentButton
            onClick={() => window.open(`/exam/viewer/?id=${b.id}`)}
          >
            <ContentButtonTypo>응시하기</ContentButtonTypo>
          </ContentButton>
        );
      },
    },
    {
      title: '삭제',
      dataIndex: 'del',
      key: 'del',
      render: (a: any, b: any) => {
        return (
          <ContentButton>
            <ContentButtonTypo>삭제</ContentButtonTypo>
          </ContentButton>
        );
      },
    },
  ];
  return (
    <Root>
      <TitleTypo level={2}>시험 조회</TitleTypo>
      <ContentContainer>
        <ContentTable columns={tableColumns} dataSource={examList} />
      </ContentContainer>
    </Root>
  );
};

export default ExamSearch;
