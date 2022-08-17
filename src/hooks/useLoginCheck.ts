import React, { useEffect, useState } from 'react';

const useLoginCheck = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    setIsLogin(!!localStorage.getItem('user_id'));
  }, []);

  return {
    isLogin,
  };
};

export default useLoginCheck;
