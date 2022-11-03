import {FC} from 'react';

import {Navigate, Route, Routes} from 'react-router-dom';

import {MY_CANISTER_DETAIL_ROUTE, NOT_FOUND_PATH} from '@/constants';
import {BuildConfigProvider, MyActivityProvider, MyStatsProvider, useAuthenticationContext} from '@/contexts';
import {BuildConfigTable, MyActivityTable, MyStatsTable, PageContainer} from '@/parts';

import {ContentContainer, ContentContainerOuter, LeftContent, RightContent, Title} from './myCanister.styled';

export const MyCanister: FC = () => {
  const {
    state: {isFetching, isAuthenticated}
  } = useAuthenticationContext();
  return (
    <BuildConfigProvider>
      <PageContainer>
        <ContentContainerOuter>
          {isFetching === false && isAuthenticated && <Title>{'My Canisters'}</Title>}
          <ContentContainer>
            <LeftContent>
              <Routes>
                <Route element={<BuildConfigTable />} index />
                <Route element={<BuildConfigTable />} path={MY_CANISTER_DETAIL_ROUTE} />
                <Route element={<Navigate to={NOT_FOUND_PATH} />} path={'*'} />
              </Routes>
            </LeftContent>
            {isFetching === false && isAuthenticated && (
              <RightContent>
                <MyStatsProvider>
                  <MyStatsTable />
                </MyStatsProvider>
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
