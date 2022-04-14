import React from 'react';

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import {globalStyles} from '@/themes';

import {Example} from './views';

export const App: React.VFC = () => {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Example />} path={'/example'} />
        <Route element={<Navigate to={'/example'} />} path={'*'} />
      </Routes>
    </BrowserRouter>
  );
};
