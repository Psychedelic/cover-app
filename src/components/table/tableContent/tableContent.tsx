import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesTableContent} from './tableContent.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableContent> {
  css?: CSS;
}

export const TableContent: React.FC<PropTypes> = ({css, children}) => (
  <StitchesTableContent css={css}>{children}</StitchesTableContent>
);
