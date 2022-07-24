import { RootState } from 'features';
import React from 'react';
import { useSelector } from 'react-redux';
import { Root } from './styled';

const Menu = () => {
  const [select] = useSelector((state: RootState) => [state.common.select]);

  return <Root>{select}</Root>;
};

export default Menu;
