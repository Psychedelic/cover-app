import {FC, useCallback, useEffect, useRef} from 'react';

import {Link, useNavigate} from 'react-router-dom';

import {logo} from '@/assets';
import {Core, MenuItems, SearchBar, SearchBarHandler, Settings} from '@/components';
import {CANISTER_DETAIL_ROUTE, DASHBOARD_PATH, MY_CANISTER_DETAIL_ROUTE, MY_CANISTER_PATH} from '@/constants';
import {
  authenticate,
  logOut,
  useAuthenticationContext,
  useBuildConfigContext,
  useVerificationContext
} from '@/contexts';
import {
  getCurrentPath,
  isCanisterDetailPage,
  isDashboardPage,
  isMyCanisterDetailPage,
  isMyCanisterPage,
  isPrincipal
} from '@/utils';

import {AuthenticatedBtn} from './authenticatedBtn';
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
  const lastSearchCanisterIdRef = useRef(canisterIdParam);
  const searchBarRef = useRef<SearchBarHandler>(null);
  const navigate = useNavigate();
  const {
      state: {isFetching: isVerificationFetching}
    } = useVerificationContext(),
    {
      state: {isFetching: isBuildConfigFetching}
    } = useBuildConfigContext(),
    {
      state: {isPending, isAuthenticated, pid},
      dispatch
    } = useAuthenticationContext();
  const onBlur = useCallback(
      (value: string) => {
        // Only difference value each time is called can be dispatched
        if (value !== lastSearchCanisterIdRef.current) {
          isPrincipal(value)
            ? navigate(
                (isDashboardPage() || isCanisterDetailPage()
                  ? CANISTER_DETAIL_ROUTE
                  : MY_CANISTER_DETAIL_ROUTE
                ).replaceAll(':canisterId', value)
              )
            : value === '' && navigate(isCanisterDetailPage() ? DASHBOARD_PATH : MY_CANISTER_PATH);
          lastSearchCanisterIdRef.current = value;
        }
      },
      [navigate]
    ),
    onAuthenticate = useCallback(() => {
      authenticate(dispatch);
    }, [dispatch]),
    onLogOut = useCallback(() => {
      logOut(dispatch);
      if (isMyCanisterPage() || isMyCanisterDetailPage()) {
        navigate(DASHBOARD_PATH);
      }
    }, [dispatch, navigate]);

  useEffect(() => {
    if (!canisterIdParam) {
      searchBarRef.current?.clearInput();
      lastSearchCanisterIdRef.current = '';
    }
  }, [canisterIdParam]);

  return (
    <StitchesPageHeaderContainer>
      <StitchesPageMainHeader>
        <Link to={DASHBOARD_PATH}>
          <img alt={'logo'} src={logo} />
        </Link>
        <SearchBar
          defaultValue={canisterIdParam}
          disabled={
            isVerificationFetching ||
            isBuildConfigFetching ||
            !(isDashboardPage() || isCanisterDetailPage() || isMyCanisterPage() || isMyCanisterDetailPage())
          }
          onBlurOrEnter={onBlur}
          ref={searchBarRef}
          validation={isPrincipal}
        />
      </StitchesPageMainHeader>
      <StitchesPageSecondaryHeader>
        <SubmitBtn />
        {isPending ? (
          <Core.Button disabled kind={'text'}>
            {'Loading...'}
          </Core.Button>
        ) : isAuthenticated ? (
          <AuthenticatedBtn onLogOut={onLogOut} pid={pid as string} />
        ) : (
          <Core.Button onClick={onAuthenticate}>{'Connect to Plug'}</Core.Button>
        )}
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
