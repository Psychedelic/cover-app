import {FC} from 'react';

import {Link} from 'react-router-dom';

import {notFound} from '@/assets';
import {Core} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {PageContainer} from '@/parts';

import {containerStyle, ContentContainer} from './notFound.styled';

export const NotFound: FC = () => (
  <PageContainer css={containerStyle}>
    <ContentContainer>
      <img alt={'notFoundLogo'} src={notFound} />
      <p>{'Unable to find the page you are looking for'}</p>
      <Link to={DASHBOARD_PATH}>
        <Core.Button size={'medium'}>{' Return to Dashboard '}</Core.Button>
      </Link>
    </ContentContainer>
  </PageContainer>
);
