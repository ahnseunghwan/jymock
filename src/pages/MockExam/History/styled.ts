import {
  Button,
  DatePicker,
  Image,
  Input,
  Select,
  Table,
  Typography,
} from 'antd';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 50px;
`;

const TitleTypo = styled(Typography.Title)`
  &&& {
    color: #14449a;
  }
`;

const ContentContainer = styled.div`
  width: 1200px;
  background: #fff;
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  border-radius: 16px;
  padding: 20px;
`;

const ContentInputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const ContentInputColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContentInput = styled(Input)`
  width: 600px;
`;

const ContentSelect = styled(Select)`
  width: 600px;
`;

const ContentSelectOption = styled(Select.Option)``;

const ContentImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ContentImage = styled(Image)`
  &&& {
    width: 300px;
    height: 400px;
    object-fit: contain;
  }
`;

const ContentButton = styled(Button)``;

const ContentButtonTypo = styled(Typography)`
  &&& {
  }
`;

const ContentDatePicker = styled(DatePicker)`
  &&& {
    width: 600px;
  }
`;

const ContentInputColumnButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const ContentTable = styled(Table)`
  width: 100%;
  margin-top: 10px;
`;

export {
  Root,
  TitleTypo,
  ContentContainer,
  ContentInputContainer,
  ContentInputColumnContainer,
  ContentInput,
  ContentSelect,
  ContentSelectOption,
  ContentImageContainer,
  ContentImage,
  ContentButton,
  ContentButtonTypo,
  ContentTable,
  ContentDatePicker,
  ContentInputColumnButtonContainer,
};
