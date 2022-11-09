import React, { useEffect, useState } from 'react';
import {
  Root,
  TitleTypo,
  ContentContainer,
  ContentButtonTypo,
  ContentButton,
  ContentTable,
} from './styled';
import testData from 'assets/json/learning_material_card.json';
import LearningMaterialCard from 'systems/LearningMaterialCard';
import { commonAxios } from 'api/common';
import moment from 'moment';

const ToeicExamSearch = () => {
  const [cardList, setCardList] = useState<any[]>([]);

  useEffect(() => {
    commonAxios({ url: 'toeic-exams/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setCardList(res.data);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  const tableColumns = [
    {
      title: '시험 이름',
      dataIndex: 'material_name',
      key: 'material_name',
      sorter: (a: any, b: any) =>
        a.material_name < b.material_name
          ? -1
          : a.material_name > b.material_name
          ? 1
          : 0,
    },
    {
      title: '생성일',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (a: any, b: any) => {
        return moment(b.created_at).format('YYYY-MM-DD');
      },
      sorter: (a: any, b: any) =>
        a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0,
    },
    {
      title: '응시기록',
      dataIndex: 'history',
      key: 'history',
      render: (a: any, b: any) => {
        return (
          <ContentButton
            onClick={() => window.open(`/toeic_exam/history/?id=${b.id}`)}
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
            onClick={() => window.open(`/toeic_exam/viewer/?id=${b.id}`)}
          >
            <ContentButtonTypo>응시하기</ContentButtonTypo>
          </ContentButton>
        );
      },
    },
    // {
    //   title: '삭제',
    //   dataIndex: 'del',
    //   key: 'del',
    //   render: (a: any, b: any) => {
    //     return (
    //       <ContentButton>
    //         <ContentButtonTypo>삭제</ContentButtonTypo>
    //       </ContentButton>
    //     );
    //   },
    // },
  ];

  const onClickCard = (id: string) => () => {
    window.open(`/toeic_exam/viewer/?id=${id}`);
  };

  return (
    <Root>
      <TitleTypo level={2}>토익 문제 조회</TitleTypo>
      <ContentContainer>
        <ContentTable columns={tableColumns} dataSource={cardList} />
      </ContentContainer>
    </Root>
  );
};

export default ToeicExamSearch;
