import React from 'react';

import {VerificationProvider} from '@/contexts';
import {ActivityTable, PageContainer, StatsTable, VerificationTable} from '@/parts';

import {ContentContainer, LeftContent, RightContent} from './dashboard.styled';

export const Dashboard: React.FC = () => (
  <VerificationProvider>
    <PageContainer>
      <ContentContainer>
        <LeftContent>
          <VerificationTable />
        </LeftContent>
        <RightContent>
          <StatsTable />
          <ActivityTable />
        </RightContent>
      </ContentContainer>
    </PageContainer>
  </VerificationProvider>
);
