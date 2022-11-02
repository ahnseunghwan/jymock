import { Typography } from 'antd';
import color from 'constants/color';
import styled from 'styled-components';

export const Root = styled.div`
  width: 256px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 30px;
  box-sizing: border-box;
  z-index: 10;
`;

export const Container = styled.div`
  width: 230px;
  height: 100vh;
  background: #001529;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 15px;
  overflow-y: auto;
`;

export const TitleContainer = styled.div`
  width: 100%;
  padding-left: 15px;
  box-sizing: border-box;
`;

export const TitleTypo = styled(Typography)`
  &&& {
    color: white;
    font-size: 18px;
  }
`;
