import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'pages/Main';
import ToeicExam from 'pages/Exam/Toeic';
import { store } from 'features';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import MenuContainer from 'systems/MenuContainer';
import styled from 'styled-components';
import UserInfoContainer from 'systems/UserInfoContainer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentRouterContainer = styled.div`
  padding-top: 20px;
  padding-left: 40px;
  box-sizing: border-box;
`;

root.render(
  <Provider store={store}>
    <Container>
      <MenuContainer />
      <ContentContainer>
        <UserInfoContainer />
        <ContentRouterContainer>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/exam/toeic' element={<ToeicExam />} />
            </Routes>
          </BrowserRouter>
        </ContentRouterContainer>
      </ContentContainer>
    </Container>
  </Provider>
);
