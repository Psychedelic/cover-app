import React, {useCallback, useEffect, useRef, useState} from 'react';

import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {Core} from '@/components';
import {isPositiveNum} from '@/utils';

import {StitchesPagination} from './pagination.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesPagination> {
  css?: CSS;
  defaultPage?: number;
  onPageChanged?: (toPage: number) => void;
  lastPage?: number;
}

export const Pagination: React.VFC<PropTypes> = ({css, defaultPage = 1, onPageChanged, lastPage = 1}) => {
  const [isFirstPage, setIsFirstPage] = useState(defaultPage === 1);
  const [isLastPage, setIsLastPage] = useState(defaultPage === lastPage);

  const recentValue = useRef(defaultPage),
    leftBtn = useRef(null),
    rightBtn = useRef(null),
    inputRef = useRef(null);

  useEffect(() => {
    setIsFirstPage(recentValue.current === 1);
    setIsLastPage(recentValue.current === lastPage);
  }, [lastPage]);

  const isPageChanged = useCallback(
    (s: string): boolean => {
      if (isPositiveNum(s)) {
        const currentPage = recentValue.current;
        const requestedPage = Number.parseInt(s, 10);
        recentValue.current = Math.min(lastPage, Number.parseInt(s, 10));
        if (requestedPage <= lastPage && requestedPage !== currentPage) {
          return true;
        }
        if (requestedPage > lastPage && currentPage !== lastPage) {
          return true;
        }
      }

      return false;
    },
    [lastPage]
  );

  const onBlur = useCallback(
    _ => {
      if (inputRef.current) {
        if (isPageChanged((inputRef.current as HTMLInputElement).value)) {
          onPageChanged && onPageChanged(recentValue.current);
        }
        (inputRef.current as HTMLInputElement).value = String(recentValue.current);
        setIsFirstPage(recentValue.current === 1);
        setIsLastPage(recentValue.current === lastPage);
      }
    },
    [isPageChanged, lastPage, onPageChanged]
  );

  const onBtnClick = useCallback(
    ({target}) => {
      const isMinus = leftBtn.current && (leftBtn.current as HTMLButtonElement).contains(target);
      if (inputRef.current) {
        const newValue = recentValue.current + (isMinus ? -1 : 1);
        (inputRef.current as HTMLInputElement).value = `${newValue}`;
        recentValue.current = newValue;
        setIsFirstPage(recentValue.current === 1);
        setIsLastPage(recentValue.current === lastPage);
        onPageChanged && onPageChanged(recentValue.current);
      }
    },
    [onPageChanged, lastPage]
  );

  return (
    <StitchesPagination css={css}>
      <Core.Button disabled={isFirstPage} onClick={onBtnClick} ref={leftBtn} type={'outline'}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Core.Button>
      <Core.Input defaultValue={defaultPage} disabled={lastPage === 1} onBlur={onBlur} ref={inputRef} />
      <Core.Button disabled={isLastPage} onClick={onBtnClick} ref={rightBtn} type={'outline'}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Core.Button>
    </StitchesPagination>
  );
};
