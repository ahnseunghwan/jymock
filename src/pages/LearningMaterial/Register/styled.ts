import {
  Button,
  DatePicker,
  Image,
  Input,
  Select,
  Typography,
  Upload,
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
  width: 1000px;
  background: #fff;
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

const ContentUpload = styled(Upload)`
  width: 600px;
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
  ContentDatePicker,
  ContentInputColumnButtonContainer,
  ContentUpload,
};
