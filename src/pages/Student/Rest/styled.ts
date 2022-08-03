import { Button, Input, Select, Table, Typography } from 'antd';
import styled from 'styled-components';

const Root = styled.div`
  width: 1000px;
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
  gap: 25px;
  margin-top: 20px;
  margin-bottom: 14px;
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

const MenuItemContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const MenuItemContentSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
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

const MenuItemTitleTypo = styled(Typography)``;

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
  margin-top: 25px;
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
  MenuItemContentContainer,
  MenuItemContentSelectContainer,
  MenuItemContentSelect,
  MenuItemContentSelectOption,
  MenuItemContentTextInput,
  MenuItemContentButton,
  MenuItemContentButtonTypo,
  MenuItemTitleTypo,
  ContentInputColumnButtonContainer,
  ContentButton,
  ContentButtonTypo,
};
