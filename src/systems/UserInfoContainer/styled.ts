import { Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-left: 32px;
  padding-right: 100px;
  box-sizing: border-box;
  margin-top: 20px;
`;

export const LogoImg = styled.img`
  width: 200px;
`;

export const UserInfoTypoWrapper = styled.div`
  padding: 5px 30px;
  border: 1px #3669c4 solid;
  border-radius: 30px;
  cursor: pointer;
`;

export const UserInfoTypo = styled(Typography)`
  &&& {
    font-size: 16px;
    font-weight: 500;
    color: #3669c4;
  }
`;
