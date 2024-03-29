import {ComponentProps, FC, ReactEventHandler, useCallback, useRef, useState} from 'react';

import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {trim} from '@/utils';

import {StitchesCopyableText} from './copyableText.styled';

interface PropTypes extends ComponentProps<typeof StitchesCopyableText> {
  css?: CSS;
  rawText?: boolean;
  children?: string;
}

export const CopyableText: FC<PropTypes> = ({children, css, color, rawText}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef(children || '');

  const onClick = useCallback<ReactEventHandler>(_ => {
    navigator.clipboard.writeText(contentRef.current);
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
      {rawText ? children : trim(children)}
      {(isClicked || isHovered) && ' '}
      {isClicked ? <FontAwesomeIcon icon={faCheck} /> : isHovered && <FontAwesomeIcon icon={faCopy} />}
    </StitchesCopyableText>
  );
};
