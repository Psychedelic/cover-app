import {ComponentProps, FC, memo, ReactNode} from 'react';

import {CSS} from '@stitches/react';

import {Core} from '@/components';

import {StitchesTableHeader} from './tableHeader.styled';

interface PropTypes extends ComponentProps<typeof StitchesTableHeader> {
  children?: ReactNode;
  css?: CSS;
}

export const TableHeader: FC<PropTypes> = memo(({css, children}) => (
  <StitchesTableHeader css={css}>
    <tr>
      <th>
        <Core.Dot kind={'hollow'} />
      </th>
      {children}
    </tr>
  </StitchesTableHeader>
));
