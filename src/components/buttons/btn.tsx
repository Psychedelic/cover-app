import React, {ReactEventHandler, ReactNode} from 'react';

import {CSS} from '@stitches/react';

import {Button} from './btn.styled';

type PropTypes = {
  css: CSS;
  children: ReactNode;
  onClick: ReactEventHandler;
};

export const Btn: React.FC<PropTypes> = ({css, children, onClick}) => (
  <Button css={css} onClick={onClick}>
    {children}
  </Button>
);
