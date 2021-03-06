import {ComponentProps, forwardRef} from 'react';

import {CSS} from '@stitches/react';

import {Pagination, PaginationHandler} from '@/components';

import {StitchesTableContainer} from './tableContainer.styled';

interface PropTypes extends ComponentProps<typeof StitchesTableContainer> {
  css?: CSS;
  paginated?: boolean;
  onPageChanged?: (toPage: number) => void;
  totalPage?: number;
  disablePaginated?: boolean;
}

export const TableContainer = forwardRef<PaginationHandler, PropTypes>(
  ({css, children, paginated, onPageChanged, totalPage, disablePaginated}, ref) => (
    <StitchesTableContainer css={css}>
      <table>{children}</table>
      {paginated && (
        <Pagination disablePaginated={disablePaginated} onPageChanged={onPageChanged} ref={ref} totalPage={totalPage} />
      )}
    </StitchesTableContainer>
  )
);
