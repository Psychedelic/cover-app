import {createRef, FC, useCallback, useEffect, useRef} from 'react';

import {Link, useNavigate} from 'react-router-dom';

import {logo} from '@/assets';
import {Core, MenuItems, SearchBar, SearchBarHandler, Settings} from '@/components';
import {CANISTER_DETAIL_ROUTE, DASHBOARD_PATH, SUBMIT_PATH} from '@/constants';
import {useVerificationContext} from '@/contexts';
import {getCurrentPath, isPrincipal} from '@/utils';

import {StitchesPageHeaderContainer, StitchesPageMainHeader, StitchesPageSecondaryHeader} from './pageHeader.styled';

export const PageHeader: FC = () => {
  const lastParam = getCurrentPath().split('/').pop() || '';
  const canisterIdParam = isPrincipal(lastParam) ? lastParam : '';
  const lastSearchCanisterId = useRef(canisterIdParam);
  const searchBarRef = createRef<SearchBarHandler>();
  const navigate = useNavigate();
  const {
    state: {isFetching}
  } = useVerificationContext();
  const onBlur = useCallback(
    (value: string) => {
      // Only difference value each time is called can be dispatched
      if (value !== lastSearchCanisterId.current) {
        isPrincipal(value)
          ? navigate(CANISTER_DETAIL_ROUTE.replaceAll(':canisterId', value))
          : value === '' && navigate(DASHBOARD_PATH);
        lastSearchCanisterId.current = value;
      }
    },
    [navigate]
  );
  useEffect(() => {
    if (!canisterIdParam) {
      searchBarRef.current?.clearInput();
      lastSearchCanisterId.current = '';
    }
  }, [searchBarRef, canisterIdParam]);
  return (
    <StitchesPageHeaderContainer>
      <StitchesPageMainHeader>
        <Link to={DASHBOARD_PATH}>
          <img alt={'logo'} src={logo} />
        </Link>
        <SearchBar
          defaultValue={canisterIdParam}
          disabled={isFetching || (getCurrentPath() !== DASHBOARD_PATH && !getCurrentPath().includes('/canister/'))}
          onBlurOrEnter={onBlur}
          ref={searchBarRef}
          validation={isPrincipal}
        />
      </StitchesPageMainHeader>
      <StitchesPageSecondaryHeader>
        <Link to={SUBMIT_PATH}>
          <Core.Button disabled={getCurrentPath() === SUBMIT_PATH}>{'Submit Verification'}</Core.Button>
        </Link>
        <Core.Button disabled>{'Connect to Plug'}</Core.Button>
        <Settings />
        <MenuItems />
      </StitchesPageSecondaryHeader>
    </StitchesPageHeaderContainer>
  );
};
