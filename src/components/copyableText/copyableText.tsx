import React, {ReactEventHandler, useCallback, useState} from 'react';

import {CheckIcon, ClipboardIcon} from '@radix-ui/react-icons';
import {CSS} from '@stitches/react';

import {StitchesCopyableText} from './copyableText.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesCopyableText> {
  css?: CSS;
}

export const CopyableText: React.FC<PropTypes> = ({children, css}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onClick: ReactEventHandler = useCallback(
    e => {
      navigator.clipboard.writeText((e.target as HTMLSpanElement).innerHTML);
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 1000);
    },
    [setIsClicked]
  );

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, [setIsHovered]);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, [setIsHovered]);

  return (
    <StitchesCopyableText css={css} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      &nbsp;
      {isClicked ? <CheckIcon /> : isHovered && <ClipboardIcon />}
    </StitchesCopyableText>
  );
};

CopyableText.defaultProps = {
  css: {}
};
