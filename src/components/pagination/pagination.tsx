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
  disablePaginated?: boolean;
}

export const Pagination: React.VFC<PropTypes> = ({
  css,
  defaultPage = 1,
  onPageChanged,
  lastPage = 1,
  disablePaginated
}) => {
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

  const shouldRerender = useCallback(
    (newVal: string): boolean => {
      if (isPositiveNum(newVal)) {
        const oldVal = recentValue.current;

        // Fall back to the last page.
        recentValue.current = Math.min(lastPage, Number.parseInt(newVal, 10));

        // Still in range, but the page has changed.
        return recentValue.current <= lastPage && recentValue.current !== oldVal;
      }
      return false;
    },
    [lastPage]
  );

  const pageChangeHandler = useCallback(() => {
    if (inputRef.current) {
      if (shouldRerender((inputRef.current as HTMLInputElement).value)) {
        onPageChanged && onPageChanged(recentValue.current);
      }
      (inputRef.current as HTMLInputElement).value = String(recentValue.current);
      setIsFirstPage(recentValue.current === 1);
      setIsLastPage(recentValue.current === lastPage);
    }
  }, [shouldRerender, lastPage, onPageChanged]);

  const onBlur = useCallback(pageChangeHandler, [pageChangeHandler]);

  const onBtnClick = useCallback<React.ReactEventHandler>(
    ({target}) => {
      const isMinus = leftBtn.current && (leftBtn.current as HTMLButtonElement).contains(target as Node);
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

  const onEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        pageChangeHandler();
      }
    },
    [pageChangeHandler]
  );

  return (
    <StitchesPagination css={css}>
      <Core.Button disabled={disablePaginated || isFirstPage} onClick={onBtnClick} ref={leftBtn} type={'outline'}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Core.Button>
      <Core.Input
        defaultValue={defaultPage}
        disabled={disablePaginated || lastPage === 1}
        onBlur={onBlur}
        onKeyPress={onEnter}
        ref={inputRef}
      />
      <Core.Button disabled={disablePaginated || isLastPage} onClick={onBtnClick} ref={rightBtn} type={'outline'}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Core.Button>
    </StitchesPagination>
  );
};
