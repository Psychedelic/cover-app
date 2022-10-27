import {FC} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import {MY_CANISTER_DETAIL_ROUTE, NOT_FOUND_PATH} from '@/constants';
import {ActivityProvider, BuildConfigProvider, StatsProvider} from '@/contexts';
import {BuildConfigTable, MyActivityTable, PageContainer, StatsTable} from '@/parts';

import {ContentContainer, ContentContainerOuter, LeftContent, RightContent, Title} from './myCanister.styled';

export const MyCanister: FC = () => (
  <BuildConfigProvider>
    <PageContainer>
      <ContentContainerOuter>
        <Title>{'My Canisters'}</Title>
        <ContentContainer>
          <LeftContent>
            <Routes>
              <Route element={<BuildConfigTable />} index />
              <Route element={<BuildConfigTable />} path={MY_CANISTER_DETAIL_ROUTE} />
              <Route element={<Navigate to={NOT_FOUND_PATH} />} path={'*'} />
            </Routes>
          </LeftContent>
          <RightContent>
            <StatsProvider>
              <StatsTable />
            </StatsProvider>
            <ActivityProvider>
              <MyActivityTable />
            </ActivityProvider>
          </RightContent>
        </ContentContainer>
      </ContentContainerOuter>
    </PageContainer>
  </BuildConfigProvider>
);
