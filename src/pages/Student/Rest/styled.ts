import { Button, Input, Select, Table, Typography } from 'antd';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
`;

const TitleTypo = styled(Typography.Title)`
  &&& {
    color: #14449a;
  }
`;

const MenuContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
`;

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ContentInput = styled(Input)`
  width: 200px;
`;

const ContentTable = styled(Table)`
  width: 100%;
  margin-top: 10px;
`;

const MenuItemContentSelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItemContentSelect = styled(Select)`
  width: 130px;
`;

const MenuItemContentSelectOption = styled(Select.Option)``;

const MenuItemContentTextInput = styled(Input)`
  width: 130px;
`;

const MenuItemContentButton = styled(Button)`
  width: 80px;
`;

const MenuItemContentButtonTypo = styled(Typography)`
  &&& {
    color: #fff;
  }
`;

const ContentInputColumnButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const ContentButton = styled(Button)``;

const ContentButtonTypo = styled(Typography)`
  &&& {
  }
`;

export {
  Root,
  TitleTypo,
  MenuContainer,
  MenuItemContainer,
  ContentInput,
  ContentTable,
  MenuItemContentSelectContainer,
  MenuItemContentSelect,
  MenuItemContentSelectOption,
  MenuItemContentTextInput,
  MenuItemContentButton,
  MenuItemContentButtonTypo,
  ContentInputColumnButtonContainer,
  ContentButton,
  ContentButtonTypo,
};
