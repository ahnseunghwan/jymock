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
    getItem('원생 등록', '/student/register'),
    getItem('원생 단체 등록', '/student/group-register'),
    getItem('휴/퇴원 관리', '/student/rest'),
  ]),
  getItem('출결 관리', 'ATTENDENCE', <CalendarOutlined />, [
    getItem('출결 조회', '/attendance/search'),
    // getItem('출결 등록', '/attendence/register'),
    getItem('출결 통계', '/attendance/graph'),
  ]),
  getItem('교재 관리', 'LEARNING_MATERIAL', <ReadOutlined />, [
    getItem('교재 조회', '/learning_material/search'),
    // getItem('교재 등록', '/learning_material/register'),
  ]),
  getItem('토익 관리', 'TOEIC_EXAM', <ExclamationCircleOutlined />, [
    getItem('시험 조회', '/toeic_exam/search'),
    getItem('응시 기록', '/toeic_exam/history'),
    // getItem('문제 등록', '/toeic_exam/register'),
  ]),
  getItem('모의 시험 관리', 'MOCK_EXAM', <InboxOutlined />, [
    getItem('모의 시험 조회', '/mock_exam/search'),
    getItem('응시 기록', '/mock_exam/history'),
  ]),
  getItem('문제 관리', 'PROBLEM', <ReadOutlined />, [
    getItem('문제 조회', '/problem/search'),
    getItem('문제 등록', '/problem/register'),
  ]),
  getItem('시험 관리', 'EXAM', <InboxOutlined />, [
    getItem('시험 조회', '/exam/search'),
    getItem('시험 등록', '/exam/register'),
  ]),
  getItem('성적 관리', 'SCORE', <PieChartOutlined />, [
    getItem('반별 성적표', '/score/class'),
    getItem('학생별 성적', '/score/student'),
  ]),
  getItem('숙제 관리', 'ASSIGNMENT', <BookOutlined />, [
    getItem('숙제 조회', '/assignment/search'),
    getItem('숙제 등록', '/assignment/register'),
  ]),
  getItem('상담 관리', 'CONSULT_LOG', <AlignCenterOutlined />, [
    getItem('상담 조회', '/consult/search'),
    getItem('상담 등록', '/consult/register'),
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
