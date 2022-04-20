import React from 'react';

import {CSS} from '@stitches/react';

import {Core} from '@/components';

import {StitchesTableHeader} from './tableHeader.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableHeader> {
  children?: string[];
  css?: CSS;
}

export const TableHeader: React.FC<PropTypes> = ({css, children}) => (
  <StitchesTableHeader css={css}>
    <tr>
      <th>
        <Core.Dot type={'hollow'} />
      </th>
      {children?.map(c => (
        <th key={c}>{c}</th>
      ))}
    </tr>
  </StitchesTableHeader>
);
