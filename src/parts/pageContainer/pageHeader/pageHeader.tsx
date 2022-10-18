import {createRef, FC, useCallback, useEffect, useRef} from 'react';

import {Link, useNavigate} from 'react-router-dom';

import {logo} from '@/assets';
import {Core, MenuItems, SearchBar, SearchBarHandler, Settings} from '@/components';
import {CANISTER_DETAIL_ROUTE, DASHBOARD_PATH, MY_CANISTER_DETAIL_ROUTE, MY_CANISTER_PATH} from '@/constants';
import {useVerificationContext} from '@/contexts';
import {
  getCurrentPath,
  isCanisterDetailPage,
  isDashboardPage,
  isMyCanisterDetailPage,
  isMyCanisterPage,
  isPrincipal
} from '@/utils';

import {
  feedbackBtnCss,
  StitchesPageHeaderContainer,
  StitchesPageMainHeader,
  StitchesPageSecondaryHeader
} from './pageHeader.styled';
import {SubmitBtn} from './submitBtn';

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
          ? navigate(
              (isDashboardPage() ? CANISTER_DETAIL_ROUTE : MY_CANISTER_DETAIL_ROUTE).replaceAll(':canisterId', value)
            )
          : value === '' && navigate(isCanisterDetailPage() ? DASHBOARD_PATH : MY_CANISTER_PATH);
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
          disabled={
            isFetching ||
            !(isDashboardPage() || isCanisterDetailPage() || isMyCanisterPage() || isMyCanisterDetailPage())
          }
          onBlurOrEnter={onBlur}
          ref={searchBarRef}
          validation={isPrincipal}
        />
      </StitchesPageMainHeader>
      <StitchesPageSecondaryHeader>
        <SubmitBtn />
        <Core.Button disabled>{'Connect to Plug'}</Core.Button>
        <Settings />
        <MenuItems />
        <Core.Button css={feedbackBtnCss} kind={'text'}>
          <a
            href={'https://docs.google.com/forms/d/e/1FAIpQLSfPhVkcatRQWZr3hPyv3Hv8lkrqeYPtEFB-20bMPOKoiYl5ow/viewform'}
            rel={'noreferrer'}
            target={'_blank'}>
            {'Send Feedback'}
          </a>
        </Core.Button>
      </StitchesPageSecondaryHeader>
    </StitchesPageHeaderContainer>
  );
};
