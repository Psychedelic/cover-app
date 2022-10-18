import {FC} from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {globalStyles} from '@/themes';

import {MY_CANISTER_ROUTE, NOT_FOUND_ROUTE, SUBMIT_ROUTE} from './constants';
import {Dashboard, MyCanister, NotFound, SubmitVerification} from './pages';

export const App: FC = () => {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />} path={'*'} />
        <Route element={<MyCanister />} path={MY_CANISTER_ROUTE} />
        <Route element={<SubmitVerification />} path={SUBMIT_ROUTE} />
        <Route element={<NotFound />} path={NOT_FOUND_ROUTE} />
      </Routes>
    </BrowserRouter>
  );
};
