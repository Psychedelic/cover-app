import React from 'react';

import {ActivityProvider, VerificationProvider} from '@/contexts';
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
          <ActivityProvider>
            <ActivityTable />
          </ActivityProvider>
        </RightContent>
      </ContentContainer>
    </PageContainer>
  </VerificationProvider>
);
