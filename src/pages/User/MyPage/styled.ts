import { Button, Input, Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ContentTypo = styled(Typography)``;

export const ContentInput = styled(Input)``;

export const ContentButton = styled(Button)`
  &&& {
    width: 100%;
  }
`;
