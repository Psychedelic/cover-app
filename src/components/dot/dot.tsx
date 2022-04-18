import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesDot} from './dot.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesDot> {
  css?: CSS;
}

export const Dot: React.VFC<PropTypes> = ({css, type}) => <StitchesDot css={css} type={type} />;
