import React from 'react';

import {CSS} from '@stitches/react';

import {Pagination} from '@/components';

import {StitchesTableContainer} from './tableContainer.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableContainer> {
  css?: CSS;
  paginated?: boolean;
}

export const TableContainer: React.FC<PropTypes> = ({css, children, paginated}) => (
  <StitchesTableContainer css={css}>
    <table>{children}</table>
    {paginated && <Pagination />}
  </StitchesTableContainer>
);
