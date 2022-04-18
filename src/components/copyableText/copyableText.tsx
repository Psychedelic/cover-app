import React, {ReactEventHandler, useCallback, useState} from 'react';

import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {StitchesCopyableText} from './copyableText.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesCopyableText> {
  css?: CSS;
}

export const CopyableText: React.FC<PropTypes> = ({children, css, color}) => {
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
    <StitchesCopyableText
      color={color}
      css={css}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
      &nbsp;
      {isClicked ? <FontAwesomeIcon icon={faCheck} /> : isHovered && <FontAwesomeIcon icon={faCopy} />}
    </StitchesCopyableText>
  );
};

CopyableText.defaultProps = {
  css: {}
};
