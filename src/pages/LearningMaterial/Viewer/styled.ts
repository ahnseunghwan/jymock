import { Button, Input, InputNumber, Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

export const PageContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px #0002 solid;
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

export const AudioContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 5px 20px;
  box-sizing: border-box;
`;
