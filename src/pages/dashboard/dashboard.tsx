import {FC} from 'react';

import {ActivityProvider, StatsProvider, VerificationProvider} from '@/contexts';
import {ActivityTable, PageContainer, StatsTable, VerificationTable} from '@/parts';

import {ContentContainer, LeftContent, RightContent} from './dashboard.styled';

export const Dashboard: FC = () => (
  <VerificationProvider>
    <PageContainer>
      <ContentContainer>
        <LeftContent>
          <VerificationTable />
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
