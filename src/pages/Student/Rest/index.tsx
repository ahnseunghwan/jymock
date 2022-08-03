import React, { useState } from 'react';
import {
  ContentTable,
  Root,
  TitleTypo,
  MenuContainer,
  MenuItemContentSelect,
  MenuItemContentSelectOption,
  MenuItemContentTextInput,
  MenuItemContentButton,
  MenuItemContentButtonTypo,
  MenuItemContentSelectContainer,
  ContentInputColumnButtonContainer,
  ContentButton,
  ContentButtonTypo,
  MenuItemTitleTypo,
  MenuItemContentContainer,
} from './styled';
import studentSearchMenu from 'assets/json/student_search_menu.json';

const StudentRegister = () => {
  const [tableData, setTableData] = useState<any[]>(
    studentSearchMenu.table_data
  );

  const tableColumns = [
    {
      title: '구분',
      dataIndex: 'type',
      key: 'type',
    },
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
      title: '퇴원일',
      dataIndex: 'discharge_date',
      key: 'discharge_date',
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
      <TitleTypo level={2}> 휴/퇴원 관리 </TitleTypo>
      <MenuContainer>
        <MenuItemContentContainer>
          <MenuItemTitleTypo>회원 구분</MenuItemTitleTypo>
          <MenuItemContentSelect placeholder='선택'>
            <MenuItemContentSelectOption value={1}>
              전체
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={2}>
              원생
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={3}>
              휴원생
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={4}>
              퇴원생
            </MenuItemContentSelectOption>
          </MenuItemContentSelect>
        </MenuItemContentContainer>
        <MenuItemContentSelectContainer>
          <MenuItemTitleTypo>학생</MenuItemTitleTypo>
          <MenuItemContentSelect placeholder='선택'>
            <MenuItemContentSelectOption value={1}>
              이름
            </MenuItemContentSelectOption>
            <MenuItemContentSelectOption value={2}>
              아이디
            </MenuItemContentSelectOption>
          </MenuItemContentSelect>
          <MenuItemContentTextInput />
          <MenuItemContentButton type='primary'>
            <MenuItemContentButtonTypo>검색</MenuItemContentButtonTypo>
          </MenuItemContentButton>
        </MenuItemContentSelectContainer>
      </MenuContainer>
      <ContentInputColumnButtonContainer>
        <ContentButton type='primary'>
          <ContentButtonTypo style={{ color: 'white' }}>
            휴원 전환
          </ContentButtonTypo>
        </ContentButton>
        <ContentButton type='primary'>
          <ContentButtonTypo style={{ color: 'white' }}>
            퇴원 전환
          </ContentButtonTypo>
        </ContentButton>
        <ContentButton type='primary'>
          <ContentButtonTypo style={{ color: 'white' }}>
            원생 전환
          </ContentButtonTypo>
        </ContentButton>
      </ContentInputColumnButtonContainer>
      <ContentTable
        columns={tableColumns}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        dataSource={tableData}
      />
    </Root>
  );
};

export default StudentRegister;
