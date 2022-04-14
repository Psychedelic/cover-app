import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesDot} from './dot.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesDot> {
  css?: CSS;
}

export const Dot: React.FC<PropTypes> = ({css, status}) => <StitchesDot css={css} status={status} />;

Dot.defaultProps = {
  css: {}
};
