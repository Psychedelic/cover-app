import React, {useCallback, useRef, useState} from 'react';

import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {trim} from '@/utils';

import {StitchesCopyableText} from './copyableText.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesCopyableText> {
  css?: CSS;
  showRaw?: boolean;
  children?: string;
}

export const CopyableText: React.FC<PropTypes> = React.memo(({children, css, color, showRaw}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const content = useRef(children || '');

  const onClick = useCallback(_ => {
    navigator.clipboard.writeText(content.current);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  }, []);

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <StitchesCopyableText
      color={color}
      css={css}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {showRaw ? children : trim(children)}
      {(isClicked || isHovered) && ' '}
      {isClicked ? <FontAwesomeIcon icon={faCheck} /> : isHovered && <FontAwesomeIcon icon={faCopy} />}
    </StitchesCopyableText>
  );
});
