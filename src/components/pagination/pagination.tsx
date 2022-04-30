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
  onPageChanged?: (toPage: number) => void;
  lastPage?: number;
}

export const Pagination: React.VFC<PropTypes> = ({css, defaultPage = '1', onPageChanged, lastPage}) => {
  const [isFirstPage, setIsFirstPage] = useState(defaultPage === '1');
  const recentValue = useRef(defaultPage);
  const leftBtn = useRef(null);
  const rightBtn = useRef(null);
  const inputRef = useRef(null);

  const onBlur = useCallback(
    _ => {
      if (inputRef.current) {
        (inputRef.current as HTMLInputElement).value = recentValue.current;
        setIsFirstPage(recentValue.current === '1');
        onPageChanged && onPageChanged(parseInt(recentValue.current, 10));
      }
    },
    [onPageChanged]
  );

  const onChange = useCallback(_ => {
    if (inputRef.current) {
      const value = (inputRef.current as HTMLInputElement).value;
      if (isPositiveNum(value)) {
        recentValue.current = value;
      }
    }
  }, []);

  const onBtnClick = useCallback(
    ({target}) => {
      const isMinus = leftBtn.current && (leftBtn.current as HTMLButtonElement).contains(target);
      if (inputRef.current) {
        const newValue = parseInt(recentValue.current, 10) + (isMinus ? -1 : 1);
        (inputRef.current as HTMLInputElement).value = `${newValue}`;
        recentValue.current = `${newValue}`;
        setIsFirstPage(newValue === 1);
        onPageChanged && onPageChanged(parseInt(recentValue.current, 10));
      }
    },
    [onPageChanged]
  );

  return (
    <StitchesPagination css={css}>
      <Core.Button disabled={isFirstPage} onClick={onBtnClick} ref={leftBtn} type={'outline'}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Core.Button>
      <Core.Input
        defaultValue={defaultPage}
        disabled={lastPage === 1}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
      />
      <Core.Button
        disabled={parseInt(recentValue.current, 10) === lastPage}
        onClick={onBtnClick}
        ref={rightBtn}
        type={'outline'}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Core.Button>
    </StitchesPagination>
  );
};
