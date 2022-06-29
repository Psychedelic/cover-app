import {FC} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import {CANISTER_DETAIL_PATH, DASHBOARD_PATH} from '@/constants';
import {ActivityProvider, StatsProvider, VerificationProvider} from '@/contexts';
import {ActivityTable, PageContainer, StatsTable, VerificationTable} from '@/parts';

import {ContentContainer, LeftContent, RightContent} from './dashboard.styled';

export const Dashboard: FC = () => (
  <VerificationProvider>
    <PageContainer>
      <ContentContainer>
        <LeftContent>
          <Routes>
            <Route element={<VerificationTable />} path={DASHBOARD_PATH} />
            <Route element={<VerificationTable />} path={CANISTER_DETAIL_PATH} />
            <Route element={<Navigate to={DASHBOARD_PATH} />} path={'*'} />
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
