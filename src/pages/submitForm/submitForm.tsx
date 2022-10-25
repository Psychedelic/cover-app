import {FC} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import {AUTOMATIC_SUBMIT_ROUTE, BUILD_CONFIG_SUBMIT_ROUTE, NOT_FOUND_PATH, STANDARD_SUBMIT_ROUTE} from '@/constants';
import {AutoSubmitForm, BuildConfigForm, PageContainer, StandardSubmitForm} from '@/parts';

export const SubmitForm: FC = () => (
  <PageContainer>
    <Routes>
      <Route element={<StandardSubmitForm />} path={STANDARD_SUBMIT_ROUTE} />
      <Route element={<AutoSubmitForm />} path={AUTOMATIC_SUBMIT_ROUTE} />
      <Route element={<BuildConfigForm />} path={BUILD_CONFIG_SUBMIT_ROUTE} />
      <Route element={<Navigate to={NOT_FOUND_PATH} />} path={'*'} />
    </Routes>
  </PageContainer>
);
