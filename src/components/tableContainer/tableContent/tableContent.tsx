import React, {ReactNode} from 'react';

import {CSS} from '@stitches/react';

import {Dot} from '@/components';

import {StitchesTableContent} from './tableContent.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableContent> {
  children?: ReactNode;
  css?: CSS;
}

export const TableContent: React.FC<PropTypes> = ({css, children}) => (
  <StitchesTableContent css={css}>
    <td id={'statusDot'}>
      <Dot type={'hollow'} />
    </td>
    {(children as Array<string>).map(c => (
      <td key={c}>{c}</td>
    ))}
  </StitchesTableContent>
);

TableContent.defaultProps = {
  css: {},
  children: []
};
