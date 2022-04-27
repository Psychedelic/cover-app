import React from 'react';

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import {globalStyles} from '@/themes';

import {Dashboard, SubmitVerification} from './pages';

export const App: React.VFC = () => {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SubmitVerification />} path={'/submit'} />
        <Route element={<Dashboard />} path={'/'} />
        <Route element={<Navigate to={'/'} />} path={'*'} />
      </Routes>
    </BrowserRouter>
  );
};
