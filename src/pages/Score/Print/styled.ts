import { Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  box-sizing: border-box;
  padding-bottom: 300px;
`;

export const Container = styled.div`
  padding: 10px;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  position: relative;
`;

export const TitleLogoImg = styled.img`
  width: 80px;
  position: absolute;
  top: 5px;
  left: 0;
`;

export const TitleTypo = styled(Typography.Title)``;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const TestContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;
