import React from 'react';
import { LogoImg, Root, UserInfoTypoWrapper, UserInfoTypo } from './styled';
import logo from 'assets/images/logo.png';
import { Typography } from 'antd';
import useAdminLogin from 'hooks/useAdminLogin';
import AdminLoginModal from 'systems/AdminLoginModal';

const UserInfoContainer = () => {
  const { isLogin, logout } = useAdminLogin();

  if (!isLogin) {
    return <AdminLoginModal />;
  }

  return (
    <Root>
      <LogoImg src={logo} />
      <UserInfoTypoWrapper onClick={logout}>
        <UserInfoTypo>로그아웃</UserInfoTypo>
      </UserInfoTypoWrapper>
    </Root>
  );
};

export default UserInfoContainer;
