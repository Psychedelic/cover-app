import React from 'react';

import {CSS, VariantProps} from '@stitches/react';

import {Core} from '@/components';

import {StitchesTableRow} from './tableRow.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableRow> {
  css?: CSS;
  type?: VariantProps<typeof Core.Dot>;
  children: React.ReactElement[];
  override?: boolean;
}

export const TableRow: React.FC<PropTypes> = ({css, children, type, override}) => (
  <StitchesTableRow css={css}>
    {type && (
      <td>
        <Core.Dot type={type} />
      </td>
    )}
    {children.map(c => (override ? c : <td key={c.key}>{c}</td>))}
  </StitchesTableRow>
);
