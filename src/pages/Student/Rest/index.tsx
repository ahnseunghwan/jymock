import React, { useEffect, useState } from 'react';
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
import { commonAxios } from 'api/common';
import dayjs from 'dayjs';
import { message } from 'antd';
import moment from 'moment';

const StudentRegister = () => {
  const [studentList, setStudentList] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const [searchName, setSearchName] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<string>('all');

  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const tableColumns = [
    {
      title: '구분',
      dataIndex: 'status',
      key: 'status',
      render: (_: any) => {
        if (_ === 'active') {
          return '원생';
        }
        if (_ === 'inactive') {
          return '휴원생';
        }
        if (_ === 'take-off') {
          return '퇴원생';
        }
      },
    },
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
      title: '최종 수정일',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (_: any) => {
        return moment(_).format('YYYY-MM-DD');
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      onSelectChange([...selectedRowKeys]);
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

  const onClickButton = (type: 'ACTIVE' | 'INACTIVE' | 'TAKE_OFF') => () => {
    if (selectedRowKeys.length === 0) {
      alert('학생을 선택해주세요.');
      return;
    }

    if (type === 'ACTIVE') {
      commonAxios({
        method: 'PATCH',
        url: 'students/mark-as-active',
        data: {
          student_ids: selectedRowKeys,
        },
      }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          alert('성공');
          window.location.reload();
        } else {
          alert('실패');
        }
      });
      return;
    }
    if (type === 'INACTIVE') {
      commonAxios({
        method: 'PATCH',
        url: 'students/mark-as-inactive',
        data: {
          student_ids: selectedRowKeys,
        },
      }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          alert('성공');
          window.location.reload();
        } else {
          alert('실패');
        }
      });
      return;
    }
    if (type === 'TAKE_OFF') {
      commonAxios({
        method: 'PATCH',
        url: 'students/mark-as-takeoff',
        data: {
          student_ids: selectedRowKeys,
        },
      }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          alert('성공');
          window.location.reload();
        } else {
          alert('실패');
        }
      });
      return;
    }
  };

  const onClickSearch = () => {
    commonAxios({
      url: 'students/',
      method: 'GET',
      params: { name: searchName, status: searchStatus },
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
      <TitleTypo level={2}> 휴/퇴원 관리 </TitleTypo>
      <MenuContainer>
        <MenuItemContentContainer>
          <MenuItemTitleTypo>회원 구분</MenuItemTitleTypo>
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
        </MenuItemContentContainer>
        <MenuItemContentSelectContainer>
          <MenuItemTitleTypo>학생</MenuItemTitleTypo>
          <MenuItemContentTextInput
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <MenuItemContentButton type='primary' onClick={onClickSearch}>
            <MenuItemContentButtonTypo>검색</MenuItemContentButtonTypo>
          </MenuItemContentButton>
        </MenuItemContentSelectContainer>
      </MenuContainer>
      <ContentInputColumnButtonContainer>
        <ContentButton type='primary' onClick={onClickButton('INACTIVE')}>
          <ContentButtonTypo style={{ color: 'white' }}>
            휴원 전환
          </ContentButtonTypo>
        </ContentButton>
        <ContentButton type='primary' onClick={onClickButton('TAKE_OFF')}>
          <ContentButtonTypo style={{ color: 'white' }}>
            퇴원 전환
          </ContentButtonTypo>
        </ContentButton>
        <ContentButton type='primary' onClick={onClickButton('ACTIVE')}>
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
        dataSource={studentList}
      />
    </Root>
  );
};

export default StudentRegister;
