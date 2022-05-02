import React, {useCallback, useRef} from 'react';

import {Principal} from '@dfinity/principal';
import {Link} from 'react-router-dom';

import {logo} from '@/assets';
import {Core, SearchBar} from '@/components';
import {DASHBOARD_PATH, SUBMIT_PATH} from '@/constants';
import {fetchVerifications, getByCanisterId, useVerificationContext} from '@/contexts';
import {getCurrentPath, isPrincipal} from '@/utils';

import {StitchesPageHeaderContainer, StitchesPageMainHeader, StitchesPageSecondaryHeader} from './pageHeader.styled';

export const PageHeader: React.VFC = () => {
  const recentValue = useRef('');
  const {dispatch} = useVerificationContext();
  const onBlur = useCallback(
    (value: string) => {
      // Only difference value each time is called can be dispatched
      if (value !== recentValue.current) {
        isPrincipal(value)
          ? getByCanisterId(dispatch, Principal.fromText(value))
          : value === '' && fetchVerifications(dispatch);
        recentValue.current = value;
      }
    },
    [dispatch]
  );
  return (
    <StitchesPageHeaderContainer>
      <StitchesPageMainHeader>
        <Link to={DASHBOARD_PATH}>
          <img alt={'logo'} src={logo} />
        </Link>
        <SearchBar onBlur={onBlur} validation={isPrincipal} />
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
};
