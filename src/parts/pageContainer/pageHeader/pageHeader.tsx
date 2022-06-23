import React, {useCallback, useRef, useState} from 'react';

import {Principal} from '@dfinity/principal';
import {Link} from 'react-router-dom';

import {logo} from '@/assets';
import {Core, SearchBar} from '@/components';
import {DASHBOARD_PATH, SUBMIT_PATH} from '@/constants';
import {fetchByCanisterId, fetchVerifications, useVerificationContext} from '@/contexts';
import {getCurrentPath, isPrincipal} from '@/utils';

import {MenuItems} from './menuItems';
import {StitchesPageHeaderContainer, StitchesPageMainHeader, StitchesPageSecondaryHeader} from './pageHeader.styled';

export const PageHeader: React.FC = () => {
  const canisterId = useRef('');
  const [isFetching, setIsFetching] = useState(false);
  const {dispatch} = useVerificationContext();
  const onBlur = useCallback(
    (value: string) => {
      // Only difference value each time is called can be dispatched
      if (value !== canisterId.current) {
        setIsFetching(true);
        isPrincipal(value)
          ? fetchByCanisterId(dispatch, Principal.fromText(value)).finally(() => {
              setIsFetching(false);
            })
          : value === '' &&
            fetchVerifications(dispatch).finally(() => {
              setIsFetching(false);
            });
        canisterId.current = value;
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
        <SearchBar
          disabled={isFetching || getCurrentPath() !== DASHBOARD_PATH}
          onBlurOrEnter={onBlur}
          validation={isPrincipal}
        />
      </StitchesPageMainHeader>
      <StitchesPageSecondaryHeader>
        <Link to={SUBMIT_PATH}>
          <Core.Button disabled={getCurrentPath() !== DASHBOARD_PATH}>{'Submit Verification'}</Core.Button>
        </Link>
        <Core.Button disabled>{'Connect to Plug'}</Core.Button>
        <MenuItems />
      </StitchesPageSecondaryHeader>
    </StitchesPageHeaderContainer>
  );
};
