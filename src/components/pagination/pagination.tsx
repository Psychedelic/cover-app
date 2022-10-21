import {
  ComponentProps,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactEventHandler,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';

import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {CSS} from '@stitches/react';

import {Core} from '@/components';
import {isPositiveNum} from '@/utils';

import {StitchesPagination} from './pagination.styled';

interface PropTypes extends ComponentProps<typeof StitchesPagination> {
  css?: CSS;
  defaultPage?: number;
  onPageChanged?: (toPage: number) => void;
  totalPage?: number;
  disablePaginated?: boolean;
}

export interface PaginationHandler {
  forceReset: () => void;
}

export const Pagination = forwardRef<PaginationHandler, PropTypes>(
  ({css, defaultPage = 1, onPageChanged, totalPage = 1, disablePaginated}, ref) => {
    const [isFirstPage, setIsFirstPage] = useState(defaultPage === 1),
      [isLastPage, setIsLastPage] = useState(defaultPage === totalPage);
    const pageRef = useRef(defaultPage),
      leftBtnRef = useRef<HTMLButtonElement>(null),
      rightBtnRef = useRef<HTMLButtonElement>(null),
      inputRef = useRef<HTMLInputElement>(null);
    const isPageChanged = useCallback(
        (newPage: string): boolean => {
          if (isPositiveNum(newPage)) {
            const oldPage = pageRef.current;
            // Fall back to the last page.
            pageRef.current = Math.min(totalPage, Number.parseInt(newPage, 10));
            // Still in range, but the page has changed.
            return pageRef.current <= totalPage && pageRef.current !== oldPage;
          }
          return false;
        },
        [totalPage]
      ),
      pageChangeHandler = useCallback(() => {
        if (inputRef.current) {
          // Check if the page is changed and should fall back
          if (isPageChanged((inputRef.current as HTMLInputElement).value)) {
            onPageChanged && onPageChanged(pageRef.current);
          }
          (inputRef.current as HTMLInputElement).value = String(pageRef.current);
          setIsFirstPage(pageRef.current === 1);
          setIsLastPage(pageRef.current === totalPage);
        }
      }, [isPageChanged, totalPage, onPageChanged]),
      onBlur = useCallback(pageChangeHandler, [pageChangeHandler]),
      onBtnClick = useCallback<ReactEventHandler>(
        ({target}) => {
          const isMinus = leftBtnRef.current && (leftBtnRef.current as HTMLButtonElement).contains(target as Node);
          if (inputRef.current) {
            const newPage = pageRef.current + (isMinus ? -1 : 1);
            (inputRef.current as HTMLInputElement).value = `${newPage}`;
            pageRef.current = newPage;
            setIsFirstPage(pageRef.current === 1);
            setIsLastPage(pageRef.current === totalPage);
            onPageChanged && onPageChanged(pageRef.current);
          }
        },
        [onPageChanged, totalPage]
      ),
      onEnter = useCallback<KeyboardEventHandler>(
        (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            pageChangeHandler();
          }
        },
        [pageChangeHandler]
      );
    useEffect(() => {
      setIsFirstPage(pageRef.current === 1);
      setIsLastPage(pageRef.current === totalPage);
    }, [totalPage]);
    useImperativeHandle(
      ref,
      () => ({
        forceReset: () => {
          (inputRef.current as HTMLInputElement).value = '1';
          pageChangeHandler();
        }
      }),
      [pageChangeHandler]
    );

    const LeftIcon = useMemo(() => <Core.Icon icon={faChevronLeft} />, []),
      RightIcon = useMemo(() => <Core.Icon icon={faChevronRight} />, []),
      LeftBtn = useMemo(
        () => (
          <Core.Button
            disabled={disablePaginated || isFirstPage}
            kind={'outline'}
            onClick={onBtnClick}
            ref={leftBtnRef}>
            {LeftIcon}
          </Core.Button>
        ),
        [disablePaginated, isFirstPage, onBtnClick, LeftIcon]
      ),
      RightBtn = useMemo(
        () => (
          <Core.Button
            disabled={disablePaginated || isLastPage}
            kind={'outline'}
            onClick={onBtnClick}
            ref={rightBtnRef}>
            {RightIcon}
          </Core.Button>
        ),
        [disablePaginated, isLastPage, onBtnClick, RightIcon]
      ),
      Children = useMemo(
        () => (
          <>
            {LeftBtn}
            <Core.Input
              defaultValue={defaultPage}
              disabled={disablePaginated || totalPage === 1}
              onBlur={onBlur}
              onKeyPress={onEnter}
              ref={inputRef}
            />
            {RightBtn}
          </>
        ),
        [LeftBtn, RightBtn, defaultPage, disablePaginated, totalPage, onBlur, onEnter]
      );
    return <StitchesPagination css={css}>{Children}</StitchesPagination>;
  }
);
