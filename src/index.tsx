import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'pages/Main';
import ToeicExam from 'pages/Exam/Toeic';
import { store } from 'features';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/exam/toeic' element={<ToeicExam />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
