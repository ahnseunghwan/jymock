import { Button, DatePicker, Image, Input, Select, Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 50px;
`;

export const TitleTypo = styled(Typography.Title)`
  &&& {
    color: #14449a;
  }
`;

export const ContentContainer = styled.div`
  width: 1000px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 16px;
  padding: 20px;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ContentInput = styled(Input)`
  &&& {
    width: calc(980px / 3);
  }
`;

export const ContentButton = styled(Button)``;
