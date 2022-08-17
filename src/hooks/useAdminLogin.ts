import { message } from 'antd';
import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';

const useAdminLogin = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const logout = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };
  const login =
    ({ username, password }: { username: string; password: string }) =>
    () => {
      commonAxios({
        url: `auth/login`,
        method: 'POST',
        data: { username, password },
      })
        .then((res) => {
          localStorage.setItem('access_token', res.data.user.id);
          window.location.reload();
        })
        .catch(() => {
          message.error('등록되지 않은 유저입니다.');
        });
    };

  useEffect(() => {
    setIsLogin(!!localStorage.getItem('access_token'));
  }, []);

  return {
    isLogin,
    login,
    logout,
  };
};

export default useAdminLogin;
