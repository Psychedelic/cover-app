import React from 'react';

import {logo} from '@/assets';
import {SearchBar} from '@/parts';

import {StitchesHeaderContainer, StitchesMainHeader, StitchesSecondaryHeader} from './header.styled';

export const Header: React.VFC = () => (
  <StitchesHeaderContainer>
    <StitchesMainHeader>
      <img alt={'logo'} src={logo} />
      <SearchBar />
    </StitchesMainHeader>
    <StitchesSecondaryHeader />
  </StitchesHeaderContainer>
);
