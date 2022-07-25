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
} from './styled';
import studentSearchMenu from 'assets/json/student_search_menu.json';

const StudentRegister = () => {
  const [tableData, setTableData] = useState<any[]>(
    studentSearchMenu.table_data
  );

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
        <MenuItemContentSelectContainer>
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
        </MenuItemContentSelectContainer>
        <ContentInputColumnButtonContainer>
          <ContentButton>
            <ContentButtonTypo>SMS발송</ContentButtonTypo>
          </ContentButton>
          <ContentButton type='primary'>
            <ContentButtonTypo style={{ color: 'white' }}>
              휴/퇴원
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
      </MenuContainer>
    </Root>
  );
};

export default StudentRegister;
