import React from 'react';

import {CSS} from '@stitches/react';

import {Core} from '@/components';

import {StitchesTableHeader} from './tableHeader.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableHeader> {
  children?: React.ReactNode;
  css?: CSS;
}

export const TableHeader: React.FC<PropTypes> = React.memo(({css, children}) => (
  <StitchesTableHeader css={css}>
    <tr>
      <th>
        <Core.Dot type={'hollow'} />
      </th>
      {children}
    </tr>
  </StitchesTableHeader>
));
