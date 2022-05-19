import React from 'react';

import {CSS} from '@stitches/react';

import {Pagination} from '@/components';

import {StitchesTableContainer} from './tableContainer.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableContainer> {
  css?: CSS;
  paginated?: boolean;
  onPageChanged?: (toPage: number) => void;
  lastPage?: number;
  disablePaginated?: boolean;
}

export const TableContainer: React.FC<PropTypes> = ({
  css,
  children,
  paginated,
  onPageChanged,
  lastPage,
  disablePaginated
}) => (
  <StitchesTableContainer css={css}>
    <table>{children}</table>
    {paginated ? (
      <Pagination disablePaginated={disablePaginated} lastPage={lastPage} onPageChanged={onPageChanged} />
    ) : null}
  </StitchesTableContainer>
);
