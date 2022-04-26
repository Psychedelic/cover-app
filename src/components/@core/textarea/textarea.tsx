import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesTextarea} from './textarea.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTextarea> {
  css?: CSS;
  rows?: number;
}

export const Textarea: React.FC<PropTypes> = ({css, rows}) => <StitchesTextarea css={css} rows={rows} />;
