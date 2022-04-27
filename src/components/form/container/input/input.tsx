import React from 'react';

import {CSS} from '@stitches/react';

import {Core} from '@/components';
import {getNameFromLabel} from '@/utils';

import {StitchesFormInput} from './input.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesFormInput> {
  css?: CSS;
  textarea?: boolean;
  label: string;
  rows?: number;
}

export const Input: React.FC<PropTypes> = ({css, textarea, label, rows}) => {
  const name = getNameFromLabel(label);
  return (
    <StitchesFormInput css={css}>
      <label htmlFor={name}>{label}</label>
      {textarea ? <Core.Textarea name={name} rows={rows} /> : <Core.Input name={name} />}
    </StitchesFormInput>
  );
};
