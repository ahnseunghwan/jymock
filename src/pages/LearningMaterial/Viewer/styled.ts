import { Button, Input, InputNumber, Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const PageNumTypoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const PageNumTypo = styled(Typography)``;

export const PageHandlerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const PageHandlerWrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PageHandlerInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PageHandlerInput = styled(InputNumber)``;

export const PageHandlerInputButton = styled(Button)``;

export const PageHandlerInputButtonTypo = styled(Typography)``;
