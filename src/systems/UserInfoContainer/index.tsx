import React from 'react';
import { LogoImg, Root, UserInfoTypoWrapper, UserInfoTypo } from './styled';
import logo from 'assets/images/logo.png';
import { Typography } from 'antd';

const UserInfoContainer = () => {
  return (
    <Root>
      <LogoImg src={logo} />
      <UserInfoTypoWrapper>
        <UserInfoTypo>admin@gmail.com</UserInfoTypo>
      </UserInfoTypoWrapper>
    </Root>
  );
};

export default UserInfoContainer;
