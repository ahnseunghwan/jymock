import React, { useEffect, useState } from 'react';
import {
  ContentActionButton,
  ContentActionButtonTypo,
  ContentActionContainer,
  ContentContainer,
  ContentInput,
  ContentRangePicker,
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
import { Button, Checkbox, Divider, Tag } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { commonAxios } from 'api/common';
import moment from 'moment';

const today = new Date();

const AttendenceSearch = () => {
  const [teacherList, setTeacherList] = useState<
    { id: string; name: string; isSelected: boolean }[]
  >([]);
  const [curriculums, setCurriculums] = useState<
    { id: string; name: string; isSelected: boolean }[]
  >([]);
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment]>([
    moment(today),
    moment(today),
  ]);
  const [tableData, setTableData] = useState<any[]>([]);

  const [searchName, setSearchName] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<string>('all');

  const [studentList, setStudentList] = useState<any[]>([]);
  const [editId, setEditId] = useState<string>();

  const onEditComplete = () => {
    setEditId(undefined);
  };

  const onChangeReason = (key: string) => (e: any) => {
    setTableData((prev) =>
      prev.map((value) =>
        value.key === key ? { ...value, reason: e.target.value } : value
      )
    );
  };

  const onSelectAttendenceStatus = (key: string) => (value: any) => {
    let newValue = '';

    if (value === 'present') {
      newValue = '출석';
    } else if (value === 'absent') {
      newValue = '결석';
    } else if (value === 'late') {
      newValue = '지각';
    } else if (value === 'compassionate') {
      newValue = '조퇴';
    }

    setTableData((prev) =>
      prev.map((value) =>
        value.key === key ? { ...value, attendence_status: newValue } : value
      )
    );
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
  }, []);

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
      title: '날짜',
      dataIndex: 'attended_at',
      key: 'attended_at',
    },
    {
      title: '출결상태',
      dataIndex: 'attendance_type',
      key: 'attendance_type',
      render: (attendenceStatus: string, record: any) => {
        if (record.key === editId) {
          return (
            <MenuItemContentSelect
              placeholder='선택'
              style={{ width: '80px' }}
              value={attendenceStatus}
              onChange={onSelectAttendenceStatus(record.key)}
            >
              <MenuItemContentSelectOption value={'present'}>
                출석
              </MenuItemContentSelectOption>
              <MenuItemContentSelectOption value={'absent'}>
                결석
              </MenuItemContentSelectOption>
              <MenuItemContentSelectOption value={'late'}>
                지각
              </MenuItemContentSelectOption>
              <MenuItemContentSelectOption value={'compassionate'}>
                조퇴
              </MenuItemContentSelectOption>
            </MenuItemContentSelect>
          );
        }
        if (attendenceStatus === 'present') {
          return '출석';
        }
        if (attendenceStatus === 'absent') {
          return '결석';
        }
        if (attendenceStatus === 'late') {
          return '지각';
        }
        return '조퇴';
      },
    },
    {
      title: '등원시간',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '하원시간',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '사유',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason: string, record: any) => {
        if (record.key === editId) {
          return (
            <ContentInput
              onChange={onChangeReason(record.key)}
              value={reason}
              style={{ width: '100px' }}
            />
          );
        }
        return reason;
      },
    },
    {
      title: '수정',
      dataIndex: 'edit',
      key: 'edit',
      render: (_: string, record: any) => {
        if (record.key === editId) {
          return (
            <Button type='primary' onClick={onEditComplete}>
              완료
            </Button>
          );
        }
        return <Button onClick={() => setEditId(record.key)}>수정</Button>;
      },
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

    console.log({ dateRange });

    let newDateRange = ``;

    if (dateRange) {
      newDateRange = `${moment(dateRange[0]).format('YYYY-MM-DD')} ~ ${moment(
        dateRange[1]
      ).format('YYYY-MM-DD')}`;
    }

    commonAxios({
      url: 'attendances/',
      method: 'GET',
      params: {
        student: searchName,
        attendance_type: searchStatus,
        curriculums: curriculumsString,
        lecturers: lecturersString,
        attended_at: newDateRange,
      },
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        // 데이터 추가 요람
        const newStudentList = res.data?.map((value: any) => ({
          name: value.attendee.student.name,
          username: value.attendee.student.username,
          attended_at: value.attended_at,
          attendance_type: value.attendance_type,
          key: value.id,
        }));
        setStudentList(newStudentList);
      } else {
        alert('출결 조회 실패');
      }
    });
  };

  return (
    <Root>
      <TitleTypo level={2}>출결 조회</TitleTypo>
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
          <MenuItemHeaderTypoWrapper width={40}>
            <MenuItemHeaderTypo>기간</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <Divider type='vertical' />
          <MenuItemContentContainer>
            <ContentRangePicker
              onCalendarChange={(value: any) => {
                setDateRange(value);
              }}
              value={dateRange}
              locale={locale}
            />
          </MenuItemContentContainer>
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuItemHeaderTypoWrapper width={70}>
            <MenuItemHeaderTypo>출결 상태</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <MenuItemContentSelect
            placeholder='선택'
            value={searchStatus}
            onChange={(value: any) => setSearchStatus(value)}
          >
            <MenuItemContentSelectOption value={'all'}>
              전체
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={'present'}>
              출석
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={'absent'}>
              결석
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={'late'}>
              지각
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={'compassionate'}>
              조퇴
            </MenuItemContentSelectOption>
          </MenuItemContentSelect>
          <MenuItemHeaderTypoWrapper width={50} style={{ marginLeft: '25px' }}>
            <MenuItemHeaderTypo>학생</MenuItemHeaderTypo>
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

export default AttendenceSearch;
