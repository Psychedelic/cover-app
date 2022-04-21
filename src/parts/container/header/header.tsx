import React from 'react';

import {logo} from '@/assets';
import {Core, SearchBar} from '@/components';

import {StitchesHeaderContainer, StitchesMainHeader, StitchesSecondaryHeader} from './header.styled';

export const Header: React.VFC = () => (
  <StitchesHeaderContainer>
    <StitchesMainHeader>
      <img alt={'logo'} src={logo} />
      <SearchBar />
      <Core.Button size={'medium'} type={'text'}>
        {'Blog'}
      </Core.Button>
      <Core.Button size={'medium'} type={'text'}>
        {'Docs'}
      </Core.Button>
    </StitchesMainHeader>
    <StitchesSecondaryHeader>
      <Core.Button>{'Connect to Plug'}</Core.Button>
    </StitchesSecondaryHeader>
  </StitchesHeaderContainer>
);
