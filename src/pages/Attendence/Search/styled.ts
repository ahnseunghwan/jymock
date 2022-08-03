import { Button, DatePicker, Input, Select, Table, Typography } from 'antd';
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
`;

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

type MenuItemHeaderTypoWrapperProps = {
  width: number;
};

const MenuItemHeaderTypoWrapper = styled.div<MenuItemHeaderTypoWrapperProps>`
  width: ${(props) => props.width}px;
`;

const MenuItemHeaderTypo = styled(Typography)`
  &&& {
  }
`;

const MenuItemContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const MenuItemContentTypoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MenuItemContentTypo = styled(Typography)`
  &&& {
  }
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

const ContentContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
`;

const ContentActionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const ContentActionButton = styled(Button)``;

const ContentActionButtonTypo = styled(Typography)``;

const ContentTable = styled(Table)`
  width: 100%;
  margin-top: 10px;
`;

const ContentRangePicker = styled(DatePicker.RangePicker)``;

const ContentInput = styled(Input)``;

const ContentSelect = styled(Select)``;

const ContentSelectOption = styled(Select.Option)``;

export {
  Root,
  TitleTypo,
  MenuContainer,
  MenuItemContainer,
  MenuItemHeaderTypoWrapper,
  MenuItemHeaderTypo,
  MenuItemContentContainer,
  MenuItemContentTypoContainer,
  MenuItemContentTypo,
  MenuItemContentSelect,
  MenuItemContentSelectOption,
  MenuItemContentTextInput,
  MenuItemContentButton,
  MenuItemContentButtonTypo,
  ContentContainer,
  ContentActionContainer,
  ContentActionButton,
  ContentActionButtonTypo,
  ContentTable,
  ContentRangePicker,
  ContentInput,
  ContentSelect,
  ContentSelectOption,
};
