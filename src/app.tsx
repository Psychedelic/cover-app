import {FC} from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {globalStyles} from '@/themes';

import {SUBMIT_PATH} from './constants';
import {Dashboard, SubmitVerification} from './pages';

export const App: FC = () => {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />} path={'*'} />
        <Route element={<SubmitVerification />} path={SUBMIT_PATH} />
      </Routes>
    </BrowserRouter>
  );
};
