import {FC} from 'react';

import {Link} from 'react-router-dom';

import {canisterNotFound} from '@/assets';
import {Core} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {PageContainer} from '@/parts';

import {containerStyle, ContentContainer} from './canisterNotFound.styled';

export const CanisterNotFound: FC = () => (
  <PageContainer css={containerStyle}>
    <ContentContainer>
      <img alt={'canisterNotFoundLogo'} src={canisterNotFound} />
      <p>{"Unable to find the canister you're looking for"}</p>
      <Link to={DASHBOARD_PATH}>
        <Core.Button size={'medium'}>{' Return to Dashboard '}</Core.Button>
      </Link>
    </ContentContainer>
  </PageContainer>
);
