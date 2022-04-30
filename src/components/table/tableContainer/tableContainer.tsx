import React from 'react';

import {CSS} from '@stitches/react';

import {Pagination} from '@/components';

import {StitchesTableContainer} from './tableContainer.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableContainer> {
  css?: CSS;
  paginated?: boolean;
  onPageChanged?: (toPage: number) => void;
  lastPage?: number;
}

export const TableContainer: React.FC<PropTypes> = ({css, children, paginated, onPageChanged, lastPage}) => (
  <StitchesTableContainer css={css}>
    <table>{children}</table>
    {paginated && <Pagination lastPage={lastPage} onPageChanged={onPageChanged} />}
  </StitchesTableContainer>
);
