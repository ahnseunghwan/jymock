import React, { useEffect } from 'react';
import { Root } from './styled';

const Main = () => {
  useEffect(() => {
    window.location.replace('/student/search');
  }, []);

  return <Root></Root>;
};

export default Main;
