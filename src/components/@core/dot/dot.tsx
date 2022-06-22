import React from 'react';

import {faCheckCircle, faCircleXmark, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {StitchesDot} from './dot.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesDot> {
  css?: CSS;
  asIcon?: boolean;
}

export const Dot: React.FC<PropTypes> = ({css, asIcon, type, size}) =>
  asIcon ? (
    type === 'green' ? (
      <FontAwesomeIcon color={'#03BF00'} icon={faCheckCircle} size={'lg'} />
    ) : type === 'red' ? (
      <FontAwesomeIcon color={'#ED3357'} icon={faCircleXmark} size={'lg'} />
    ) : type === 'yellow' ? (
      <FontAwesomeIcon color={'#FFDF00'} icon={faExclamationCircle} size={'lg'} />
    ) : (
      <StitchesDot css={css} size={size} type={type} />
    )
  ) : (
    <StitchesDot css={css} size={size} type={type} />
  );
