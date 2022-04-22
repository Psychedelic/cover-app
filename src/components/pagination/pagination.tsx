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

  const onBlur = useCallback(e => {
    const value = (e.target as HTMLInputElement).value;
    const newValue = isPositiveNum(value) ? value : recentValue.current;
    (e.target as HTMLInputElement).value = newValue;
    setIsFirstPage(newValue === '1');
    recentValue.current = newValue;
  }, []);

  const onChange = useCallback(e => {
    const value = (e.target as HTMLInputElement).value;
    (e.target as HTMLInputElement).value = value;
    if (isPositiveNum(value)) {
      recentValue.current = value;
    }
  }, []);

  const onBtnClick = useCallback(e => {
    const isMinus = leftBtn.current && (leftBtn.current as HTMLButtonElement).contains(e.target);
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
      <input defaultValue={defaultPage} onBlur={onBlur} onChange={onChange} ref={inputRef} />
      <Core.Button onClick={onBtnClick} ref={rightBtn} type={'outline'}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Core.Button>
    </StitchesPagination>
  );
};
