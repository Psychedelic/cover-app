import {FC} from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {globalStyles} from '@/themes';

import {CANISTER_NOT_FOUND_ROUTE, SUBMIT_ROUTE} from './constants';
import {CanisterNotFound, Dashboard, SubmitVerification} from './pages';

export const App: FC = () => {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />} path={'*'} />
        <Route element={<SubmitVerification />} path={SUBMIT_ROUTE} />
        <Route element={<CanisterNotFound />} path={CANISTER_NOT_FOUND_ROUTE} />
      </Routes>
    </BrowserRouter>
  );
};
