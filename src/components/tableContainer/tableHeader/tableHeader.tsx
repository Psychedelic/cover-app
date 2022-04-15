import React, {ReactNode} from 'react';

import {CSS} from '@stitches/react';

import {Dot} from '@/components';

import {StitchesTableHeader} from './tableHeader.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableHeader> {
  children?: ReactNode;
  css?: CSS;
}

export const TableHeader: React.FC<PropTypes> = ({css, children}) => (
  <StitchesTableHeader css={css}>
    <th id={'statusDot'}>
      <Dot type={'hollow'} />
    </th>
    {(children as Array<string>).map(c => (
      <th key={c}>{c}</th>
    ))}
  </StitchesTableHeader>
);

TableHeader.defaultProps = {
  css: {},
  children: []
};
