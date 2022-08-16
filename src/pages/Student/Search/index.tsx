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
  const [teacherList, setTeacherList] = useState<
    { id: string; name: string; isSelected: boolean }[]
  >([]);
  const [curriculums, setCurriculums] = useState<
    { id: string; name: string; isSelected: boolean }[]
  >([]);

  const [searchName, setSearchName] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<string>('all');

  const [studentList, setStudentList] = useState<any[]>([]);

  const tableColumns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
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
      sorter: (a: any, b: any) =>
        a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0,
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
      sorter: (a: any, b: any) =>
        a.grade < b.grade ? -1 : a.grade > b.grade ? 1 : 0,
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
    commonAxios({ url: 'curriculums/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setCurriculums(
          res.data.map((value: any) => ({ ...value, isSelected: false }))
        );
      } else {
        alert('서버 에러');
      }
    });
    commonAxios({ url: 'lecturers/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setTeacherList(
          res.data.map((value: any) => ({ ...value, isSelected: false }))
        );
      } else {
        alert('서버 에러');
      }
    });
    commonAxios({ url: 'students/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setStudentList(
          res.data.map((value: any) => ({
            ...value,
            key: value.id,
            created_at: dayjs(value.created_at).format('YYYY-MM-DD'),
          }))
        );
      } else {
        alert('서버 에러');
      }
    });
  }, []);

  const onSelectCurriculum = (id: number) => () => {
    setCurriculums((prev) =>
      prev.map((value, index) =>
        id === index ? { ...value, isSelected: !value.isSelected } : value
      )
    );
  };

  const onLecturersCurriculum = (id: number) => () => {
    setTeacherList((prev) =>
      prev.map((value, index) =>
        id === index ? { ...value, isSelected: !value.isSelected } : value
      )
    );
  };

  const onClickSearch = () => {
    let lecturersString = '';

    teacherList.forEach((value, index) => {
      if (value.isSelected) {
        if (lecturersString === '') {
          lecturersString += `${value.name}`;
        } else {
          lecturersString += `,${value.name}`;
        }
      }
    });

    let curriculumsString = '';

    curriculums.forEach((value, index) => {
      if (value.isSelected) {
        if (curriculumsString === '') {
          curriculumsString += `${value.name}`;
        } else {
          curriculumsString += `,${value.name}`;
        }
      }
    });

    commonAxios({
      url: 'students/',
      method: 'GET',
      params: {
        name: searchName,
        status: searchStatus,
        curriculums: curriculumsString,
        lecturers: lecturersString,
      },
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setStudentList(
          res.data.map((value: any) => ({
            ...value,
            key: value.id,
            created_at: dayjs(value.created_at).format('YYYY-MM-DD'),
          }))
        );
      } else {
        alert('서버 에러');
      }
    });
  };

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
                <Checkbox
                  checked={teacher.isSelected}
                  onClick={onLecturersCurriculum(index)}
                />
                <MenuItemContentTypo>{teacher.name}</MenuItemContentTypo>
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
            {curriculums.map((curriculum, index) => (
              <MenuItemContentTypoContainer key={`menu_class_${index}`}>
                <Checkbox
                  checked={curriculum.isSelected}
                  onClick={onSelectCurriculum(index)}
                />
                <MenuItemContentTypo>{curriculum.name}</MenuItemContentTypo>
              </MenuItemContentTypoContainer>
            ))}
          </MenuItemContentContainer>
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuItemHeaderTypoWrapper width={70}>
            <MenuItemHeaderTypo>회원 구분</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <MenuItemContentSelect
            placeholder='선택'
            value={searchStatus}
            onChange={(value: any) => setSearchStatus(value)}
          >
            <MenuItemContentSelectOption value={'all'}>
              전체
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={'active'}>
              원생
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={'inactive'}>
              휴원
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={'take-off'}>
              퇴원
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={'inactive/take-off'}>
              휴/퇴원
            </MenuItemContentSelectOption>
          </MenuItemContentSelect>
          <MenuItemHeaderTypoWrapper width={70} style={{ marginLeft: '25px' }}>
            <MenuItemHeaderTypo>학생 이름</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <MenuItemContentTextInput
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <MenuItemContentButton
            type='primary'
            style={{ marginLeft: '25px' }}
            onClick={onClickSearch}
          >
            <MenuItemContentButtonTypo>검색</MenuItemContentButtonTypo>
          </MenuItemContentButton>
        </MenuItemContainer>
        <ContentContainer>
          <ContentActionContainer>
            <ContentActionButton>
              <ContentActionButtonTypo>SMS발송</ContentActionButtonTypo>
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
