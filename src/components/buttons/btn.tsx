import React, {ReactEventHandler, ReactNode} from 'react';

import {CSS} from '@stitches/react';

import {Button} from './btn.styled';

interface PropTypes extends React.ComponentProps<typeof Button> {
  css: CSS;
  children: ReactNode;
  onClick: ReactEventHandler;
}

export const Btn: React.FC<PropTypes> = ({css, children, onClick}) => (
  <Button css={css} onClick={onClick}>
    {children}
  </Button>
);
