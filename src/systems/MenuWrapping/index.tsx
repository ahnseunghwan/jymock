import React from 'react';
import MenuContainer from 'systems/MenuContainer';
import UserInfoContainer from 'systems/UserInfoContainer';
import { Container, ContentContainer, ContentRouterContainer } from './styled';

type Props = {
  children: any;
};

const MenuWrapping: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <MenuContainer />
      <ContentContainer>
        <UserInfoContainer />
        <ContentRouterContainer>{children}</ContentRouterContainer>
      </ContentContainer>
    </Container>
  );
};

export default MenuWrapping;
