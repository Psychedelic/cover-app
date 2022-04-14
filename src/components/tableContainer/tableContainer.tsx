import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesTableContainer} from './tableContainer.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableContainer> {
  css?: CSS;
}

export const TableContainer: React.FC<PropTypes> = ({css, children}) => (
  <StitchesTableContainer css={css}>{children}</StitchesTableContainer>
);

TableContainer.defaultProps = {
  css: {}
};
