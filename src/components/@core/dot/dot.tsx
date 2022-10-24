import {ComponentProps, FC} from 'react';

import {faCheckCircle, faCircleDot, faCircleXmark, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {StitchesDot} from './dot.styled';

interface PropTypes extends ComponentProps<typeof StitchesDot> {
  css?: CSS;
  asIcon?: boolean;
}

export const Dot: FC<PropTypes> = ({css, asIcon, kind, size}) =>
  asIcon ? (
    kind === 'green' ? (
      <FontAwesomeIcon color={'#03BF00'} icon={faCheckCircle} size={'lg'} />
    ) : kind === 'red' ? (
      <FontAwesomeIcon color={'#ED3357'} icon={faCircleXmark} size={'lg'} />
    ) : kind === 'yellow' ? (
      <FontAwesomeIcon color={'#FFDF00'} icon={faExclamationCircle} size={'lg'} />
    ) : kind === 'gray' ? (
      <FontAwesomeIcon color={'#BFBFBE'} icon={faCircleDot} size={'lg'} />
    ) : (
      <StitchesDot css={css} kind={kind} size={size} />
    )
  ) : (
    <StitchesDot css={css} kind={kind} size={size} />
  );
