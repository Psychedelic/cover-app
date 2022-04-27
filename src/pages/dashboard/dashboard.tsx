import React from 'react';

import {ActivityTable, PageContainer, StatsTable, VerificationTable} from '@/parts';

import {ContentContainer, LeftContent, RightContent} from './dashboard.styled';

export const Dashboard: React.VFC = () => (
  <PageContainer>
    <ContentContainer>
      <LeftContent>
        <VerificationTable verifications={[{}, {}, {}]} />
      </LeftContent>
      <RightContent>
        <StatsTable />
        <ActivityTable activities={[{}, {}, {}]} />
      </RightContent>
    </ContentContainer>
  </PageContainer>
);
