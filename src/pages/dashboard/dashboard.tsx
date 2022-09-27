import {FC} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import {CANISTER_DETAIL_ROUTE, NOT_FOUND_PATH} from '@/constants';
import {ActivityProvider, StatsProvider, VerificationProvider} from '@/contexts';
import {ActivityTable, PageContainer, StatsTable, VerificationTable} from '@/parts';

import {ContentContainer, LeftContent, RightContent} from './dashboard.styled';

export const Dashboard: FC = () => (
  <VerificationProvider>
    <PageContainer>
      <ContentContainer>
        <LeftContent>
          <Routes>
            <Route element={<VerificationTable />} index />
            <Route element={<VerificationTable />} path={CANISTER_DETAIL_ROUTE} />
            <Route element={<Navigate to={NOT_FOUND_PATH} />} path={'*'} />
          </Routes>
        </LeftContent>
        <RightContent>
          <StatsProvider>
            <StatsTable />
          </StatsProvider>
          <ActivityProvider>
            <ActivityTable />
          </ActivityProvider>
        </RightContent>
      </ContentContainer>
    </PageContainer>
  </VerificationProvider>
);
