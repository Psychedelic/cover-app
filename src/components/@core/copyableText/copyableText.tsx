import {ComponentProps, FC, ReactEventHandler, useCallback, useRef, useState} from 'react';

import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {CSS} from '@stitches/react';

import {Core} from '@/components';
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
  const content = useRef(children || '');

  const onClick = useCallback<ReactEventHandler>(_ => {
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
      {rawText ? children : trim(children)}
      {(isClicked || isHovered) && ' '}
      {isClicked ? <Core.Icon icon={faCheck} /> : isHovered && <Core.Icon icon={faCopy} />}
    </StitchesCopyableText>
  );
};
