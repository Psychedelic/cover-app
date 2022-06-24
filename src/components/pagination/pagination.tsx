import React, {createRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';

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
  totalPage?: number;
  disablePaginated?: boolean;
}

export interface PaginationHandler {
  forceReset: () => void;
}

export const Pagination = React.forwardRef<PaginationHandler, PropTypes>(
  ({css, defaultPage = 1, onPageChanged, totalPage = 1, disablePaginated}, ref) => {
    const [isFirstPage, setIsFirstPage] = useState(defaultPage === 1),
      [isLastPage, setIsLastPage] = useState(defaultPage === totalPage);
    const page = useRef(defaultPage),
      leftBtn = createRef<HTMLButtonElement>(),
      rightBtn = createRef<HTMLButtonElement>(),
      inputRef = createRef<HTMLInputElement>();
    const isPageChanged = useCallback(
        (newPage: string): boolean => {
          if (isPositiveNum(newPage)) {
            const oldPage = page.current;
            // Fall back to the last page.
            page.current = Math.min(totalPage, Number.parseInt(newPage, 10));
            // Still in range, but the page has changed.
            return page.current <= totalPage && page.current !== oldPage;
          }
          return false;
        },
        [totalPage]
      ),
      pageChangeHandler = useCallback(() => {
        if (inputRef.current) {
          // Check if the page is changed and should fall back
          if (isPageChanged((inputRef.current as HTMLInputElement).value)) {
            onPageChanged && onPageChanged(page.current);
          }
          (inputRef.current as HTMLInputElement).value = String(page.current);
          setIsFirstPage(page.current === 1);
          setIsLastPage(page.current === totalPage);
        }
      }, [isPageChanged, totalPage, onPageChanged, inputRef]),
      onBlur = useCallback(pageChangeHandler, [pageChangeHandler]),
      onBtnClick = useCallback<React.ReactEventHandler>(
        ({target}) => {
          const isMinus = leftBtn.current && (leftBtn.current as HTMLButtonElement).contains(target as Node);
          if (inputRef.current) {
            const newPage = page.current + (isMinus ? -1 : 1);
            (inputRef.current as HTMLInputElement).value = `${newPage}`;
            page.current = newPage;
            setIsFirstPage(page.current === 1);
            setIsLastPage(page.current === totalPage);
            onPageChanged && onPageChanged(page.current);
          }
        },
        [onPageChanged, totalPage, inputRef, leftBtn]
      ),
      onEnter = useCallback(
        (e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            pageChangeHandler();
          }
        },
        [pageChangeHandler]
      );
    useEffect(() => {
      setIsFirstPage(page.current === 1);
      setIsLastPage(page.current === totalPage);
    }, [totalPage]);
    useImperativeHandle(
      ref,
      () => ({
        forceReset: () => {
          (inputRef.current as HTMLInputElement).value = '1';
          pageChangeHandler();
        }
      }),
      [pageChangeHandler, inputRef]
    );
    return (
      <StitchesPagination css={css}>
        <Core.Button disabled={disablePaginated || isFirstPage} kind={'outline'} onClick={onBtnClick} ref={leftBtn}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Core.Button>
        <Core.Input
          defaultValue={defaultPage}
          disabled={disablePaginated || totalPage === 1}
          onBlur={onBlur}
          onKeyPress={onEnter}
          ref={inputRef}
        />
        <Core.Button disabled={disablePaginated || isLastPage} kind={'outline'} onClick={onBtnClick} ref={rightBtn}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Core.Button>
      </StitchesPagination>
    );
  }
);
