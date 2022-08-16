import React, { useEffect, useState } from 'react';
import {
  ContentActionButton,
  ContentActionButtonTypo,
  ContentActionContainer,
  ContentContainer,
  ContentDatePicker,
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
import { monthToDateRange } from 'utils/time';

const today = new Date();

const AttendenceGraph = () => {
  const [teacherList, setTeacherList] = useState<
    { id: string; name: string; isSelected: boolean }[]
  >([]);
  const [curriculums, setCurriculums] = useState<
    { id: string; name: string; isSelected: boolean }[]
  >([]);
  const [dateRange, setDateRange] = useState<moment.Moment>(moment(today));
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

  const renderDate = (attendenceStatus: string, record: any) => {
    if (attendenceStatus === 'present') {
      return 'o';
    }
    if (attendenceStatus === 'absent') {
      return 'x';
    }
    if (attendenceStatus === 'late') {
      return 'z';
    }
    return '-';
  };

  const dayWidth = 1200 / 31;

  const tableColumns = [
    {
      title: '학생 정보',
      dataIndex: 'info',
      key: 'info',
      children: [
        {
          title: '이름',
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
          width: 75,
          sorter: (a: any, b: any) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
        },
        {
          title: '학부모 연락처',
          dataIndex: 'parent_phone_number',
          key: 'parent_phone_number',
          fixed: 'left',
          width: 125,
        },
        {
          title: '클래스',
          dataIndex: 'curriculum',
          key: 'curriculum',
          fixed: 'left',
          width: 75,
        },
        {
          title: '출석',
          dataIndex: 'present',
          key: 'present',
          fixed: 'left',
          width: 75,
        },
        {
          title: '결석',
          dataIndex: 'absent',
          key: 'absent',
          fixed: 'left',
          width: 75,
        },
        // {
        //   title: '비고',
        //   dataIndex: 'etc',
        //   key: 'etc',
        //   fixed: 'left',
        //   width: 75,
        // },
      ],
    },
    {
      title: '날짜',
      children: [
        {
          title: '1',
          width: dayWidth,
          dataIndex: 'day_01',
          key: 'day_01',
          render: renderDate,
        },
        {
          title: '2',
          width: dayWidth,
          dataIndex: 'day_02',
          key: 'day_02',
          render: renderDate,
        },
        {
          title: '3',
          width: dayWidth,
          dataIndex: 'day_03',
          key: 'day_03',
          render: renderDate,
        },
        {
          title: '4',
          width: dayWidth,
          dataIndex: 'day_04',
          key: 'day_04',
          render: renderDate,
        },
        {
          title: '5',
          width: dayWidth,
          dataIndex: 'day_05',
          key: 'day_05',
          render: renderDate,
        },
        {
          title: '6',
          width: dayWidth,
          dataIndex: 'day_06',
          key: 'day_06',
          render: renderDate,
        },
        {
          title: '7',
          width: dayWidth,
          dataIndex: 'day_07',
          key: 'day_07',
          render: renderDate,
        },
        {
          title: '8',
          width: dayWidth,
          dataIndex: 'day_08',
          key: 'day_08',
          render: renderDate,
        },
        {
          title: '9',
          width: dayWidth,
          dataIndex: 'day_09',
          key: 'day_09',
          render: renderDate,
        },
        {
          title: '10',
          width: dayWidth,
          dataIndex: 'day_10',
          key: 'day_10',
          render: renderDate,
        },
        {
          title: '11',
          width: dayWidth,
          dataIndex: 'day_11',
          key: 'day_11',
          render: renderDate,
        },
        {
          title: '12',
          width: dayWidth,
          dataIndex: 'day_12',
          key: 'day_12',
          render: renderDate,
        },
        {
          title: '13',
          width: dayWidth,
          dataIndex: 'day_13',
          key: 'day_13',
          render: renderDate,
        },
        {
          title: '14',
          width: dayWidth,
          dataIndex: 'day_14',
          key: 'day_14',
          render: renderDate,
        },
        {
          title: '15',
          width: dayWidth,
          dataIndex: 'day_15',
          key: 'day_15',
          render: renderDate,
        },
        {
          title: '16',
          width: dayWidth,
          dataIndex: 'day_16',
          key: 'day_16',
          render: renderDate,
        },
        {
          title: '17',
          width: dayWidth,
          dataIndex: 'day_17',
          key: 'day_17',
          render: renderDate,
        },
        {
          title: '18',
          width: dayWidth,
          dataIndex: 'day_18',
          key: 'day_18',
          render: renderDate,
        },
        {
          title: '19',
          width: dayWidth,
          dataIndex: 'day_19',
          key: 'day_19',
          render: renderDate,
        },
        {
          title: '20',
          width: dayWidth,
          dataIndex: 'day_20',
          key: 'day_20',
          render: renderDate,
        },
        {
          title: '21',
          width: dayWidth,
          dataIndex: 'day_21',
          key: 'day_21',
          render: renderDate,
        },
        {
          title: '22',
          width: dayWidth,
          dataIndex: 'day_22',
          key: 'day_22',
          render: renderDate,
        },
        {
          title: '23',
          width: dayWidth,
          dataIndex: 'day_23',
          key: 'day_23',
          render: renderDate,
        },
        {
          title: '24',
          width: dayWidth,
          dataIndex: 'day_24',
          key: 'day_24',
          render: renderDate,
        },
        {
          title: '25',
          width: dayWidth,
          dataIndex: 'day_25',
          key: 'day_25',
          render: renderDate,
        },
        {
          title: '26',
          width: dayWidth,
          dataIndex: 'day_26',
          key: 'day_26',
          render: renderDate,
        },
        {
          title: '27',
          width: dayWidth,
          dataIndex: 'day_27',
          key: 'day_27',
          render: renderDate,
        },
        {
          title: '28',
          width: dayWidth,
          dataIndex: 'day_28',
          key: 'day_28',
          render: renderDate,
        },
        {
          title: '29',
          width: dayWidth,
          dataIndex: 'day_29',
          key: 'day_29',
          render: renderDate,
        },
        {
          title: '30',
          width: dayWidth,
          dataIndex: 'day_30',
          key: 'day_30',
          render: renderDate,
        },
        {
          title: '31',
          width: dayWidth,
          dataIndex: 'day_31',
          key: 'day_31',
          render: renderDate,
        },
      ],
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

  const convertAttendances = (
    attendances: { attendance_type: string; attended_at: string }[]
  ) => {
    let data = {};
    let present = 0;
    let absent = 0;

    attendances?.forEach((value) => {
      if (value.attendance_type === 'present') {
        present++;
      }
      if (value.attendance_type === 'absent') {
        absent++;
      }
      data = {
        ...data,
        [`day_${value.attended_at.split('-')[1]}`]: value.attendance_type,
      };
    });

    return { ...data, present, absent };
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

    let newDateRange = ``;

    newDateRange = monthToDateRange(moment(dateRange).format('YYYY-MM'));

    commonAxios({
      url: 'attendees/',
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
          name: value.student.name,
          parent_phone_number: value.student.parent_phone_number,
          curriculum: value.curriculum,
          ...convertAttendances(value.attendances),
        }));
        setStudentList(newStudentList);
      } else {
        alert('출결 조회 실패');
      }
    });
  };

  return (
    <Root>
      <TitleTypo level={2}>출결 통계</TitleTypo>
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
            <ContentDatePicker
              onChange={(value: any) => {
                setDateRange(value);
              }}
              picker='month'
              locale={locale}
            />
          </MenuItemContentContainer>
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
            columns={tableColumns as any}
            // rowSelection={{
            //   ...rowSelection,
            // }}
            bordered
            dataSource={studentList}
            scroll={{
              x: '1000px',
            }}
          />
        </ContentContainer>
      </MenuContainer>
    </Root>
  );
};

export default AttendenceGraph;
