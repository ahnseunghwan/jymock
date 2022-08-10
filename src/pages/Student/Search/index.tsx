import React, { useEffect, useState } from 'react';
import {
  ContentActionButton,
  ContentActionButtonTypo,
  ContentActionContainer,
  ContentContainer,
  ContentTable,
  MenuContainer,
  MenuItemContainer,
  MenuItemContentButton,
  MenuItemContentButtonTypo,
  MenuItemContentContainer,
  MenuItemContentSelect,
  MenuItemContentSelectOption,
  MenuItemContentTextInput,
  MenuItemContentTypo,
  MenuItemContentTypoContainer,
  MenuItemHeaderTypo,
  MenuItemHeaderTypoWrapper,
  Root,
  TitleTypo,
} from './styled';
import studentSearchMenu from 'assets/json/student_search_menu.json';
import { Button, Checkbox, Divider, message, Tag } from 'antd';
import { commonAxios } from 'api/common';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const StudentSearch = () => {
  const navigate = useNavigate();
  const [teacherList, setTeacherList] = useState<string[]>([
    '전체',
    ...studentSearchMenu.teachers,
  ]);
  const [classList, setClassList] = useState<string[]>([
    '전체',
    ...studentSearchMenu.classes,
  ]);
  const [tableData, setTableData] = useState<any[]>(
    studentSearchMenu.table_data
  );

  const [studentList, setStudentList] = useState<any[]>([]);

  const tableColumns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '아이디',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '비밀번호',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '가입일',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    // {
    //   title: '클래스',
    //   dataIndex: 'class_title',
    //   key: 'class_title',
    //   render: (tags: string[]) => (
    //     <>
    //       {tags.map((tag) => (
    //         <Tag color='blue' key={tag}>
    //           {tag}
    //         </Tag>
    //       ))}
    //     </>
    //   ),
    // },
    {
      title: '학교',
      dataIndex: 'school_name',
      key: 'school_name',
    },
    {
      title: '학년',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: '수정',
      dataIndex: 'edit',
      key: 'edit',
      render: (_: any, record: any) => (
        <Button
          onClick={() => {
            navigate(`/student/edit/?id=${record.id}`);
          }}
        >
          수정
        </Button>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  useEffect(() => {
    commonAxios({ url: 'students/', method: 'GET' }).then((res) => {
      if (res.status === 200) {
        setStudentList(
          res.data.map((value: any) => ({
            ...value,
            key: value.id,
            created_at: dayjs(value.created_at).format('YYYY-MM-DD'),
          }))
        );
      } else {
        message.error('서버 에러');
      }
    });
  }, []);

  return (
    <Root>
      <TitleTypo level={2}>원생 조회</TitleTypo>
      <MenuContainer>
        <MenuItemContainer>
          <MenuItemHeaderTypoWrapper width={40}>
            <MenuItemHeaderTypo>교사</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <Divider type='vertical' />
          <MenuItemContentContainer>
            {teacherList.map((teacher, index) => (
              <MenuItemContentTypoContainer key={`menu_teacher_${index}`}>
                <Checkbox />
                <MenuItemContentTypo>{teacher}</MenuItemContentTypo>
              </MenuItemContentTypoContainer>
            ))}
          </MenuItemContentContainer>
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuItemHeaderTypoWrapper width={40}>
            <MenuItemHeaderTypo>클래스</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <Divider type='vertical' />
          <MenuItemContentContainer>
            {classList.map((classTitle, index) => (
              <MenuItemContentTypoContainer key={`menu_class_${index}`}>
                <Checkbox />
                <MenuItemContentTypo>{classTitle}</MenuItemContentTypo>
              </MenuItemContentTypoContainer>
            ))}
          </MenuItemContentContainer>
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuItemHeaderTypoWrapper width={70}>
            <MenuItemHeaderTypo>회원 구분</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <MenuItemContentSelect placeholder='선택'>
            <MenuItemContentSelectOption value={1}>
              원생
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={2}>
              휴/퇴원
            </MenuItemContentSelectOption>
          </MenuItemContentSelect>
          <MenuItemHeaderTypoWrapper width={50} style={{ marginLeft: '25px' }}>
            <MenuItemHeaderTypo>학생</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <MenuItemContentSelect placeholder='선택'>
            <MenuItemContentSelectOption value={1}>
              이름
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={2}>
              아이디
            </MenuItemContentSelectOption>
          </MenuItemContentSelect>
          <MenuItemContentTextInput style={{ marginLeft: '25px' }} />
          <MenuItemContentButton type='primary' style={{ marginLeft: '25px' }}>
            <MenuItemContentButtonTypo>검색</MenuItemContentButtonTypo>
          </MenuItemContentButton>
        </MenuItemContainer>
        <ContentContainer>
          <ContentActionContainer>
            <ContentActionButton>
              <ContentActionButtonTypo>SMS발송</ContentActionButtonTypo>
            </ContentActionButton>
            <ContentActionButton>
              <ContentActionButtonTypo>프린트</ContentActionButtonTypo>
            </ContentActionButton>
            <ContentActionButton>
              <ContentActionButtonTypo>엑셀 다운로드</ContentActionButtonTypo>
            </ContentActionButton>
          </ContentActionContainer>
          <ContentTable
            columns={tableColumns}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            dataSource={studentList}
          />
        </ContentContainer>
      </MenuContainer>
    </Root>
  );
};

export default StudentSearch;
