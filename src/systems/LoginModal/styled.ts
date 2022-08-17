import { Button, Input, Modal, Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled(Modal)``;

export const TitleTypo = styled(Typography.Title)``;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const LoginInput = styled(Input)`
  width: 400px;
`;

export const SubmitButton = styled(Button)``;

export const SubmitButtonTypo = styled(Typography)``;
