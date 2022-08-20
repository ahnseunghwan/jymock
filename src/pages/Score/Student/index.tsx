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
    {
      title: '성적표 보기',
      dataIndex: 'edit',
      key: 'edit',
      render: (_: any, record: any) => (
        <Button
          onClick={() => {
            window.open(`/score/print/?id=${record.id}`);
          }}
        >
          성적표 보기
        </Button>
      ),
    },
  ];

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
      <TitleTypo level={2}>학생별 성적표</TitleTypo>
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
          <ContentTable columns={tableColumns} dataSource={studentList} />
        </ContentContainer>
      </MenuContainer>
    </Root>
  );
};

export default StudentSearch;
