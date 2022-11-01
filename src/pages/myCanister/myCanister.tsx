import {FC} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import {MY_CANISTER_DETAIL_ROUTE, NOT_FOUND_PATH} from '@/constants';
import {MyActivityProvider, BuildConfigProvider, StatsProvider, useAuthenticationContext} from '@/contexts';
import {BuildConfigTable, MyActivityTable, PageContainer, StatsTable} from '@/parts';

import {ContentContainer, ContentContainerOuter, LeftContent, RightContent, Title} from './myCanister.styled';

export const MyCanister: FC = () => {
  const {
    state: {isPending, isAuthenticated}
  } = useAuthenticationContext();
  return (
    <BuildConfigProvider>
      <PageContainer>
        <ContentContainerOuter>
          {isPending === false && isAuthenticated && <Title>{'My Canisters'}</Title>}
          <ContentContainer>
            <LeftContent>
              <Routes>
                <Route element={<BuildConfigTable />} index />
                <Route element={<BuildConfigTable />} path={MY_CANISTER_DETAIL_ROUTE} />
                <Route element={<Navigate to={NOT_FOUND_PATH} />} path={'*'} />
              </Routes>
            </LeftContent>
            {isPending === false && isAuthenticated && (
              <RightContent>
                <StatsProvider>
                  <StatsTable />
                </StatsProvider>
                <MyActivityProvider>
                  <MyActivityTable />
                </MyActivityProvider>
              </RightContent>
            )}
          </ContentContainer>
        </ContentContainerOuter>
      </PageContainer>
    </BuildConfigProvider>
  );
};
