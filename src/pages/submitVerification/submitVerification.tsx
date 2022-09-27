import {FC} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import {AUTOMATIC_SUBMIT_ROUTE, STANDARD_SUBMIT_PATH, STANDARD_SUBMIT_ROUTE} from '@/constants';
import {MultiStepForm, PageContainer} from '@/parts';
import {AutoSubmitForm} from '@/parts/autoSubmitForm/autoSubmitForm';

export const SubmitVerification: FC = () => (
  <PageContainer>
    <Routes>
      <Route element={<MultiStepForm />} path={STANDARD_SUBMIT_ROUTE} />
      <Route element={<AutoSubmitForm />} path={AUTOMATIC_SUBMIT_ROUTE} />
      <Route element={<Navigate to={STANDARD_SUBMIT_PATH} />} path={'*'} />
    </Routes>
  </PageContainer>
);
