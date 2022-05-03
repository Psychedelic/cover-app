import React from 'react';

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import {globalStyles} from '@/themes';

import {DASHBOARD_PATH, SUBMIT_PATH} from './constants';
import {Dashboard, SubmitVerification} from './pages';

export const App: React.VFC = () => {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SubmitVerification />} path={SUBMIT_PATH} />
        <Route element={<Dashboard />} path={DASHBOARD_PATH} />
        <Route element={<Navigate to={DASHBOARD_PATH} />} path={'*'} />
      </Routes>
    </BrowserRouter>
  );
};
