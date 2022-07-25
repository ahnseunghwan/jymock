import {
  AlignCenterOutlined,
  BookOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
  PieChartOutlined,
  ReadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, Typography } from 'antd';
import { RootState } from 'features';
import { selectMenu } from 'features/common/slice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectMenuType } from 'type/common';
import { Container, Root, TitleContainer, TitleTypo } from './styled';

function getItem(
  label: string,
  key: string,
  icon?: any,
  children?: any,
  type?: any
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('원생 관리', 'STUDENT', <UserOutlined />, [
    getItem('원생 조회', '/student/search'),
    getItem('원생 등록', '/student/rest'),
    getItem('휴/퇴원 관리', '/student/register'),
  ]),
  getItem('출결 관리', 'ATTENDENCE', <CalendarOutlined />, [
    getItem('출결 조회', 'ATTENDENCE_1'),
    getItem('출결 등록', 'ATTENDENCE_2'),
    getItem('출결 통계', 'ATTENDENCE_3'),
  ]),
  getItem('교재 관리', 'LEARNING_MATERIAL', <ReadOutlined />, [
    getItem('교재 조회', 'LEARNING_MATERIAL_1'),
    getItem('교재 등록', 'LEARNING_MATERIAL_2'),
  ]),
  getItem('토익 관리', 'TOEIC_EXAM', <ExclamationCircleOutlined />, [
    getItem('문제 조회', 'TOEIC_EXAM_1'),
    getItem('문제 등록', 'TOEIC_EXAM_2'),
  ]),
  getItem('시험 관리', 'EXAM', <InboxOutlined />, [
    getItem('문제 조회', 'EXAM_1'),
    getItem('문제 등록', 'EXAM_2'),
  ]),
  getItem('성적 관리', 'SCORE', <PieChartOutlined />, [
    getItem('반별 성적표', 'SCORE_1'),
    getItem('학생별 성적', 'SCORE_2'),
  ]),
  getItem('숙제 관리', 'ASSIGNMENT', <BookOutlined />, [
    getItem('숙제 조회', 'ASSIGNMENT_1'),
    getItem('숙제 등록', 'ASSIGNMENT_2'),
  ]),
  getItem('상담 관리', 'CONSULT_LOG', <AlignCenterOutlined />, [
    getItem('상담 조회', 'CONSULT_LOG_1'),
    getItem('상담 등록', 'CONSULT_LOG_2'),
  ]),
];

const MenuContainer = () => {
  const [select] = useSelector((state: RootState) => [state.common.select]);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  return (
    <Root>
      <Container>
        <TitleContainer>
          <TitleTypo>
            <strong>관리자</strong>님, 안녕하세요.
          </TitleTypo>
        </TitleContainer>
        <Menu
          defaultSelectedKeys={['STUDENT_1']}
          defaultOpenKeys={['STUDENT']}
          mode='inline'
          theme='dark'
          items={items}
          onClick={(info) => navigation(info.key)}
        />
      </Container>
    </Root>
  );
};

export default MenuContainer;
