import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesPageContainer} from './pageContainer.styled';
import {PageHeader} from './pageHeader';

interface PropTypes extends React.ComponentProps<typeof StitchesPageContainer> {
  css?: CSS;
}

export const PageContainer: React.FC<PropTypes> = ({css, children}) => (
  <StitchesPageContainer css={css}>
    <PageHeader />
    {children}
  </StitchesPageContainer>
);
