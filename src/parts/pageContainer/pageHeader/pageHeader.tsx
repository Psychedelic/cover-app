import {FC, useCallback, useRef} from 'react';

import {Link, useNavigate} from 'react-router-dom';

import {logo} from '@/assets';
import {Core, MenuItems, SearchBar, Settings} from '@/components';
import {CANISTER_DETAIL_PATH, DASHBOARD_PATH, SUBMIT_PATH} from '@/constants';
import {getCurrentPath, isPrincipal} from '@/utils';

import {StitchesPageHeaderContainer, StitchesPageMainHeader, StitchesPageSecondaryHeader} from './pageHeader.styled';

export const PageHeader: FC = () => {
  const canisterIdParam = getCurrentPath().split('/').pop() || '';
  const canisterId = useRef(canisterIdParam);
  const navigate = useNavigate();
  const onBlur = useCallback(
    (value: string) => {
      // Only difference value each time is called can be dispatched
      if (value !== canisterId.current) {
        isPrincipal(value)
          ? navigate(CANISTER_DETAIL_PATH.replaceAll(':canisterId', value), {state: {page: CANISTER_DETAIL_PATH}})
          : value === '' && navigate(DASHBOARD_PATH, {state: {page: DASHBOARD_PATH}});
        canisterId.current = value;
      }
    },
    [navigate]
  );
  return (
    <StitchesPageHeaderContainer>
      <StitchesPageMainHeader>
        <Link to={DASHBOARD_PATH}>
          <img alt={'logo'} src={logo} />
        </Link>
        <SearchBar
          defaultValue={canisterIdParam}
          disabled={getCurrentPath() !== DASHBOARD_PATH && !getCurrentPath().includes('/canister/')}
          onBlurOrEnter={onBlur}
          validation={isPrincipal}
        />
      </StitchesPageMainHeader>
      <StitchesPageSecondaryHeader>
        <Link to={SUBMIT_PATH}>
          <Core.Button disabled={getCurrentPath() !== DASHBOARD_PATH && !getCurrentPath().includes('/canister/')}>
            {'Submit Verification'}
          </Core.Button>
        </Link>
        <Core.Button disabled>{'Connect to Plug'}</Core.Button>
        <Settings />
        <MenuItems />
      </StitchesPageSecondaryHeader>
    </StitchesPageHeaderContainer>
  );
};
