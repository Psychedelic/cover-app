import React, {useCallback, useRef, useState} from 'react';

import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {Core} from '@/components';
import {isPositiveNum} from '@/utils';

import {StitchesPagination} from './pagination.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesPagination> {
  css?: CSS;
  defaultPage?: string;
}

export const Pagination: React.VFC<PropTypes> = ({css, defaultPage = '1'}) => {
  const [isFirstPage, setIsFirstPage] = useState(defaultPage === '1');
  const recentValue = useRef(defaultPage);
  const leftBtn = useRef(null);
  const rightBtn = useRef(null);
  const inputRef = useRef(null);

  const onBlur = useCallback(_ => {
    if (inputRef.current) {
      const input = inputRef.current as HTMLInputElement;
      const newValue = isPositiveNum(input.value) ? input.value : recentValue.current;
      input.value = newValue;
      setIsFirstPage(newValue === '1');
      recentValue.current = newValue;
    }
  }, []);

  const onChange = useCallback(_ => {
    if (inputRef.current) {
      const value = (inputRef.current as HTMLInputElement).value;
      if (isPositiveNum(value)) {
        recentValue.current = value;
      }
    }
  }, []);

  const onBtnClick = useCallback(({target}) => {
    const isMinus = leftBtn.current && (leftBtn.current as HTMLButtonElement).contains(target);
    if (inputRef.current) {
      const newValue = parseInt(recentValue.current, 10) + (isMinus ? -1 : 1);
      (inputRef.current as HTMLInputElement).value = `${newValue}`;
      recentValue.current = `${newValue}`;
      setIsFirstPage(newValue === 1);
    }
  }, []);

  return (
    <StitchesPagination css={css}>
      <Core.Button disabled={isFirstPage} onClick={onBtnClick} ref={leftBtn} type={'outline'}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Core.Button>
      <Core.Input defaultValue={defaultPage} onBlur={onBlur} onChange={onChange} ref={inputRef} />
      <Core.Button onClick={onBtnClick} ref={rightBtn} type={'outline'}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Core.Button>
    </StitchesPagination>
  );
};
