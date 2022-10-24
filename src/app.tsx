import {FC, useEffect} from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {MY_CANISTER_ROUTE, NOT_FOUND_ROUTE, SUBMIT_ROUTE} from './constants';
import {useAuthenticationContext, verifyPlugAuthentication} from './contexts';
import {Dashboard, MyCanister, NotFound, SubmitForm} from './pages';

export const App: FC = () => {
  const {dispatch} = useAuthenticationContext();
  useEffect(() => {
    verifyPlugAuthentication(dispatch);
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />} path={'*'} />
        <Route element={<MyCanister />} path={MY_CANISTER_ROUTE} />
        <Route element={<SubmitForm />} path={SUBMIT_ROUTE} />
        <Route element={<NotFound />} path={NOT_FOUND_ROUTE} />
      </Routes>
    </BrowserRouter>
  );
};
