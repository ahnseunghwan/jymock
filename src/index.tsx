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
import StudentSearch from 'pages/Student/Search';
import StudentRest from 'pages/Student/Rest';
import StudentRegister from 'pages/Student/Register';
import AttendenceSearch from 'pages/Attendence/Search';
import AttendenceRegister from 'pages/Attendence/Register';
import AttendenceGraph from 'pages/Attendence/Graph';
import LearningMaterialSearch from 'pages/LearningMaterial/Search';
import LearningMaterialRegister from 'pages/LearningMaterial/Register';

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
    <BrowserRouter>
      <Container>
        <MenuContainer />
        <ContentContainer>
          <UserInfoContainer />
          <ContentRouterContainer>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/exam/toeic' element={<ToeicExam />} />
              <Route path='/student/register' element={<StudentRegister />} />
              <Route path='/student/rest' element={<StudentRest />} />
              <Route path='/student/search' element={<StudentSearch />} />
              <Route path='/attendence/search' element={<AttendenceSearch />} />
              <Route
                path='/attendence/register'
                element={<AttendenceRegister />}
              />
              <Route path='/attendence/graph' element={<AttendenceGraph />} />
              <Route
                path='/learning_material/search'
                element={<LearningMaterialSearch />}
              />
              <Route
                path='/learning_material/register'
                element={<LearningMaterialRegister />}
              />
            </Routes>
          </ContentRouterContainer>
        </ContentContainer>
      </Container>
    </BrowserRouter>
  </Provider>
);
