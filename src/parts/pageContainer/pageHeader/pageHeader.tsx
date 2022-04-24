import React from 'react';

import {logo} from '@/assets';
import {Core, SearchBar} from '@/components';

import {StitchesPageHeaderContainer, StitchesPageMainHeader, StitchesPageSecondaryHeader} from './pageHeader.styled';

export const PageHeader: React.VFC = () => (
  <StitchesPageHeaderContainer>
    <StitchesPageMainHeader>
      <img alt={'logo'} src={logo} />
      <SearchBar />
      <Core.Button size={'medium'} type={'text'}>
        {'Blog'}
      </Core.Button>
      <Core.Button size={'medium'} type={'text'}>
        {'Docs'}
      </Core.Button>
    </StitchesPageMainHeader>
    <StitchesPageSecondaryHeader>
      <Core.Button>{'Connect to Plug'}</Core.Button>
    </StitchesPageSecondaryHeader>
  </StitchesPageHeaderContainer>
);
