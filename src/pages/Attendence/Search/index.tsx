import React, { useState } from 'react';
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
import studentSearchMenu from 'assets/json/student_search_menu.json';
import { Button, Checkbox, Divider, Tag } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';

const AttendenceSearch = () => {
  const [teacherList, setTeacherList] = useState<string[]>([
    '전체',
    ...studentSearchMenu.teachers,
  ]);
  const [classList, setClassList] = useState<string[]>([
    '전체',
    ...studentSearchMenu.classes,
  ]);
  const [tableData, setTableData] = useState<any[]>(
    studentSearchMenu.attendence_table_data
  );
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

    if (value === 1) {
      newValue = '출석';
    } else if (value === 2) {
      newValue = '결석';
    } else if (value === 3) {
      newValue = '지각';
    } else if (value === 4) {
      newValue = '조퇴';
    }

    setTableData((prev) =>
      prev.map((value) =>
        value.key === key ? { ...value, attendence_status: newValue } : value
      )
    );
  };

  const tableColumns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '아이디',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '클래스',
      dataIndex: 'class_title',
      key: 'class_title',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color='blue' key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '출결상태',
      dataIndex: 'attendence_status',
      key: 'attendence_status',
      render: (attendenceStatus: string, record: any) => {
        if (record.key === editId) {
          return (
            <MenuItemContentSelect
              placeholder='선택'
              style={{ width: '80px' }}
              onChange={onSelectAttendenceStatus(record.key)}
            >
              <MenuItemContentSelectOption value={1}>
                출석
              </MenuItemContentSelectOption>
              <MenuItemContentSelectOption value={2}>
                결석
              </MenuItemContentSelectOption>
              <MenuItemContentSelectOption value={3}>
                지각
              </MenuItemContentSelectOption>
              <MenuItemContentSelectOption value={4}>
                조퇴
              </MenuItemContentSelectOption>
            </MenuItemContentSelect>
          );
        }
        return attendenceStatus;
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
          <MenuItemHeaderTypoWrapper width={40}>
            <MenuItemHeaderTypo>기간</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <Divider type='vertical' />
          <MenuItemContentContainer>
            <ContentRangePicker locale={locale} />
          </MenuItemContentContainer>
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuItemHeaderTypoWrapper width={70}>
            <MenuItemHeaderTypo>출결 상태</MenuItemHeaderTypo>
          </MenuItemHeaderTypoWrapper>
          <MenuItemContentSelect placeholder='선택'>
            <MenuItemContentSelectOption value={1}>
              출석
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={2}>
              결석
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={3}>
              지각
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={4}>
              조퇴
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
            dataSource={tableData}
          />
        </ContentContainer>
      </MenuContainer>
    </Root>
  );
};

export default AttendenceSearch;
