import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesInput} from './input.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesInput> {
  css?: CSS;
  placeholder?: string;
}

export const Input: React.FC<PropTypes> = ({css, placeholder}) => <StitchesInput css={css} placeholder={placeholder} />;

Input.defaultProps = {
  css: {},
  placeholder: ''
};
