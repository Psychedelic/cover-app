import React from 'react';

import {CSS, VariantProps} from '@stitches/react';

import {Core} from '@/components';

import {StitchesTableRow} from './tableRow.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableRow> {
  css?: CSS;
  type?: VariantProps<typeof Core.Dot>;
  children: React.ReactElement<{children: string}>[];
}

export const TableRow: React.FC<PropTypes> = ({css, children, type}) => (
  <StitchesTableRow css={css}>
    <td>
      <Core.Dot type={type} />
    </td>
    {children.map(c => (
      <td key={c.props.children}>{c}</td>
    ))}
  </StitchesTableRow>
);
