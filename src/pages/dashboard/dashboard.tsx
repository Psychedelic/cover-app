import {FC} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import {CANISTER_DETAIL_ROUTE, DASHBOARD_ROUTE} from '@/constants';
import {ActivityProvider, StatsProvider, VerificationProvider} from '@/contexts';
import {ActivityTable, PageContainer, StatsTable, VerificationTable} from '@/parts';

import {ContentContainer, LeftContent, RightContent} from './dashboard.styled';

export const Dashboard: FC = () => (
  <PageContainer>
    <ContentContainer>
      <LeftContent>
        <VerificationProvider>
          <Routes>
            <Route element={<VerificationTable />} path={DASHBOARD_ROUTE} />
            <Route element={<VerificationTable />} path={CANISTER_DETAIL_ROUTE} />
            <Route element={<Navigate to={DASHBOARD_ROUTE} />} path={'*'} />
          </Routes>
        </VerificationProvider>
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
);
