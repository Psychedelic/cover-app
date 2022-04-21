import React, {useCallback, useRef, useState} from 'react';

import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {Core} from '@/components';
import {colors} from '@/themes';
import {isPositiveNum} from '@/utils';

import {StitchesPagination} from './pagination.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesPagination> {
  css?: CSS;
  page: string;
}

export const Pagination: React.VFC<PropTypes> = ({css, page}) => {
  const [value, setValue] = useState(page);
  const [isFirstPage, setIsFirstPage] = useState(value === '1');
  const inputRef = useRef(null);

  const color = isFirstPage ? colors.coverMediumGray : colors.coverLightWhite;

  const onBlur = useCallback(
    e => {
      const inputVal = (e.target as HTMLInputElement).value;
      const newVal = isPositiveNum(inputVal) ? inputVal : value;
      (e.target as HTMLInputElement).value = newVal;
      setValue(newVal);
      setIsFirstPage(newVal === '1');
    },
    [value]
  );

  const onChange = useCallback(e => {
    const inputVal = (e.target as HTMLInputElement).value;
    (e.target as HTMLInputElement).value = inputVal;
    if (isPositiveNum(inputVal)) {
      setValue(inputVal);
    }
  }, []);

  const onLeftCLick = useCallback(() => {
    if (value !== '1' && inputRef.current) {
      const newValue = parseInt(value, 10) - 1;
      (inputRef.current as HTMLInputElement).value = String(newValue);
      setValue(`${newValue}`);
      setIsFirstPage(newValue === 1);
    }
  }, [value]);

  const onRightClick = useCallback(() => {
    if (inputRef.current) {
      const newValue = parseInt(value, 10) + 1;
      (inputRef.current as HTMLInputElement).value = String(newValue);
      setValue(`${newValue}`);
      setIsFirstPage(newValue === 1);
    }
  }, [value]);

  return (
    <StitchesPagination css={css}>
      <div>
        <Core.Button onClick={onLeftCLick} type={'outline'}>
          <FontAwesomeIcon color={color} icon={faChevronLeft} />
        </Core.Button>
        <input defaultValue={page} onBlur={onBlur} onChange={onChange} ref={inputRef} />
        <Core.Button onClick={onRightClick} type={'outline'}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Core.Button>
      </div>
    </StitchesPagination>
  );
};
