import React from 'react';

import {Link} from 'react-router-dom';

import {logo} from '@/assets';
import {Core, SearchBar} from '@/components';
import {DASHBOARD_PATH, SUBMIT_PATH} from '@/constants';
import {getCurrentPath} from '@/utils';

import {StitchesPageHeaderContainer, StitchesPageMainHeader, StitchesPageSecondaryHeader} from './pageHeader.styled';

export const PageHeader: React.VFC = () => (
  <StitchesPageHeaderContainer>
    <StitchesPageMainHeader>
      <Link to={DASHBOARD_PATH}>
        <img alt={'logo'} src={logo} />
      </Link>
      <SearchBar />
      <Core.Button size={'medium'} type={'text'}>
        {'Blog'}
      </Core.Button>
      <Core.Button size={'medium'} type={'text'}>
        {'Docs'}
      </Core.Button>
    </StitchesPageMainHeader>
    <StitchesPageSecondaryHeader>
      <Link to={SUBMIT_PATH}>
        <Core.Button disabled={getCurrentPath() === SUBMIT_PATH}>{'Submit Verification'}</Core.Button>
      </Link>
      <Core.Button>{'Connect to Plug'}</Core.Button>
    </StitchesPageSecondaryHeader>
  </StitchesPageHeaderContainer>
);
