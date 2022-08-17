import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'pages/Main';
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
import ScoreClass from 'pages/Score/Class';
import ScoreStudent from 'pages/Score/Student';
import ScorePrint from 'pages/Score/Print';
import MenuWrapping from 'systems/MenuWrapping';
import ProblemRegister from 'pages/Problem/Register';
import ProblemSearch from 'pages/Problem/Search';
import StudentEdit from 'pages/Student/Edit';
import LearningMaterialViewer from 'pages/LearningMaterial/Viewer';
import ToeicExamHistory from 'pages/ToeicExam/History';
import ToeicExamViewer from 'pages/ToeicExam/Viewer';
import ToeicExamSearch from 'pages/ToeicExam/Search';
import ConsultRegister from 'pages/Consult/Register';
import ConsultSearch from 'pages/Consult/Search';

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
      <Routes>
        <Route
          path='/'
          element={
            <MenuWrapping>
              <Main />
            </MenuWrapping>
          }
        />
        <Route
          path='/student/register'
          element={
            <MenuWrapping>
              <StudentRegister />
            </MenuWrapping>
          }
        />
        <Route
          path='/student/edit'
          element={
            <MenuWrapping>
              <StudentEdit />
            </MenuWrapping>
          }
        />
        <Route
          path='/student/rest'
          element={
            <MenuWrapping>
              <StudentRest />
            </MenuWrapping>
          }
        />
        <Route
          path='/student/search'
          element={
            <MenuWrapping>
              <StudentSearch />
            </MenuWrapping>
          }
        />
        <Route
          path='/attendance/search'
          element={
            <MenuWrapping>
              <AttendenceSearch />
            </MenuWrapping>
          }
        />
        <Route
          path='/attendance/register'
          element={
            <MenuWrapping>
              <AttendenceRegister />
            </MenuWrapping>
          }
        />
        <Route
          path='/attendance/graph'
          element={
            <MenuWrapping>
              <AttendenceGraph />
            </MenuWrapping>
          }
        />
        <Route
          path='/learning_material/search'
          element={
            <MenuWrapping>
              <LearningMaterialSearch />
            </MenuWrapping>
          }
        />
        <Route
          path='/learning_material/register'
          element={
            <MenuWrapping>
              <LearningMaterialRegister />
            </MenuWrapping>
          }
        />
        <Route
          path='/toeic_exam/history'
          element={
            <MenuWrapping>
              <ToeicExamHistory />
            </MenuWrapping>
          }
        />
        <Route path='/toeic_exam/viewer' element={<ToeicExamViewer />} />
        <Route
          path='/toeic_exam/search'
          element={
            <MenuWrapping>
              <ToeicExamSearch />
            </MenuWrapping>
          }
        />
        <Route
          path='/score/class'
          element={
            <MenuWrapping>
              <ScoreClass />
            </MenuWrapping>
          }
        />
        <Route
          path='/score/student'
          element={
            <MenuWrapping>
              <ScoreStudent />
            </MenuWrapping>
          }
        />
        <Route
          path='/problem/register'
          element={
            <MenuWrapping>
              <ProblemRegister />
            </MenuWrapping>
          }
        />
        <Route
          path='/problem/search'
          element={
            <MenuWrapping>
              <ProblemSearch />
            </MenuWrapping>
          }
        />
        <Route
          path='/consult/search'
          element={
            <MenuWrapping>
              <ConsultSearch />
            </MenuWrapping>
          }
        />
        <Route
          path='/consult/register'
          element={
            <MenuWrapping>
              <ConsultRegister />
            </MenuWrapping>
          }
        />

        <Route path='/score/print' element={<ScorePrint />} />
        <Route
          path='/learning_material/viewer'
          element={<LearningMaterialViewer />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
