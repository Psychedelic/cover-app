import {ComponentProps, FC} from 'react';

import {faCheckCircle, faCircleDot, faCircleXmark, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {CSS} from '@stitches/react';

import {Core} from '@/components';

import {StitchesDot} from './dot.styled';

interface PropTypes extends ComponentProps<typeof StitchesDot> {
  css?: CSS;
  asIcon?: boolean;
}

export const Dot: FC<PropTypes> = ({css, asIcon, kind, size}) =>
  asIcon ? (
    kind === 'green' ? (
      <Core.Icon color={'#03BF00'} icon={faCheckCircle} size={'lg'} />
    ) : kind === 'red' ? (
      <Core.Icon color={'#ED3357'} icon={faCircleXmark} size={'lg'} />
    ) : kind === 'yellow' ? (
      <Core.Icon color={'#FFDF00'} icon={faExclamationCircle} size={'lg'} />
    ) : kind === 'gray' ? (
      <Core.Icon color={'#BFBFBE'} icon={faCircleDot} size={'lg'} />
    ) : (
      <StitchesDot css={css} kind={kind} size={size} />
    )
  ) : (
    <StitchesDot css={css} kind={kind} size={size} />
  );
