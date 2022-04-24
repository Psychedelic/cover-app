import React from 'react';

import {StitchesPageContainer} from './pageContainer.styled';
import {PageHeader} from './pageHeader';

export const PageContainer: React.FC = ({children}) => (
  <StitchesPageContainer>
    <PageHeader />
    {children}
  </StitchesPageContainer>
);
