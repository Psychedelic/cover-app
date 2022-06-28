import {ComponentProps, FC} from 'react';

import {CSS} from '@stitches/react';

import {CoverSettingsProvider} from '@/contexts';

import {StitchesPageContainer} from './pageContainer.styled';
import {PageHeader} from './pageHeader';

interface PropTypes extends ComponentProps<typeof StitchesPageContainer> {
  css?: CSS;
}

export const PageContainer: FC<PropTypes> = ({css, children}) => (
  <StitchesPageContainer css={css}>
    <CoverSettingsProvider>
      <PageHeader />
      {children}
    </CoverSettingsProvider>
  </StitchesPageContainer>
);
