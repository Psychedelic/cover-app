import {FC} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import {MY_CANISTER_DETAIL_ROUTE, NOT_FOUND_PATH} from '@/constants';
import {ActivityProvider, StatsProvider, VerificationProvider} from '@/contexts';
import {ActivityTable, PageContainer, StatsTable, VerificationTable} from '@/parts';

import {ContentContainer, ContentContainerOuter, LeftContent, RightContent, Title} from './myCanister.styled';

export const MyCanister: FC = () => (
  <VerificationProvider>
    <PageContainer>
      <ContentContainerOuter>
        <Title>{'My Canisters'}</Title>
        <ContentContainer>
          <LeftContent>
            <Routes>
              <Route element={<VerificationTable />} index />
              <Route element={<VerificationTable />} path={MY_CANISTER_DETAIL_ROUTE} />
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
      </ContentContainerOuter>
    </PageContainer>
  </VerificationProvider>
);
