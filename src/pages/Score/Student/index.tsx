import React, { useState } from 'react';
import { MenuContainer, Root, TitleTypo } from './styled';
import { useNavigate } from 'react-router-dom';

const ScoreStudent = () => {
  const navigate = useNavigate();

  return (
    <Root>
      <TitleTypo level={2}>학생별 성적표</TitleTypo>
      <MenuContainer></MenuContainer>
    </Root>
  );
};

export default ScoreStudent;
