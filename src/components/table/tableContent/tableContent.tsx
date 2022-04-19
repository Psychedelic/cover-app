import React, {ReactNode} from 'react';

import {CSS} from '@stitches/react';

import {Core} from '@/components';

import {StitchesTableContent} from './tableContent.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableContent> {
  children?: ReactNode;
  css?: CSS;
}

export const TableContent: React.FC<PropTypes> = ({css, children}) => (
  <StitchesTableContent css={css}>
    <td id={'statusDot'}>
      <Core.Dot type={'hollow'} />
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
